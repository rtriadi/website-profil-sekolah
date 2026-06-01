import { type RegulationSection, defaultRegulations } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "regulations.json";

export function getRegulations(): RegulationSection[] {
  const data = readJsonFile<RegulationSection[] | null>(DATA_FILE, null);
  return data ?? defaultRegulations;
}

export function saveRegulations(input: RegulationSection[]): void {
  writeJsonFile(DATA_FILE, input);
}
