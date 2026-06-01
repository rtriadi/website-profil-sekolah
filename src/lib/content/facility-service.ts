import { type Facility, defaultFacilities } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<Facility>("facilities");

export function getFacilities(): Facility[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultFacilities;
}

export function saveFacilities(input: Facility[]): void {
  repo.save(input);
}
