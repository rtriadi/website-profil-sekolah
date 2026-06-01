import {
  type OrgStructure,
  defaultOrgStructure,
} from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "org-structure.json";

export function getOrgStructure(): OrgStructure {
  const data = readJsonFile<OrgStructure | null>(DATA_FILE, null);
  return data ?? defaultOrgStructure;
}

export function saveOrgStructure(
  input: OrgStructure,
): void {
  writeJsonFile(DATA_FILE, input);
}
