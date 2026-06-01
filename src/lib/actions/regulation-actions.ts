"use server";

import { revalidatePath } from "next/cache";
import { saveRegulations } from "@/lib/content/regulation-service";
import type { RegulationSection } from "@/lib/content/schema";

export async function saveRegulationsAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: RegulationSection[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data tidak valid" };
  }

  for (const item of items) {
    if (!item.title?.trim()) return { error: "Judul harus diisi" };
  }

  saveRegulations(items);
  revalidatePath("/regulations");
  revalidatePath("/admin/regulations");
  return { success: true };
}
