import { type Extracurricular, defaultExtracurriculars } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<Extracurricular>("extracurriculars");

export function getExtracurriculars(): Extracurricular[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultExtracurriculars;
}

export function saveExtracurriculars(input: Extracurricular[]): void {
  repo.save(input);
}
