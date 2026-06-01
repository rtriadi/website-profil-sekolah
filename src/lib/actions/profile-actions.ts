"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";
import { defaultSchoolProfile, defaultSchoolNarrative, defaultPrograms, defaultFacilities } from "@/lib/content/schema";

const PROFILE_FILE = "profile.json";
const NARRATIVE_FILE = "narrative.json";
const PROGRAMS_FILE = "programs.json";
const FACILITIES_FILE = "facilities.json";

export async function updateProfileAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const profile = {
    identity: {
      name: formData.get("name") as string,
      shortName: formData.get("shortName") as string,
      npsn: formData.get("npsn") as string,
      foundedDate: formData.get("foundedDate") as string,
      principalName: formData.get("principalName") as string,
      status: formData.get("status") as "Negeri" | "Swasta",
    },
    address: {
      street: formData.get("street") as string,
      village: formData.get("village") as string,
      district: formData.get("district") as string,
      city: formData.get("city") as string,
      province: formData.get("province") as string,
      postalCode: formData.get("postalCode") as string,
    },
    contact: {
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
    },
    accreditation: {
      rating: formData.get("accreditationRating") as string,
      institution: formData.get("accreditationInstitution") as string,
      certificateNumber: formData.get("accreditationCertNumber") as string,
      validUntil: formData.get("accreditationValidUntil") as string,
    },
  };

  writeJsonFile(PROFILE_FILE, profile);
  revalidatePath("/");
  revalidatePath("/admin/profile");
  return { success: true };
}

export async function updateNarrativeAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const narrative = {
    history: (formData.get("history") as string).split("\n").filter(Boolean),
    vision: formData.get("vision") as string,
    mission: (formData.get("mission") as string).split("\n").filter(Boolean),
  };

  writeJsonFile(NARRATIVE_FILE, narrative);
  revalidatePath("/");
  revalidatePath("/admin/profile/narrative");
  return { success: true };
}

export async function addProgramAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const programType = formData.get("type") as string;
  const icon = formData.get("icon") as string;

  if (!name?.trim() || !description?.trim()) {
    return { error: "Nama dan deskripsi harus diisi" };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();

  const programs = readJsonFile<typeof defaultPrograms>(PROGRAMS_FILE, defaultPrograms);
  programs.push({ name, description, slug, type: programType as any, icon: icon || "📚" });
  writeJsonFile(PROGRAMS_FILE, programs);

  revalidatePath("/programs");
  revalidatePath("/admin/profile/programs");
  return { success: true };
}

export async function deleteProgramAction(
  slug: string,
): Promise<void> {
  const programs = readJsonFile<typeof defaultPrograms>(PROGRAMS_FILE, defaultPrograms);
  const filtered = programs.filter((p) => p.slug !== slug);
  writeJsonFile(PROGRAMS_FILE, filtered);
  revalidatePath("/programs");
  revalidatePath("/admin/profile/programs");
}

export async function addFacilityAction(
  prev: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  if (!name?.trim() || !description?.trim()) {
    return { error: "Nama dan deskripsi harus diisi" };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();

  const facilities = readJsonFile<typeof defaultFacilities>(FACILITIES_FILE, defaultFacilities);
  facilities.push({ name, description, slug, category: category as any });
  writeJsonFile(FACILITIES_FILE, facilities);

  revalidatePath("/programs");
  revalidatePath("/admin/profile/facilities");
  return { success: true };
}

export async function deleteFacilityAction(
  slug: string,
): Promise<void> {
  const facilities = readJsonFile<typeof defaultFacilities>(FACILITIES_FILE, defaultFacilities);
  const filtered = facilities.filter((f) => f.slug !== slug);
  writeJsonFile(FACILITIES_FILE, filtered);
  revalidatePath("/programs");
  revalidatePath("/admin/profile/facilities");
}
