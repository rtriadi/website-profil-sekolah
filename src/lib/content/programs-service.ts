import { type SchoolProgram, type Facility, defaultPrograms, defaultFacilities } from "./schema";
import { getRepository } from "@/lib/data/repository";

const programRepo = getRepository<SchoolProgram>("school-programs");
const facilityRepo = getRepository<Facility>("facilities");

export async function getPrograms(): Promise<SchoolProgram[]> {
  const data = programRepo.getAll();
  return data.length > 0 ? data : defaultPrograms;
}

export async function getFacilities(): Promise<Facility[]> {
  const data = facilityRepo.getAll();
  return data.length > 0 ? data : defaultFacilities;
}
