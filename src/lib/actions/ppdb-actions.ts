"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { savePPDBConfig } from "@/lib/content/ppdb-service";
import type { PPDBRequirement, PPDBStep } from "@/lib/content/schema";

export async function savePPDBConfigAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const active = formData.get("active") === "on";
  const year = formData.get("year") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const scheduleText = formData.get("scheduleText") as string;
  const contact = formData.get("contact") as string;
  const registrationLink = formData.get("registrationLink") as string;
  const bannerText = formData.get("bannerText") as string;
  const requirementsRaw = formData.get("requirements") as string;
  const stepsRaw = formData.get("steps") as string;

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!description?.trim()) errors.description = "Deskripsi harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  let requirements: PPDBRequirement[] = [];
  let steps: PPDBStep[] = [];

  try {
    if (requirementsRaw) requirements = JSON.parse(requirementsRaw);
    if (stepsRaw) steps = JSON.parse(stepsRaw);
  } catch {
    return { error: "Data persyaratan atau langkah tidak valid" };
  }

  savePPDBConfig({
    active,
    year: year?.trim() || new Date().getFullYear().toString(),
    title: title.trim(),
    description: description.trim(),
    scheduleText: scheduleText?.trim() || "",
    contact: contact?.trim() || "",
    registrationLink: registrationLink?.trim() || undefined,
    bannerText: bannerText?.trim() || undefined,
    requirements,
    steps,
  });

  revalidatePath("/ppdb");
  revalidatePath("/admin/ppdb");
  return { success: true };
}
