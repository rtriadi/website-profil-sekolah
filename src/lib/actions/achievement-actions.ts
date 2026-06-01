"use server";

import { revalidatePath } from "next/cache";
import { saveAchievements } from "@/lib/content/achievement-service";
import type { Achievement } from "@/lib/content/schema";

export async function saveAchievementsAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: Achievement[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data prestasi tidak valid" };
  }

  for (const item of items) {
    if (!item.title?.trim()) {
      return { fieldErrors: { title: "Judul harus diisi" } };
    }
    if (!item.date) {
      return { fieldErrors: { date: "Tanggal harus diisi" } };
    }
  }

  saveAchievements(items);
  revalidatePath("/achievements");
  revalidatePath("/admin/achievements");
  return { success: true };
}
