import { getRepository } from "@/lib/data/repository";

export interface LogEntry {
  id: string;
  action: string;
  section: string;
  detail: string;
  createdAt: string;
}

const repo = getRepository<LogEntry>("activity-log");

export function getLogs(limit = 50): LogEntry[] {
  return repo.getAll().slice(0, limit);
}

export function addLog(action: string, section: string, detail: string): void {
  const logs = repo.getAll();
  logs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    action,
    section,
    detail,
    createdAt: new Date().toISOString(),
  });
  repo.save(logs.slice(0, 500));
}
