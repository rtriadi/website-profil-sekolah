"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/lib/content/events-service";
import type { EventCategory } from "@/lib/content/schema";

export async function createEventAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string }> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string;

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!description?.trim()) errors.description = "Deskripsi harus diisi";
  if (!date) errors.date = "Tanggal harus diisi";
  if (category && !["akademik", "non-akademik", "libur", "rapat", "lainnya"].includes(category)) {
    errors.category = "Kategori tidak valid";
  }

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  await createEvent({
    title: title.trim(),
    description: description.trim(),
    date,
    time: time?.trim() || undefined,
    location: location?.trim() || undefined,
    category: (category as EventCategory) || "lainnya",
  });

  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEventAction(
  id: string,
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string }> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string;

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!description?.trim()) errors.description = "Deskripsi harus diisi";
  if (!date) errors.date = "Tanggal harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  await updateEvent(id, {
    title: title.trim(),
    description: description.trim(),
    date,
    time: time?.trim() || undefined,
    location: location?.trim() || undefined,
    category: (category as EventCategory) || "lainnya",
  });

  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEventAction(id: string): Promise<void> {
  await deleteEvent(id);
  revalidatePath("/events");
  revalidatePath("/admin/events");
}
