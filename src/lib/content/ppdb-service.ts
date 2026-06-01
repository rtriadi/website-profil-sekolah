import { type PPDBConfig, defaultPPDBConfig } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<PPDBConfig>("ppdb-config");

export function getPPDBConfig(): PPDBConfig {
  const data = repo.getAll();
  return data[0] ?? defaultPPDBConfig;
}

export function savePPDBConfig(input: PPDBConfig): void {
  repo.save([input]);
}
