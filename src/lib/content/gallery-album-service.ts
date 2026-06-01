import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "gallery-albums.json";

export const defaultAlbums = [
  { id: "album-001", name: "Kegiatan Belajar", sortOrder: 1 },
  { id: "album-002", name: "Lomba & Acara", sortOrder: 2 },
  { id: "album-003", name: "Fasilitas", sortOrder: 3 },
];

export interface GalleryAlbum {
  id: string;
  name: string;
  sortOrder: number;
}

export function getGalleryAlbums(): GalleryAlbum[] {
  const data = readJsonFile<GalleryAlbum[] | null>(DATA_FILE, null);
  return data ?? defaultAlbums;
}

export function saveGalleryAlbums(input: GalleryAlbum[]): void {
  writeJsonFile(DATA_FILE, input);
}
