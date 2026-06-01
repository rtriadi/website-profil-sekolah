import { type FAQItem, defaultFAQItems } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<FAQItem>("faq");

export function getFAQItems(): FAQItem[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultFAQItems;
}

export function saveFAQItems(input: FAQItem[]): void {
  repo.save(input);
}
