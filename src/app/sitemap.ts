import type { MetadataRoute } from "next";
import { getNews } from "@/lib/content/news-service";
import { getAchievements } from "@/lib/content/achievement-service";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sekolah-anda.vercel.app";

const staticPages: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/profile", priority: 0.9 },
  { path: "/programs", priority: 0.8 },
  { path: "/guru", priority: 0.8 },
  { path: "/struktur-organisasi", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/biaya", priority: 0.7 },
  { path: "/ppdb", priority: 0.9 },
  { path: "/news", priority: 0.8 },
  { path: "/announcements", priority: 0.8 },
  { path: "/events", priority: 0.7 },
  { path: "/galeri", priority: 0.7 },
  { path: "/achievements", priority: 0.7 },
  { path: "/ekstrakurikuler", priority: 0.7 },
  { path: "/kalender-akademik", priority: 0.6 },
  { path: "/kontak", priority: 0.7 },
  { path: "/unduhan", priority: 0.5 },
  { path: "/regulasi", priority: 0.5 },
  { path: "/virtual-tour", priority: 0.5 },
  { path: "/instagram", priority: 0.5 },
  { path: "/meal-menu", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.priority >= 0.8 ? "weekly" as const : "monthly" as const,
    priority: page.priority,
  }));

  try {
    const news = getNews();
    for (const article of news) {
      entries.push({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // data not available when accessed outside build context
  }

  try {
    const achievements = getAchievements();
    for (const achievement of achievements) {
      entries.push({
        url: `${BASE_URL}/achievements`,
        lastModified: new Date(achievement.date),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // data not available when accessed outside build context
  }

  return entries;
}
