import { type PPDBConfig, defaultPPDBConfig } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "ppdb.json";

export function getPPDBConfig(): PPDBConfig {
  const data = readJsonFile<PPDBConfig | null>(DATA_FILE, null);
  return data ?? defaultPPDBConfig;
}

export function savePPDBConfig(input: PPDBConfig): void {
  writeJsonFile(DATA_FILE, input);
}
