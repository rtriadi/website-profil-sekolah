import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "virtual-tour.json";

export interface VirtualTourSettings {
  imageUrl: string;
  title: string;
}

export const defaultTour: VirtualTourSettings = {
  imageUrl: "",
  title: "Virtual Tour Sekolah",
};

export function getTourSettings(): VirtualTourSettings {
  const data = readJsonFile<VirtualTourSettings | null>(DATA_FILE, null);
  return data ?? defaultTour;
}

export function saveTourSettings(input: VirtualTourSettings): void {
  writeJsonFile(DATA_FILE, input);
}
