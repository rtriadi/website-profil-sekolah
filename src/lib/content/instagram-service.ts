import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "instagram.json";

export interface InstagramSettings {
  handle: string;
  url: string;
}

export const defaultInstagram: InstagramSettings = {
  handle: "sekolahkami",
  url: "https://www.instagram.com/sekolahkami/",
};

export function getInstagramSettings(): InstagramSettings {
  const data = readJsonFile<InstagramSettings | null>(DATA_FILE, null);
  return data ?? defaultInstagram;
}

export function saveInstagramSettings(input: InstagramSettings): void {
  writeJsonFile(DATA_FILE, input);
}
