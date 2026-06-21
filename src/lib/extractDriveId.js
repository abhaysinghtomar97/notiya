// lib/extractDriveId.js

export function extractDriveId(input) {
  if (!input) return null;

  input = input.trim();

  // Already a Drive ID
  if (!input.startsWith("http")) {
    return input;
  }

  // /file/d/<id>/
  const fileMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileMatch) {
    return fileMatch[1];
  }

  // open?id=<id>
  const openMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (openMatch) {
    return openMatch[1];
  }

  return null;
}