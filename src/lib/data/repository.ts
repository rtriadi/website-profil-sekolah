/**
 * Repository abstraction — allows switching between JSON file storage
 * and Supabase without changing service code.
 *
 * All services use `getRepository<T>(tableName)` which returns the
 * correct implementation based on DATABASE_PROVIDER env.
 */

import { readJsonFile, writeJsonFile } from "./file-storage";

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

// ── Supabase implementation (stub for migration) ─────────
export class SupabaseRepository<T> implements Repository<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getAll(): T[] {
    return [];
  }

  getById(_id: string): T | undefined {
    return undefined;
  }

  save(_data: T[]): void {
    // noop — will implement during migration
  }
}

// ── Provider ─────────────────────────────────────────────
let provider: "json" | "supabase" = "json";

export function setProvider(p: "json" | "supabase") {
  provider = p;
}

export function getProvider(): "json" | "supabase" {
  return provider;
}

const singletonDefaults: Record<string, unknown> = {};

export function registerSingleton(tableName: string, defaultValue: unknown) {
  singletonDefaults[tableName] = defaultValue;
}

export function getRepository<T>(tableName: string): Repository<T> {
  if (provider === "supabase") {
    return new SupabaseRepository<T>(tableName);
  }
  if (tableName in singletonDefaults) {
    return new JsonSingletonRepository<T>(tableName, singletonDefaults[tableName] as T);
  }
  return new JsonRepository<T>(tableName);
}
