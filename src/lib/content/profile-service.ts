import { type SchoolProfile, defaultSchoolProfile } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolProfile>("school-profile");

export function getSchoolProfile(): SchoolProfile {
  const data = repo.getAll();
  return data[0] ?? defaultSchoolProfile;
}

export function saveSchoolProfile(input: SchoolProfile): void {
  repo.save([input]);
}
