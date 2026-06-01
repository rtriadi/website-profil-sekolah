"use server";

import { getMenuSettings, saveMenuSettings, type MenuSettings } from "@/lib/content/menu-service";
import { revalidatePath } from "next/cache";

export async function updateMenuSettingsAction(formData: FormData) {
  const current = getMenuSettings();
  const updated: MenuSettings = {};

  for (const key of Object.keys(current)) {
    // If the checkbox is checked, it will send a value. If not checked, it won't be in formData.
    updated[key] = formData.get(key) === "true";
  }

  saveMenuSettings(updated);
  revalidatePath("/", "layout");
  return { success: true };
}
