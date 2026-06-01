import {
  type SchoolProfile,
  type SchoolNarrative,
  defaultSchoolProfile,
  defaultSchoolNarrative,
} from "@/lib/content/schema";
import { readJsonFile } from "@/lib/data/file-storage";

const PROFILE_FILE = "profile.json";
const NARRATIVE_FILE = "narrative.json";

export async function getSchoolProfile(): Promise<SchoolProfile> {
  return readJsonFile<SchoolProfile>(PROFILE_FILE, defaultSchoolProfile);
}

export async function getSchoolNarrative(): Promise<SchoolNarrative> {
  return readJsonFile<SchoolNarrative>(NARRATIVE_FILE, defaultSchoolNarrative);
}
