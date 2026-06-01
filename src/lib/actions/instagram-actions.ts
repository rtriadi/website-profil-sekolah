"use server";

import { revalidatePath } from "next/cache";
import { saveInstagramSettings } from "@/lib/content/instagram-service";

export async function saveInstagramAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const handle = formData.get("handle") as string;
  const url = formData.get("url") as string;

  if (!handle?.trim()) return { error: "Username Instagram harus diisi" };

  saveInstagramSettings({
    handle: handle.trim(),
    url: url?.trim() || `https://www.instagram.com/${handle.trim()}/`,
  });

  revalidatePath("/instagram");
  revalidatePath("/admin/instagram");
  revalidatePath("/");
  return { success: true };
}
