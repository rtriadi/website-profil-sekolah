"use server";

import {
  getMenuSettingsAsync,
  saveMenuSettingsAsync,
  defaultMenuSettings,
  type MenuSettings,
} from "@/lib/content/menu-service";
import { revalidatePath } from "next/cache";

export async function updateMenuSettingsAction(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  // Build updated settings object from form
  const updated: MenuSettings = {};
  for (const key of Object.keys(defaultMenuSettings)) {
    updated[key] = formData.get(key) === "true";
  }

  try {
    const saved = await saveMenuSettingsAsync(updated);
    if (!saved) {
      return {
        error:
          "Gagal menyimpan ke database. Cek konfigurasi Supabase dan RLS policy.",
      };
    }
  } catch (e: any) {
    console.error("[updateMenuSettingsAction] Error:", e);
    return { error: e?.message ?? "Terjadi kesalahan saat menyimpan." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function getMenuSettingsAction(): Promise<MenuSettings> {
  return getMenuSettingsAsync();
}
