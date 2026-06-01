import { type TuitionData, defaultTuition } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "tuition.json";

export function getTuition(): TuitionData {
  const data = readJsonFile<TuitionData | null>(DATA_FILE, null);
  return data ?? defaultTuition;
}

export function saveTuition(input: TuitionData): void {
  writeJsonFile(DATA_FILE, input);
}
