import { getRepository } from "@/lib/data/repository";

export type MenuSettings = Record<string, boolean>;

export const defaultMenuSettings: MenuSettings = {
  "/profile": true,
  "/guru": true,
  "/struktur-organisasi": true,
  "/programs": true,
  "/regulations": true,
  "/galeri": true,
  "/achievements": true,
  "/extracurriculars": true,
  "/instagram": true,
  "/ppdb": true,
  "/biaya": true,
  "/meal-menu": true,
  "/news": true,
  "/virtual-tour": true,
  "/announcements": true,
  "/events": true,
  "/unduhan": true,
  "/kalender-akademik": true,
  "/faq": true,
  "/kontak": true,
  "/testimonies": true,
  "/kelas": true,
};

const repo = getRepository<MenuSettings>("menu-settings");

export function getMenuSettings(): MenuSettings {
  const data = repo.getAll();
  return data[0] ?? defaultMenuSettings;
}

export function saveMenuSettings(settings: MenuSettings): void {
  repo.save([settings]);
}
