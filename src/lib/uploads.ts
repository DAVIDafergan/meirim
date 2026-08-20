import path from "path";

// Railway volume mounted for this service; falls back to a local folder in
// dev so uploads still work without the volume attached.
export const UPLOADS_DIR =
  process.env.UPLOADS_DIR ?? path.join(process.cwd(), ".data", "uploads");

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 150 * 1024 * 1024;

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const VIDEO_TYPES: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export function resolveUpload(mimeType: string) {
  if (IMAGE_TYPES[mimeType]) {
    return { kind: "image" as const, ext: IMAGE_TYPES[mimeType], maxBytes: MAX_IMAGE_BYTES };
  }
  if (VIDEO_TYPES[mimeType]) {
    return { kind: "video" as const, ext: VIDEO_TYPES[mimeType], maxBytes: MAX_VIDEO_BYTES };
  }
  return null;
}

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

export function contentTypeForFilename(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}
