import { type OrgStructure, defaultOrgStructure } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<OrgStructure>("org-structure");

export function getOrgStructure(): OrgStructure {
  const data = repo.getAll();
  return data[0] ?? defaultOrgStructure;
}

export function saveOrgStructure(input: OrgStructure): void {
  repo.save([input]);
}
