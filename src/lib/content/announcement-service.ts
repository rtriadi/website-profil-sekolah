import {
  type Announcement,
  type AnnouncementInput,
  defaultAnnouncements,
} from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "announcements.json";

function loadAnnouncements(): Announcement[] {
  const data = readJsonFile<Announcement[]>(DATA_FILE, defaultAnnouncements as Announcement[]);
  if (data === defaultAnnouncements) {
    writeJsonFile(DATA_FILE, data);
  }
  return data;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const announcements = loadAnnouncements();
  const now = new Date();
  return [...announcements]
    .filter((a) => {
      // If scheduledAt is set, only visible on/after that date
      if (a.scheduledAt && new Date(a.scheduledAt) > now) return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getAllAnnouncementsAdmin(): Promise<Announcement[]> {
  const announcements = loadAnnouncements();
  return [...announcements].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getSpotlightAnnouncement(): Promise<Announcement | null> {
  const announcements = await getAnnouncements();
  return announcements.find((a) => a.spotlight) ?? null;
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | null> {
  const announcements = loadAnnouncements();
  return announcements.find((a) => a.slug === slug) ?? null;
}

export async function getAnnouncementById(
  id: string,
): Promise<Announcement | null> {
  const announcements = loadAnnouncements();
  return announcements.find((a) => a.id === id) ?? null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function createAnnouncement(
  input: AnnouncementInput,
): Promise<Announcement> {
  const announcements = loadAnnouncements();
  const slug = input.slug?.trim() || slugify(input.title);
  const id = `ann-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const announcement: Announcement = {
    ...input,
    id,
    slug,
    publishedAt: new Date().toISOString(),
    scheduledAt: input.scheduledAt || undefined,
    spotlight: input.spotlight ?? false,
  };

  announcements.unshift(announcement);
  writeJsonFile(DATA_FILE, announcements);
  return announcement;
}

export async function updateAnnouncement(
  id: string,
  input: Partial<AnnouncementInput>,
): Promise<Announcement | null> {
  const announcements = loadAnnouncements();
  const index = announcements.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated = { ...announcements[index], ...input };
  announcements[index] = updated;
  writeJsonFile(DATA_FILE, announcements);
  return updated;
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  const announcements = loadAnnouncements();
  const filtered = announcements.filter((a) => a.id !== id);
  if (filtered.length === announcements.length) return false;
  writeJsonFile(DATA_FILE, filtered);
  return true;
}
