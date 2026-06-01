"use server";

import { revalidatePath } from "next/cache";
import {
  createClass,
  deleteClass,
  updateClass,
} from "@/lib/content/classes-service";

export async function createClassAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const name = formData.get("name") as string;
  const teacherId = formData.get("teacherId") as string;
  const roomName = formData.get("roomName") as string;
  const studentCountStr = formData.get("studentCount") as string;
  const description = formData.get("description") as string;
  const sortOrderStr = formData.get("sortOrder") as string;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Nama kelas harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  const studentCount = parseInt(studentCountStr, 10);
  const sortOrder = parseInt(sortOrderStr, 10);

  createClass({
    name: name.trim(),
    teacherId: teacherId?.trim() || undefined,
    roomName: roomName?.trim() || undefined,
    studentCount: isNaN(studentCount) ? undefined : studentCount,
    description: description?.trim() || undefined,
    sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
  });

  revalidatePath("/kelas");
  revalidatePath("/admin/classes");
  return { success: true };
}

export async function updateClassAction(
  id: string,
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const name = formData.get("name") as string;
  const teacherId = formData.get("teacherId") as string;
  const roomName = formData.get("roomName") as string;
  const studentCountStr = formData.get("studentCount") as string;
  const description = formData.get("description") as string;
  const sortOrderStr = formData.get("sortOrder") as string;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Nama kelas harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  const studentCount = parseInt(studentCountStr, 10);
  const sortOrder = parseInt(sortOrderStr, 10);

  updateClass(id, {
    name: name.trim(),
    teacherId: teacherId?.trim() || undefined,
    roomName: roomName?.trim() || undefined,
    studentCount: isNaN(studentCount) ? undefined : studentCount,
    description: description?.trim() || undefined,
    sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
  });

  revalidatePath("/kelas");
  revalidatePath("/admin/classes");
  return { success: true };
}

export async function deleteClassAction(id: string): Promise<void> {
  deleteClass(id);
  revalidatePath("/kelas");
  revalidatePath("/admin/classes");
}
