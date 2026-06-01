"use server";

import { revalidatePath } from "next/cache";
import { saveTestimonies } from "@/lib/content/testimony-service";
import type { Testimony } from "@/lib/content/schema";

export async function saveTestimoniesAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: Testimony[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data testimoni tidak valid" };
  }

  for (const item of items) {
    if (!item.name?.trim()) {
      return { fieldErrors: { name: "Nama harus diisi" } };
    }
    if (!item.content?.trim()) {
      return { fieldErrors: { content: "Testimoni harus diisi" } };
    }
  }

  saveTestimonies(items);
  revalidatePath("/");
  revalidatePath("/admin/testimonies");
  return { success: true };
}
