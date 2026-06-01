"use server";

import { revalidatePath } from "next/cache";
import {
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "@/lib/content/teachers-service";

export async function createTeacherAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const name = formData.get("name") as string;
  const nip = formData.get("nip") as string;
  const subject = formData.get("subject") as string;
  const position = formData.get("position") as string;
  const description = formData.get("description") as string;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Nama harus diisi";
  if (!subject?.trim()) errors.subject = "Bidang studi harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  createTeacher({
    name: name.trim(),
    nip: nip?.trim() || "-",
    subject: subject.trim(),
    position: position?.trim() || "Guru",
    description: description?.trim() || undefined,
  });

  revalidatePath("/guru");
  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function updateTeacherAction(
  id: string,
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const name = formData.get("name") as string;
  const nip = formData.get("nip") as string;
  const subject = formData.get("subject") as string;
  const position = formData.get("position") as string;
  const description = formData.get("description") as string;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Nama harus diisi";
  if (!subject?.trim()) errors.subject = "Bidang studi harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  updateTeacher(id, {
    name: name.trim(),
    nip: nip?.trim() || "-",
    subject: subject.trim(),
    position: position?.trim() || "Guru",
    description: description?.trim() || undefined,
  });

  revalidatePath("/guru");
  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function deleteTeacherAction(id: string): Promise<void> {
  deleteTeacher(id);
  revalidatePath("/guru");
  revalidatePath("/admin/teachers");
}
