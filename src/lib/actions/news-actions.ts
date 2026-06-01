"use server";

import { revalidatePath } from "next/cache";
import { saveNews } from "@/lib/content/news-service";
import type { NewsArticle } from "@/lib/content/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function saveNewsAction(
  prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const itemsRaw = formData.get("items") as string;

  let items: NewsArticle[] = [];
  try {
    if (itemsRaw) items = JSON.parse(itemsRaw);
  } catch {
    return { error: "Data berita tidak valid" };
  }

  for (const item of items) {
    if (!item.title?.trim()) return { error: "Judul harus diisi" };
    if (!item.content?.trim()) return { error: "Konten harus diisi" };
    if (!item.slug?.trim()) item.slug = slugify(item.title);
  }

  saveNews(items);
  revalidatePath("/news");
  revalidatePath("/news/[slug]");
  revalidatePath("/admin/news");
  return { success: true };
}
