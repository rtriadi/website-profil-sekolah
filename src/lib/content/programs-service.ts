import {
  type SchoolProgram,
  type Facility,
  defaultPrograms,
  defaultFacilities,
} from "@/lib/content/schema";
import { readJsonFile } from "@/lib/data/file-storage";

const PROGRAMS_FILE = "programs.json";
const FACILITIES_FILE = "facilities.json";

export async function getPrograms(): Promise<SchoolProgram[]> {
  return readJsonFile<SchoolProgram[]>(PROGRAMS_FILE, defaultPrograms);
}

export async function getFacilities(): Promise<Facility[]> {
  return readJsonFile<Facility[]>(FACILITIES_FILE, defaultFacilities);
}
