import { type MealEntry, defaultMealMenu } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<MealEntry>("meal-menu");

export function getMealMenu(): MealEntry[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultMealMenu;
}

export function saveMealMenu(input: MealEntry[]): void {
  repo.save(input);
}
