"use server";

import { revalidatePath } from "next/cache";
import { saveGalleryAlbums } from "@/lib/content/gallery-album-service";
import type { GalleryAlbum } from "@/lib/content/gallery-album-service";

export async function saveAlbumsAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: GalleryAlbum[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data album tidak valid" };
  }

  for (const item of items) {
    if (!item.name?.trim()) {
      return { error: "Nama album harus diisi" };
    }
  }

  saveGalleryAlbums(items);
  revalidatePath("/admin/gallery/albums");
  revalidatePath("/galeri");
  return { success: true };
}
