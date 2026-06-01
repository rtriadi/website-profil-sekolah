"use server";

import { revalidatePath } from "next/cache";
import { saveMealMenu } from "@/lib/content/meal-service";
import type { MealEntry } from "@/lib/content/schema";

export async function saveMealMenuAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: MealEntry[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data menu tidak valid" };
  }

  for (const item of items) {
    if (!item.day?.trim()) return { error: "Hari harus diisi" };
    if (!item.main?.trim()) return { error: "Menu utama harus diisi" };
  }

  saveMealMenu(items);
  revalidatePath("/meal-menu");
  revalidatePath("/admin/meal-menu");
  return { success: true };
}
