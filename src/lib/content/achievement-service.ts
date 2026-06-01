import { type Achievement, defaultAchievements } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "achievements.json";

export function getAchievements(): Achievement[] {
  const data = readJsonFile<Achievement[] | null>(DATA_FILE, null);
  return data ?? defaultAchievements;
}

export function saveAchievements(input: Achievement[]): void {
  writeJsonFile(DATA_FILE, input);
}
