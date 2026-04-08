export const ENV = {
  isProduction: process.env.NODE_ENV === "production",
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
  googlePrivateKey: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  ),
  googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID ?? "",
};
