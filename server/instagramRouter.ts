/**
 * ============================================================
 * instagramRouter.ts — Instagram Graph API Integration
 * ChefDollsCakeShelf by Dhvani Hariya
 * ============================================================
 *
 * HOW TO ACTIVATE THE LIVE INSTAGRAM FEED
 * ─────────────────────────────────────────
 * 1. Make sure @chefdollscakeshelf is a Professional (Business/Creator) account
 *    on Instagram: Settings → Account → Switch to Professional Account
 *
 * 2. Connect the Instagram account to a Facebook Page:
 *    Facebook → Settings → Instagram → Connect Account
 *
 * 3. Create a Meta Developer App at https://developers.facebook.com
 *    - Create App → Business type
 *    - Add "Instagram Graph API" product
 *
 * 4. Generate a Long-Lived Access Token (valid 60 days):
 *    a. Go to Graph API Explorer → select your app
 *    b. Request permissions: instagram_basic, pages_read_engagement
 *    c. Generate short-lived token
 *    d. Exchange for long-lived token:
 *       GET https://graph.facebook.com/v25.0/oauth/access_token
 *           ?grant_type=fb_exchange_token
 *           &client_id={YOUR_APP_ID}
 *           &client_secret={YOUR_APP_SECRET}
 *           &fb_exchange_token={SHORT_LIVED_TOKEN}
 *
 * 5. Get your Instagram User ID:
 *    GET https://graph.facebook.com/v25.0/me?fields=id,name&access_token={LONG_LIVED_TOKEN}
 *    Copy the numeric "id" value.
 *
 * 6. Set these two environment variables in your deployment:
 *    INSTAGRAM_ACCESS_TOKEN = <your long-lived token>
 *    INSTAGRAM_USER_ID      = <your numeric Instagram user ID>
 *
 * 7. Tokens expire after 60 days. Refresh before expiry by calling:
 *    GET https://graph.instagram.com/refresh_access_token
 *        ?grant_type=ig_refresh_token&access_token={CURRENT_TOKEN}
 *    Or use the trpc.instagram.refreshToken mutation from the admin panel.
 *
 * WHEN CREDENTIALS ARE NOT SET
 * ─────────────────────────────
 * The frontend will automatically display a beautiful simulated feed.
 * No errors, no broken UI — it just works as a placeholder until
 * the real credentials are added.
 * ============================================================
 */

import { router, publicProcedure } from "./_core/trpc";

const GRAPH_API_BASE = "https://graph.facebook.com/v25.0";
const INSTAGRAM_API_BASE = "https://graph.instagram.com";

/** Cache TTL: 30 minutes — avoids hammering the API on every page load */
const CACHE_TTL_MS = 30 * 60 * 1000;

// ─── In-memory cache ─────────────────────────────────────────────────────────
interface CacheEntry {
  data: InstagramPost[];
  fetchedAt: number;
}
let feedCache: CacheEntry | null = null;

// ─── Types ────────────────────────────────────────────────────────────────────
export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

// ─── API helpers ──────────────────────────────────────────────────────────────
async function fetchLiveFeed(
  accessToken: string,
  userId: string
): Promise<InstagramPost[]> {
  const fields = [
    "id",
    "media_url",
    "thumbnail_url",
    "permalink",
    "caption",
    "timestamp",
    "media_type",
  ].join(",");

  const url = `${GRAPH_API_BASE}/${userId}/media?fields=${fields}&limit=12&access_token=${accessToken}`;
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Instagram API ${res.status}: ${body}`);
  }

  const json = (await res.json()) as {
    data: Array<{
      id: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink: string;
      caption?: string;
      timestamp: string;
      media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    }>;
  };

  return (json.data ?? [])
    .filter(p => p.media_url || p.thumbnail_url)
    .map(p => ({
      id: p.id,
      mediaUrl: p.media_url ?? p.thumbnail_url ?? "",
      thumbnailUrl: p.thumbnail_url,
      permalink: p.permalink,
      caption: p.caption,
      timestamp: p.timestamp,
      mediaType: p.media_type,
    }));
}

async function doRefreshToken(accessToken: string) {
  const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token refresh ${res.status}: ${body}`);
  }
  return (await res.json()) as { access_token: string; expires_in: number };
}

// ─── tRPC Router ──────────────────────────────────────────────────────────────
export const instagramRouter = router({
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
    // ── Read credentials from environment ──────────────────────────────────
    // To activate: set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in your
    // deployment environment (Manus → Settings → Secrets).
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    // ── Not configured: return empty so frontend shows placeholder feed ─────
    if (!accessToken || !userId) {
      return {
        posts: [] as InstagramPost[],
        configured: false,
        error: null as string | null,
        cachedAt: null as string | null,
      };
    }

    // ── Serve from cache if still fresh ────────────────────────────────────
    const now = Date.now();
    if (feedCache && now - feedCache.fetchedAt < CACHE_TTL_MS) {
      return {
        posts: feedCache.data,
        configured: true,
        error: null as string | null,
        cachedAt: new Date(feedCache.fetchedAt).toISOString(),
      };
    }

    // ── Fetch live data ─────────────────────────────────────────────────────
    try {
      const posts = await fetchLiveFeed(accessToken, userId);
      feedCache = { data: posts, fetchedAt: now };
      return {
        posts,
        configured: true,
        error: null as string | null,
        cachedAt: new Date(now).toISOString(),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[Instagram] Feed fetch failed:", message);

      // Return stale cache rather than empty on transient errors
      if (feedCache) {
        return {
          posts: feedCache.data,
          configured: true,
          error: `Showing cached data. Live fetch failed: ${message}`,
          cachedAt: new Date(feedCache.fetchedAt).toISOString(),
        };
      }

      return {
        posts: [] as InstagramPost[],
        configured: true,
        error: message,
        cachedAt: null as string | null,
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
        newToken: null as string | null,
        expiresInDays: null as number | null,
      };
    }
    try {
      const result = await doRefreshToken(accessToken);
      const days = Math.floor(result.expires_in / 86400);
      return {
        success: true,
        message: `Token refreshed. Expires in ~${days} days. Update INSTAGRAM_ACCESS_TOKEN in Secrets to: ${result.access_token.slice(0, 30)}...`,
        newToken: result.access_token,
        expiresInDays: days,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message,
        newToken: null as string | null,
        expiresInDays: null as number | null,
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
  }),
});
