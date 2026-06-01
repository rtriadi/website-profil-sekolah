import { type Testimony, defaultTestimonies } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<Testimony>("testimonies");

export function getTestimonies(): Testimony[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultTestimonies;
}

export function saveTestimonies(input: Testimony[]): void {
  repo.save(input);
}
