"use server";

import { revalidatePath } from "next/cache";
import { saveExtracurriculars } from "@/lib/content/extracurricular-service";
import type { Extracurricular } from "@/lib/content/schema";

export async function saveExtracurricularsAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: Extracurricular[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data ekstrakurikuler tidak valid" };
  }

  for (const item of items) {
    if (!item.name?.trim()) return { error: "Nama ekstrakurikuler harus diisi" };
  }

  saveExtracurriculars(items);
  revalidatePath("/extracurriculars");
  revalidatePath("/admin/extracurriculars");
  return { success: true };
}
