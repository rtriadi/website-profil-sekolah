import { type SchoolProfile, defaultSchoolProfile } from "./schema";
import { getRepository } from "@/lib/data/repository";
import { storeGet, storeSet } from "@/lib/data/supabase-store";
import { isSupabaseConfigured } from "@/lib/supabase/client";

const STORE_KEY = "school-profile.json";
const repo = getRepository<SchoolProfile>("school-profile");

/** Synchronous — only reliable in local JSON mode */
export function getSchoolProfileSync(): SchoolProfile {
  const data = repo.getAll();
  return data[0] ?? defaultSchoolProfile;
}

/** Async — reads from Supabase in production, JSON locally */
export async function getSchoolProfile(): Promise<SchoolProfile> {
  if (isSupabaseConfigured()) {
    return storeGet<SchoolProfile>(STORE_KEY, defaultSchoolProfile);
  }
  return getSchoolProfileSync();
}

/** Async save — writes to Supabase in production, JSON locally */
export async function saveSchoolProfile(input: SchoolProfile): Promise<void> {
  if (isSupabaseConfigured()) {
    await storeSet(STORE_KEY, input);
  } else {
    repo.save([input]);
  }
}
