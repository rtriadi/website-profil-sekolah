"use server";

import { revalidatePath } from "next/cache";
import { saveAcademicCalendar } from "@/lib/content/academic-calendar-service";
import type { AcademicCalendarPeriod } from "@/lib/content/schema";

export async function saveAcademicCalendarAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const title = formData.get("title") as string;
  const academicYear = formData.get("academicYear") as string;
  const periodsRaw = formData.get("periods") as string;

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!academicYear?.trim()) errors.academicYear = "Tahun ajaran harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  let periods: AcademicCalendarPeriod[] = [];
  try {
    if (periodsRaw) periods = JSON.parse(periodsRaw);
  } catch {
    return { error: "Data periode tidak valid" };
  }

  saveAcademicCalendar({
    title: title.trim(),
    academicYear: academicYear.trim(),
    periods,
  });

  revalidatePath("/kalender-akademik");
  revalidatePath("/admin/academic-calendar");
  return { success: true };
}
