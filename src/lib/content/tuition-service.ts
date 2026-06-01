import { type TuitionData, defaultTuition } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<TuitionData>("tuition");

export function getTuition(): TuitionData {
  const data = repo.getAll();
  return data[0] ?? defaultTuition;
}

export function saveTuition(input: TuitionData): void {
  repo.save([input]);
}
