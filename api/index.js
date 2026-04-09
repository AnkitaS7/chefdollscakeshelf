// server/vercel-handler.ts
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/trpc.ts
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  }))
});

// server/instagramRouter.ts
var GRAPH_API_BASE = "https://graph.facebook.com/v25.0";
var INSTAGRAM_API_BASE = "https://graph.instagram.com";
var CACHE_TTL_MS = 30 * 60 * 1e3;
var feedCache = null;
async function fetchLiveFeed(accessToken, userId) {
  const fields = [
    "id",
    "media_url",
    "thumbnail_url",
    "permalink",
    "caption",
    "timestamp",
    "media_type"
  ].join(",");
  const url = `${GRAPH_API_BASE}/${userId}/media?fields=${fields}&limit=12&access_token=${accessToken}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Instagram API ${res.status}: ${body}`);
  }
  const json = await res.json();
  return (json.data ?? []).filter((p) => p.media_url || p.thumbnail_url).map((p) => ({
    id: p.id,
    mediaUrl: p.media_url ?? p.thumbnail_url ?? "",
    thumbnailUrl: p.thumbnail_url,
    permalink: p.permalink,
    caption: p.caption,
    timestamp: p.timestamp,
    mediaType: p.media_type
  }));
}
async function doRefreshToken(accessToken) {
  const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token refresh ${res.status}: ${body}`);
  }
  return await res.json();
}
var instagramRouter = router({
  /**
   * instagram.feed
   * Returns the latest posts from @chefdollscakeshelf.
   *
   * Response shape:
   *   { posts, configured, error, cachedAt }
   *
   * - configured: false  → credentials not set → frontend shows simulated feed
   * - configured: true   → credentials set     → frontend shows live posts
   * - error: string      → fetch failed (stale cache or empty posts returned)
   */
  feed: publicProcedure.query(async () => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    if (!accessToken || !userId) {
      return {
        posts: [],
        configured: false,
        error: null,
        cachedAt: null
      };
    }
    const now = Date.now();
    if (feedCache && now - feedCache.fetchedAt < CACHE_TTL_MS) {
      return {
        posts: feedCache.data,
        configured: true,
        error: null,
        cachedAt: new Date(feedCache.fetchedAt).toISOString()
      };
    }
    try {
      const posts = await fetchLiveFeed(accessToken, userId);
      feedCache = { data: posts, fetchedAt: now };
      return {
        posts,
        configured: true,
        error: null,
        cachedAt: new Date(now).toISOString()
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[Instagram] Feed fetch failed:", message);
      if (feedCache) {
        return {
          posts: feedCache.data,
          configured: true,
          error: `Showing cached data. Live fetch failed: ${message}`,
          cachedAt: new Date(feedCache.fetchedAt).toISOString()
        };
      }
      return {
        posts: [],
        configured: true,
        error: message,
        cachedAt: null
      };
    }
  }),
  /**
   * instagram.refreshToken
   * Refreshes the long-lived access token before it expires (60-day window).
   * Call this every ~50 days to keep the feed alive.
   */
  refreshToken: publicProcedure.mutation(async () => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return {
        success: false,
        message: "INSTAGRAM_ACCESS_TOKEN is not set.",
        newToken: null,
        expiresInDays: null
      };
    }
    try {
      const result = await doRefreshToken(accessToken);
      const days = Math.floor(result.expires_in / 86400);
      return {
        success: true,
        message: `Token refreshed. Expires in ~${days} days. Update INSTAGRAM_ACCESS_TOKEN in Secrets to: ${result.access_token.slice(0, 30)}...`,
        newToken: result.access_token,
        expiresInDays: days
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message,
        newToken: null,
        expiresInDays: null
      };
    }
  }),
  /**
   * instagram.clearCache
   * Force-clears the in-memory cache so the next feed request fetches fresh data.
   */
  clearCache: publicProcedure.mutation(() => {
    feedCache = null;
    return { success: true };
  })
});

// server/googleDriveRouter.ts
import { google } from "googleapis";

// server/_core/env.ts
var ENV = {
  isProduction: process.env.NODE_ENV === "production",
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
  googlePrivateKey: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  ),
  googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID ?? ""
};

// server/googleDriveRouter.ts
var CACHE_TTL_MS2 = 5 * 60 * 1e3;
var cache = null;
function buildDriveClient() {
  const auth = new google.auth.JWT({
    email: ENV.googleServiceAccountEmail,
    key: ENV.googlePrivateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });
  return google.drive({ version: "v3", auth });
}
async function fetchFromDrive() {
  const drive = buildDriveClient();
  const rootId = ENV.googleDriveFolderId;
  const foldersRes = await drive.files.list({
    q: `'${rootId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    orderBy: "name"
  });
  const folders = foldersRes.data.files ?? [];
  const rootImagesRes = await drive.files.list({
    q: `'${rootId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, description)",
    orderBy: "name"
  });
  const items = [];
  let idCounter = 1;
  function parseDescription(raw) {
    const parts = (raw ?? "").split("|").map((s) => s.trim());
    return {
      description: parts[0] ?? "",
      price: parts[1] ?? "Contact for pricing",
      tags: parts[2] ? parts[2].split(",").map((t2) => t2.trim()).filter(Boolean) : []
    };
  }
  for (const folder of folders) {
    if (!folder.id || !folder.name) continue;
    const filesRes = await drive.files.list({
      q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, description)",
      orderBy: "name"
    });
    for (const file of filesRes.data.files ?? []) {
      if (!file.id || !file.name) continue;
      const productName = file.name.replace(/\.[^/.]+$/, "");
      const { description, price, tags } = parseDescription(file.description);
      items.push({
        id: idCounter++,
        name: productName,
        category: folder.name,
        description,
        price,
        image: `/api/drive/image/${file.id}`,
        tags,
        featured: idCounter === 2
        // first item overall is featured
      });
    }
  }
  for (const file of rootImagesRes.data.files ?? []) {
    if (!file.id || !file.name) continue;
    const productName = file.name.replace(/\.[^/.]+$/, "");
    const { description, price, tags } = parseDescription(file.description);
    items.push({
      id: idCounter++,
      name: productName,
      category: "Other",
      description,
      price,
      image: `/api/drive/image/${file.id}`,
      tags,
      featured: false
    });
  }
  return items;
}
var googleDriveRouter = router({
  getGallery: publicProcedure.query(async () => {
    const now = Date.now();
    if (cache && now - cache.fetchedAt < CACHE_TTL_MS2) {
      return cache.data;
    }
    const data = await fetchFromDrive();
    cache = { data, fetchedAt: now };
    return data;
  })
});

// server/routers.ts
var appRouter = router({
  system: systemRouter,
  // Instagram Graph API feed integration
  instagram: instagramRouter,
  // Google Drive product gallery
  googleDrive: googleDriveRouter
});

// server/_core/context.ts
async function createContext(opts) {
  return {
    req: opts.req,
    res: opts.res
  };
}

// server/vercel-handler.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/api/drive/image/:fileId", async (req, res) => {
  try {
    const drive = buildDriveClient();
    const { fileId } = req.params;
    const meta = await drive.files.get({ fileId, fields: "mimeType" });
    const mimeType = meta.data.mimeType ?? "image/jpeg";
    const fileRes = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(Buffer.from(fileRes.data));
  } catch (err) {
    console.error("[Drive proxy] Failed to fetch image:", err);
    res.status(404).end();
  }
});
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var vercel_handler_default = app;
export {
  vercel_handler_default as default
};
