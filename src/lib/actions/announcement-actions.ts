"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AnnouncementInput } from "@/lib/content/schema";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementBySlug,
  updateAnnouncement,
} from "@/lib/content/announcement-service";

export async function createAnnouncementAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string }> {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const slug = (formData.get("slug") as string) || undefined;
  const scheduledAt = (formData.get("scheduledAt") as string) || undefined;
  const spotlight = formData.get("spotlight") === "on";

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!summary?.trim()) errors.summary = "Ringkasan harus diisi";
  if (!content?.trim()) errors.content = "Konten harus diisi";
  if (category && !["berita", "kegiatan", "pengumuman"].includes(category)) {
    errors.category = "Kategori tidak valid";
  }

  if (slug?.trim()) {
    const existing = await getAnnouncementBySlug(slug.trim());
    if (existing) errors.slug = "Slug sudah digunakan";
  }

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  const input: AnnouncementInput = {
    title: title.trim(),
    summary: summary.trim(),
    content: content.trim(),
    author: "Admin",
    category: (category as AnnouncementInput["category"]) || "pengumuman",
    slug: slug?.trim(),
    scheduledAt,
    spotlight,
  };

  await createAnnouncement(input);
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}

export async function updateAnnouncementAction(
  id: string,
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string }> {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const slug = (formData.get("slug") as string) || undefined;
  const scheduledAt = (formData.get("scheduledAt") as string) || undefined;
  const spotlight = formData.get("spotlight") === "on";

  const errors: Record<string, string> = {};
  if (!title?.trim()) errors.title = "Judul harus diisi";
  if (!summary?.trim()) errors.summary = "Ringkasan harus diisi";
  if (!content?.trim()) errors.content = "Konten harus diisi";

  if (slug?.trim()) {
    const existing = await getAnnouncementBySlug(slug.trim());
    if (existing && existing.id !== id) errors.slug = "Slug sudah digunakan";
  }

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  await updateAnnouncement(id, {
    title: title.trim(),
    summary: summary.trim(),
    content: content.trim(),
    category: (category as AnnouncementInput["category"]) || "pengumuman",
    slug: slug?.trim(),
    scheduledAt,
    spotlight,
  });

  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}

export async function deleteAnnouncementAction(id: string): Promise<void> {
  await deleteAnnouncement(id);
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
}
