"use server";

import {
  getMenuSettingsAsync,
  saveMenuSettingsAsync,
  defaultMenuSettings,
  type MenuSettings,
} from "@/lib/content/menu-service";
import { revalidatePath } from "next/cache";

export async function updateMenuSettingsAction(formData: FormData) {
  // Build updated settings object from form
  const updated: MenuSettings = {};
  for (const key of Object.keys(defaultMenuSettings)) {
    updated[key] = formData.get(key) === "true";
  }

  // Async save — works in both Supabase (production) and JSON (local) modes
  await saveMenuSettingsAsync(updated);

  revalidatePath("/", "layout");
  return { success: true };
}

export async function getMenuSettingsAction(): Promise<MenuSettings> {
  return getMenuSettingsAsync();
}
