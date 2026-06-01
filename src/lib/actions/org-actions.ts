"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveOrgStructure } from "@/lib/content/org-service";
import type { OrgNode } from "@/lib/content/schema";

export async function saveOrgAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const membersRaw = formData.get("members") as string;
    if (!membersRaw) return { error: "Data anggota tidak ditemukan" };

    const members: OrgNode[] = JSON.parse(membersRaw);
    saveOrgStructure({
      title: "Struktur Organisasi Sekolah",
      description: "Bagan struktur organisasi dan tata kelola sekolah",
      members,
    });

    revalidatePath("/struktur-organisasi");
    revalidatePath("/admin/org-structure");
    return { success: true };
  } catch {
    return { error: "Gagal menyimpan data" };
  }
}
