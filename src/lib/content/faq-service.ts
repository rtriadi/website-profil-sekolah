import { type FAQItem, defaultFAQItems } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "faq.json";

export function getFAQItems(): FAQItem[] {
  const data = readJsonFile<FAQItem[] | null>(DATA_FILE, null);
  return data ?? defaultFAQItems;
}

export function saveFAQItems(input: FAQItem[]): void {
  writeJsonFile(DATA_FILE, input);
}
