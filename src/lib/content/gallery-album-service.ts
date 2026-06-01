import { getRepository } from "@/lib/data/repository";

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

const repo = getRepository<GalleryAlbum>("gallery-albums");

export function getGalleryAlbums(): GalleryAlbum[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultAlbums;
}

export function saveGalleryAlbums(input: GalleryAlbum[]): void {
  repo.save(input);
}
