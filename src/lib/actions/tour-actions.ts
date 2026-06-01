"use server";

import { revalidatePath } from "next/cache";
import { saveTourSettings } from "@/lib/content/tour-service";

export async function saveTourAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const imageUrl = formData.get("imageUrl") as string;
  const title = formData.get("title") as string;

  if (!imageUrl?.trim()) return { error: "URL gambar harus diisi" };

  saveTourSettings({ imageUrl: imageUrl.trim(), title: title?.trim() || "Virtual Tour Sekolah" });
  revalidatePath("/virtual-tour");
  revalidatePath("/admin/virtual-tour");
  return { success: true };
}
