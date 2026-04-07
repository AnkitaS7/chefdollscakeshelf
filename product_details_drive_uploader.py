"""
upload_to_drive.py
------------------
Uploads a local file to Google Drive and sets its Description field
(visible in Drive via File information → Details).

SETUP (one-time):
  pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib

  Then follow these steps to get your credentials.json:
  1. Go to https://console.cloud.google.com/
  2. Create a project → Enable the Google Drive API
  3. Go to APIs & Services → Credentials → Create OAuth 2.0 Client ID
  4. Application type: Desktop App
  5. Download the JSON and save it as credentials.json in this same folder
"""

import os
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# --- CONFIGURATION -----------------------------------------------------------

LOCAL_FILE_PATH = "mickey-mouse.jpg"          # Path to the file you want to upload
DRIVE_FILE_NAME = "Demo.jpg"    # Name it will have on Google Drive
FILE_DESCRIPTION = "This is my file description, visible in Drive Details panel."
DRIVE_FOLDER_ID  = "1_fvNbAOopJ1IvTNbX0vXmZebMOYrWtrg"                # Optional: paste a folder ID string, or leave None for root

# -----------------------------------------------------------------------------

SCOPES = ["https://www.googleapis.com/auth/drive"]


def authenticate():
    """Handles OAuth2 authentication and returns a Drive API service object."""
    creds = None

    # token.json is auto-created after first login and reused on future runs
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return build("drive", "v3", credentials=creds)


def upload_file_with_description(service, local_path, drive_name, description, folder_id=None):
    """
    Uploads a local file to Google Drive and sets its description
    in a single API call using files().create().
    """

    # File metadata — description is set here directly
    file_metadata = {
        "name": drive_name,
        "description": description,
    }

    # Optionally place the file inside a specific folder
    if folder_id:
        file_metadata["parents"] = [folder_id]

    # Detect MIME type automatically from the file extension
    import mimetypes
    mime_type, _ = mimetypes.guess_type(local_path)
    if mime_type is None:
        mime_type = "application/octet-stream"  # fallback for unknown types

    media = MediaFileUpload(local_path, mimetype=mime_type, resumable=True)

    print(f"Uploading '{local_path}' as '{drive_name}'...")

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id, name, description, webViewLink"
    ).execute()

    print("\n✅ Upload successful!")
    print(f"   File Name  : {file.get('name')}")
    print(f"   File ID    : {file.get('id')}")
    print(f"   Description: {file.get('description')}")
    print(f"   Drive Link : {file.get('webViewLink')}")

    return file


def update_description(service, file_id, new_description):
    """
    Separately updates the description of an already-existing Drive file.
    Use this if the file is already on Drive and you just want to update its description.
    """
    updated = service.files().update(
        fileId=file_id,
        body={"description": new_description},
        fields="id, name, description"
    ).execute()

    print(f"\n✅ Description updated for file: {updated.get('name')}")
    print(f"   New Description: {updated.get('description')}")
    return updated


if __name__ == "__main__":
    service = authenticate()

    # Upload the file with description set in one go
    upload_file_with_description(
        service=service,
        local_path=LOCAL_FILE_PATH,
        drive_name=DRIVE_FILE_NAME,
        description=FILE_DESCRIPTION,
        folder_id=DRIVE_FOLDER_ID
    )

    # --- OPTIONAL: update description of an existing file ---
    # update_description(service, file_id="YOUR_EXISTING_FILE_ID", new_description="New text here")