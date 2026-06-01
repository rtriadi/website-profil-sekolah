import { getRepository } from "@/lib/data/repository";

export interface InstagramSettings {
  handle: string;
  url: string;
}

export const defaultInstagram: InstagramSettings = {
  handle: "sekolahkami",
  url: "https://www.instagram.com/sekolahkami/",
};

const repo = getRepository<InstagramSettings>("instagram");

export function getInstagramSettings(): InstagramSettings {
  const data = repo.getAll();
  return data[0] ?? defaultInstagram;
}

export function saveInstagramSettings(input: InstagramSettings): void {
  repo.save([input]);
}
