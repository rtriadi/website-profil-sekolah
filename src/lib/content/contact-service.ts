import { type ContactInfo, defaultContactInfo } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<ContactInfo>("contact");

export function getContactInfo(): ContactInfo {
  const data = repo.getAll();
  return data[0] ?? defaultContactInfo;
}

export function saveContactInfo(input: ContactInfo): void {
  repo.save([input]);
}
