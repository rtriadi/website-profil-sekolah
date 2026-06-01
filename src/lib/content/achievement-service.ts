import { type Achievement, defaultAchievements } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<Achievement>("achievements");

export function getAchievements(): Achievement[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultAchievements;
}

export function saveAchievements(input: Achievement[]): void {
  repo.save(input);
}
