import { type NewsArticle, defaultNews } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "news.json";

export function getNews(): NewsArticle[] {
  const data = readJsonFile<NewsArticle[] | null>(DATA_FILE, null);
  return data ?? defaultNews;
}

export function saveNews(input: NewsArticle[]): void {
  writeJsonFile(DATA_FILE, input);
}
