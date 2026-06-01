"use server";

import { saveHeroSlides } from "@/lib/content/hero-slides-service";
import { type HeroSlide } from "@/lib/content/schema";
import { revalidatePath } from "next/cache";

export async function saveHeroSlidesAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const itemsStr = formData.get("items") as string;
    if (!itemsStr) {
      return { error: "Data slide tidak boleh kosong." };
    }

    const items = JSON.parse(itemsStr) as HeroSlide[];
    
    // Simple validation
    for (const item of items) {
      if (!item.src?.trim()) {
        return { error: "Semua slide wajib memiliki URL/path gambar." };
      }
      if (!item.title?.trim()) {
        return { error: "Semua slide wajib memiliki judul." };
      }
    }

    // Save slides through service
    saveHeroSlides(items);
    
    // Revalidate landing page layout
    revalidatePath("/", "layout");
    revalidatePath("/");
    
    return { success: true };
  } catch (e: any) {
    return { error: e.message || "Gagal menyimpan perubahan slide." };
  }
}
