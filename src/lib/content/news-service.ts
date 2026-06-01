import { type NewsArticle, defaultNews } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<NewsArticle>("news");

export function getNews(): NewsArticle[] {
  const data = repo.getAll();
  return data.length > 0 ? data : defaultNews;
}

export function saveNews(input: NewsArticle[]): void {
  repo.save(input);
}
