import fs from "node:fs";
import path from "node:path";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "media.json";

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string;
  uploadedAt: string;
  size: number;
  type: string;
  album?: string;
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function getMedia(): MediaItem[] {
  return readJsonFile<MediaItem[]>(DATA_FILE, []);
}

export async function uploadMedia(
  file: File,
  altText?: string,
  album?: string,
): Promise<{ media?: MediaItem; error?: string }> {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return { error: "Hanya file JPEG, PNG, dan WebP yang diizinkan" };
  }

  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    return { error: "Ukuran file maksimal 4MB" };
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${Date.now()}-${sanitizedName}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  const id = `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const item: MediaItem = {
    id,
    filename,
    url: `/uploads/${filename}`,
    altText: altText?.trim() || filename,
    uploadedAt: new Date().toISOString(),
    size: file.size,
    type: file.type,
    album: album?.trim() || undefined,
  };

  const media = getMedia();
  media.unshift(item);
  writeJsonFile(DATA_FILE, media);

  return { media: item };
}

export function deleteMedia(id: string): boolean {
  const media = getMedia();
  const item = media.find((m) => m.id === id);
  if (!item) return false;

  const filePath = path.join(UPLOAD_DIR, item.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const filtered = media.filter((m) => m.id !== id);
  writeJsonFile(DATA_FILE, filtered);
  return true;
}

export function getGalleryItems(): MediaItem[] {
  return getMedia();
}
