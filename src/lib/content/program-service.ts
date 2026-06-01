import { type SchoolProgram, defaultPrograms } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolProgram>("school-programs");

export function getPrograms(): SchoolProgram[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultPrograms;
}

export function savePrograms(input: SchoolProgram[]): void {
  repo.save(input);
}
