import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readJsonFile<T>(filename: string, fallback: T): T {
  try {
    let filePath = path.join(DATA_DIR, filename);
    if (process.env.VERCEL_ENV) {
      const tmpPath = path.join("/tmp", filename);
      if (fs.existsSync(tmpPath)) {
        filePath = tmpPath;
      }
    }
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile<T>(filename: string, data: T): void {
  if (process.env.VERCEL_ENV) {
    try {
      const tmpPath = path.join("/tmp", filename);
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
      return;
    } catch (e) {
      console.error(`Failed to write fallback file to /tmp/${filename}:`, e);
    }
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
