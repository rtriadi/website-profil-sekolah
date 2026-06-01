import { type SchoolDocument } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolDocument>("school-documents");

export function getDocuments(): SchoolDocument[] {
  return repo.getAll();
}

export function saveDocuments(input: SchoolDocument[]): void {
  repo.save(input);
}
