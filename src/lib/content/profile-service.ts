import {
  type SchoolProfile,
  type SchoolNarrative,
  defaultSchoolProfile,
  defaultSchoolNarrative,
} from "@/lib/content/schema";

/**
 * Returns the school profile payload for public rendering.
 *
 * Currently backed by in-memory seed data.  When a database or CMS
 * integration is wired in, swap the source here without changing
 * the public route layer.
 */
export async function getSchoolProfile(): Promise<SchoolProfile> {
  return defaultSchoolProfile;
}

export async function getSchoolNarrative(): Promise<SchoolNarrative> {
  return defaultSchoolNarrative;
}
