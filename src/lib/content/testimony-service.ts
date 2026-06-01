import { type Testimony, defaultTestimonies } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "testimonies.json";

export function getTestimonies(): Testimony[] {
  const data = readJsonFile<Testimony[] | null>(DATA_FILE, null);
  return data ?? defaultTestimonies;
}

export function saveTestimonies(input: Testimony[]): void {
  writeJsonFile(DATA_FILE, input);
}
