import { type RegulationSection, defaultRegulations } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<RegulationSection>("regulations");

export function getRegulations(): RegulationSection[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultRegulations;
}

export function saveRegulations(input: RegulationSection[]): void {
  repo.save(input);
}
