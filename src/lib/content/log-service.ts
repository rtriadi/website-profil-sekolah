import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "activity-log.json";

export interface LogEntry {
  id: string;
  action: string;
  section: string;
  detail: string;
  createdAt: string;
}

export function getLogs(limit = 50): LogEntry[] {
  const data = readJsonFile<LogEntry[] | null>(DATA_FILE, null);
  return (data ?? []).slice(0, limit);
}

export function addLog(action: string, section: string, detail: string): void {
  const logs = readJsonFile<LogEntry[] | null>(DATA_FILE, null) ?? [];
  logs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    action,
    section,
    detail,
    createdAt: new Date().toISOString(),
  });
  writeJsonFile(DATA_FILE, logs.slice(0, 500));
}
