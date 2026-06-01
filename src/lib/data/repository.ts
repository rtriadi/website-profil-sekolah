/**
 * Repository abstraction — allows switching between JSON file storage
 * and Supabase without changing service code.
 *
 * All services use `getRepository<T>(tableName)` which returns the
 * correct implementation based on DATABASE_PROVIDER env.
 */

import { readJsonFile, writeJsonFile } from "./file-storage";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// ── Interface ────────────────────────────────────────────
export interface Repository<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
  save(data: T[]): void;
}

// ── JSON implementation (default) ────────────────────────
export class JsonRepository<T> implements Repository<T> {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename.endsWith(".json") ? filename : `${filename}.json`;
  }

  getAll(): T[] {
    return readJsonFile<T[]>(this.filename, []);
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item: any) => item.id === id);
  }

  save(data: T[]): void {
    writeJsonFile(this.filename, data);
  }
}

// ── Singleton repository (single-row tables) ────────────
export class JsonSingletonRepository<T> implements Repository<T> {
  private filename: string;
  private defaultValue: T;

  constructor(filename: string, defaultValue: T) {
    this.filename = filename.endsWith(".json") ? filename : `${filename}.json`;
    this.defaultValue = defaultValue;
  }

  getAll(): T[] {
    const data = readJsonFile<T | null>(this.filename, null);
    return data ? [data] : [this.defaultValue];
  }

  getById(_id: string): T | undefined {
    return this.getAll()[0];
  }

  save(data: T[]): void {
    writeJsonFile(this.filename, data[0] ?? this.defaultValue);
  }
}

// ── Supabase implementation (REST sync via curl child process) ──
function supabaseSyncRequest(method: "GET" | "POST", pathStr: string, body?: any): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const fullUrl = `${url.replace(/\/$/, "")}/rest/v1/${pathStr}`;
  const args = [
    "-s",
    "-X", method,
    fullUrl,
    "-H", `apikey: ${key}`,
    "-H", `Authorization: Bearer ${key}`,
  ];

  if (body) {
    args.push("-H", "Content-Type: application/json");
    if (method === "POST") {
      args.push("-H", "Prefer: resolution=merge-duplicates");
    }
    args.push("-d", JSON.stringify(body));
  }

  const result = spawnSync("curl", args, { encoding: "utf-8" });
  if (result.status !== 0) {
    console.error("Supabase sync request failed:", result.error || result.stderr);
    return null;
  }
  return result.stdout;
}

export class SupabaseRepository<T> implements Repository<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getFilename(): string {
    return `${this.tableName}.json`;
  }

  getAll(): T[] {
    const filename = this.getFilename();
    try {
      const responseText = supabaseSyncRequest(
        "GET",
        `json_store?filename=eq.${filename}&select=content`
      );
      if (responseText) {
        const rows = JSON.parse(responseText);
        if (rows && rows.length > 0 && rows[0].content) {
          return JSON.parse(rows[0].content) as T[];
        }
      }
    } catch (e) {
      console.error(`Failed to read ${filename} from Supabase:`, e);
    }

    // Fallback: Read local file (read-only filesystem allows this)
    return readJsonFile<T[]>(filename, []);
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item: any) => item.id === id);
  }

  save(data: T[]): void {
    const filename = this.getFilename();
    try {
      const body = {
        filename: filename,
        content: JSON.stringify(data),
        updated_at: new Date().toISOString()
      };
      const responseText = supabaseSyncRequest("POST", "json_store", body);
      if (responseText !== null) {
        return; // Success
      }
    } catch (e) {
      console.error(`Failed to save ${filename} to Supabase:`, e);
    }

    // Fallback: If Supabase write fails, try writing to /tmp directory as local cache so it doesn't crash
    try {
      const tmpPath = path.join("/tmp", filename);
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.error("Fallback /tmp write failed:", e);
    }
  }
}

// ── Provider ─────────────────────────────────────────────
let provider: "json" | "supabase" | null = null;

function ensureProviderInitialized() {
  if (provider !== null) return;
  const onVercel = typeof process !== "undefined" && !!process.env?.VERCEL_ENV;
  const env = typeof process !== "undefined" && (process.env?.DATABASE_PROVIDER ?? (onVercel ? "supabase" : "json"));
  provider = env === "supabase" ? "supabase" : "json";
}

export function setProvider(p: "json" | "supabase") {
  provider = p;
}

export function getProvider(): "json" | "supabase" {
  ensureProviderInitialized();
  return provider ?? "json";
}

const singletonDefaults: Record<string, unknown> = {};

export function registerSingleton(tableName: string, defaultValue: unknown) {
  singletonDefaults[tableName] = defaultValue;
}

export function getRepository<T>(tableName: string): Repository<T> {
  ensureProviderInitialized();
  if (provider === "supabase") {
    return new SupabaseRepository<T>(tableName);
  }
  if (tableName in singletonDefaults) {
    return new JsonSingletonRepository<T>(tableName, singletonDefaults[tableName] as T);
  }
  return new JsonRepository<T>(tableName);
}
