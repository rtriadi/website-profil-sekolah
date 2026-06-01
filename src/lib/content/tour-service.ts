import { getRepository } from "@/lib/data/repository";

export interface VirtualTourSettings {
  imageUrl: string;
  title: string;
}

export const defaultTour: VirtualTourSettings = {
  imageUrl: "",
  title: "Virtual Tour Sekolah",
};

const repo = getRepository<VirtualTourSettings>("virtual-tour");

export function getTourSettings(): VirtualTourSettings {
  const data = repo.getAll();
  return data[0] ?? defaultTour;
}

export function saveTourSettings(input: VirtualTourSettings): void {
  repo.save([input]);
}
