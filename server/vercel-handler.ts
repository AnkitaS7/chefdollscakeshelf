import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { buildDriveClient } from "./googleDriveRouter";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Google Drive image proxy — streams Drive files through the server so the
// service-account credentials never need to reach the browser.
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
    res.send(Buffer.from(fileRes.data as ArrayBuffer));
  } catch (err) {
    console.error("[Drive proxy] Failed to fetch image:", err);
    res.status(404).end();
  }
});

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
