"use server";

import { revalidatePath } from "next/cache";
import { saveFAQItems } from "@/lib/content/faq-service";
import type { FAQItem } from "@/lib/content/schema";

export async function saveFAQAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: FAQItem[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data FAQ tidak valid" };
  }

  if (items.length === 0) {
    return { error: "Minimal satu pertanyaan harus ditambahkan" };
  }

  for (const item of items) {
    if (!item.question?.trim()) {
      return { fieldErrors: { question: "Pertanyaan harus diisi" } };
    }
    if (!item.answer?.trim()) {
      return { fieldErrors: { answer: "Jawaban harus diisi" } };
    }
  }

  saveFAQItems(items);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  return { success: true };
}
