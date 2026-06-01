import { type SchoolClass, defaultClasses } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolClass>("classes");

function loadClasses(): SchoolClass[] {
  const data = repo.getAll();
  if (data.length === 0) {
    repo.save(defaultClasses);
    return defaultClasses;
  }
  return data;
}

export function getClasses(): SchoolClass[] {
  return loadClasses().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getClassById(id: string): SchoolClass | null {
  return loadClasses().find((c) => c.id === id) ?? null;
}

export function createClass(input: Omit<SchoolClass, "id">): SchoolClass {
  const classes = loadClasses();
  const id = `cls-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const item: SchoolClass = { ...input, id };
  classes.push(item);
  repo.save(classes);
  return item;
}

export function updateClass(id: string, input: Partial<Omit<SchoolClass, "id">>): SchoolClass | null {
  const classes = loadClasses();
  const index = classes.findIndex((c) => c.id === id);
  if (index === -1) return null;
  classes[index] = { ...classes[index], ...input };
  repo.save(classes);
  return classes[index];
}

export function deleteClass(id: string): boolean {
  const classes = loadClasses();
  const filtered = classes.filter((c) => c.id !== id);
  if (filtered.length === classes.length) return false;
  repo.save(filtered);
  return true;
}
