import { type Extracurricular, defaultExtracurriculars } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "extracurriculars.json";

export function getExtracurriculars(): Extracurricular[] {
  const data = readJsonFile<Extracurricular[] | null>(DATA_FILE, null);
  return data ?? defaultExtracurriculars;
}

export function saveExtracurriculars(input: Extracurricular[]): void {
  writeJsonFile(DATA_FILE, input);
}
