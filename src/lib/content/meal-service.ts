import { type MealEntry, defaultMealMenu } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "meal-menu.json";

export function getMealMenu(): MealEntry[] {
  const data = readJsonFile<MealEntry[] | null>(DATA_FILE, null);
  return data ?? defaultMealMenu;
}

export function saveMealMenu(input: MealEntry[]): void {
  writeJsonFile(DATA_FILE, input);
}
