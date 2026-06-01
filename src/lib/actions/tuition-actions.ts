"use server";

import { revalidatePath } from "next/cache";
import { saveTuition } from "@/lib/content/tuition-service";
import type { TuitionData } from "@/lib/content/schema";

export async function saveTuitionAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const dataRaw = formData.get("data") as string;

  let data: TuitionData;
  try {
    if (dataRaw) data = JSON.parse(dataRaw);
    else return { error: "Data tidak valid" };
  } catch {
    return { error: "Data tidak valid" };
  }

  if (!data.academicYear?.trim()) {
    return { fieldErrors: { academicYear: "Tahun ajaran harus diisi" } };
  }

  for (const item of data.items) {
    if (!item.label?.trim()) return { fieldErrors: { label: "Nama biaya harus diisi" } };
    if (typeof item.amount !== "number" || item.amount < 0) return { fieldErrors: { amount: "Jumlah harus angka positif" } };
  }

  saveTuition(data);
  revalidatePath("/biaya");
  revalidatePath("/admin/tuition");
  return { success: true };
}
