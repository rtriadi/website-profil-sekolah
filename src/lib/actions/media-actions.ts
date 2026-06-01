"use server";

import { revalidatePath } from "next/cache";
import { uploadMedia, deleteMedia } from "@/lib/content/media-service";

export async function uploadMediaAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;
  const album = formData.get("album") as string;

  if (!file || file.size === 0) {
    return { error: "Pilih file untuk diunggah" };
  }

  const result = await uploadMedia(file, altText, album);
  if (result.error) return { error: result.error };

  revalidatePath("/admin/media");
  revalidatePath("/galeri");
  return { success: true };
}

export async function deleteMediaAction(id: string): Promise<void> {
  deleteMedia(id);
  revalidatePath("/admin/media");
  revalidatePath("/galeri");
}
