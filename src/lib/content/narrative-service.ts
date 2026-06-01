import { type SchoolNarrative, defaultSchoolNarrative } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolNarrative>("school-narrative");

export function getSchoolNarrative(): SchoolNarrative {
  const data = repo.getAll();
  return data[0] ?? defaultSchoolNarrative;
}

export function saveSchoolNarrative(input: SchoolNarrative): void {
  repo.save([input]);
}
