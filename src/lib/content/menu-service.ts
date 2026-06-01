import { getRepository } from "@/lib/data/repository";
import { storeGet, storeSet } from "@/lib/data/supabase-store";
import { isSupabaseConfigured } from "@/lib/supabase/client";

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

const STORE_KEY = "menu-settings.json";
const repo = getRepository<MenuSettings>("menu-settings");

/** Synchronous — only reliable in local JSON mode */
export function getMenuSettings(): MenuSettings {
  const data = repo.getAll();
  return data[0] ?? defaultMenuSettings;
}

/** Async version — reads from Supabase in production, JSON locally */
export async function getMenuSettingsAsync(): Promise<MenuSettings> {
  if (isSupabaseConfigured()) {
    return storeGet<MenuSettings>(STORE_KEY, defaultMenuSettings);
  }
  return getMenuSettings();
}

/** Synchronous save — only for local JSON mode */
export function saveMenuSettings(settings: MenuSettings): void {
  repo.save([settings]);
}

/** Async save — writes to Supabase in production, JSON locally */
export async function saveMenuSettingsAsync(settings: MenuSettings): Promise<void> {
  if (isSupabaseConfigured()) {
    await storeSet(STORE_KEY, settings);
  } else {
    saveMenuSettings(settings);
  }
}
