/* =============================================================
   Google Drive Gallery Router
   Fetches product images from the configured Drive folder.

   Expected folder structure:
     Root folder/
       Category Name/           ← subfolder = category
         Product Name.jpg       ← filename (no ext) = product name
         ...

   Optional file description format (set in Drive's file info panel):
     "Short description | From ₹1,800 | Tag1,Tag2"
   ============================================================= */

import { google } from "googleapis";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";

export interface GalleryItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  featured: boolean;
}

// In-memory cache: 5-minute TTL
const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { data: GalleryItem[]; fetchedAt: number } | null = null;

export function buildDriveClient() {
  const auth = new google.auth.JWT({
    email: ENV.googleServiceAccountEmail,
    key: ENV.googlePrivateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  return google.drive({ version: "v3", auth });
}

async function fetchFromDrive(): Promise<GalleryItem[]> {
  const drive = buildDriveClient();
  const rootId = ENV.googleDriveFolderId;

  // 1. List subfolders (one per category)
  const foldersRes = await drive.files.list({
    q: `'${rootId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    orderBy: "name",
  });

  const folders = foldersRes.data.files ?? [];

  // 2. Also list images directly in root (no category subfolder)
  const rootImagesRes = await drive.files.list({
    q: `'${rootId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, description)",
    orderBy: "name",
  });

  const items: GalleryItem[] = [];
  let idCounter = 1;

  // Helper: parse optional file description
  function parseDescription(raw: string | null | undefined) {
    const parts = (raw ?? "").split("|").map(s => s.trim());
    return {
      description: parts[0] ?? "",
      price: parts[1] ?? "Contact for pricing",
      tags: parts[2]
        ? parts[2]
            .split(",")
            .map(t => t.trim())
            .filter(Boolean)
        : [],
    };
  }

  // Images in category subfolders
  for (const folder of folders) {
    if (!folder.id || !folder.name) continue;

    const filesRes = await drive.files.list({
      q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, description)",
      orderBy: "name",
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
        featured: idCounter === 2, // first item overall is featured
      });
    }
  }

  // Images directly in root (placed in "Other" category)
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
      featured: false,
    });
  }

  return items;
}

export const googleDriveRouter = router({
  getGallery: publicProcedure.query(async () => {
    const now = Date.now();
    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return cache.data;
    }
    const data = await fetchFromDrive();
    cache = { data, fetchedAt: now };
    return data;
  }),
});
