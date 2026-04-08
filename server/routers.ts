import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { instagramRouter } from "./instagramRouter";
import { googleDriveRouter } from "./googleDriveRouter";

export const appRouter = router({
  system: systemRouter,

  // Instagram Graph API feed integration
  instagram: instagramRouter,

  // Google Drive product gallery
  googleDrive: googleDriveRouter,
});

export type AppRouter = typeof appRouter;
