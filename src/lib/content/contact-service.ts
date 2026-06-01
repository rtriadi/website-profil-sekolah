import { type ContactInfo, defaultContactInfo } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "contact.json";

export function getContactInfo(): ContactInfo {
  const data = readJsonFile<ContactInfo | null>(DATA_FILE, null);
  return data ?? defaultContactInfo;
}

export function saveContactInfo(input: ContactInfo): void {
  writeJsonFile(DATA_FILE, input);
}
