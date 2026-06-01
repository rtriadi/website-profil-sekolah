"use server";

import { revalidatePath } from "next/cache";
import { uploadDocument, deleteDocument } from "@/lib/content/documents-service";

export async function uploadDocumentAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  if (!file || file.size === 0) return { error: "Pilih file untuk diunggah" };
  if (!title?.trim()) return { error: "Judul harus diisi" };

  const result = await uploadDocument(
    file,
    title.trim(),
    description?.trim() || "",
    category || "lainnya",
  );

  if (result.error) return { error: result.error };

  revalidatePath("/unduhan");
  revalidatePath("/admin/documents");
  return { success: true };
}

export async function deleteDocumentAction(id: string): Promise<void> {
  deleteDocument(id);
  revalidatePath("/unduhan");
  revalidatePath("/admin/documents");
}
