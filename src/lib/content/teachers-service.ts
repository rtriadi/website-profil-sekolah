import { type Teacher, defaultTeachers } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<Teacher>("teachers");

function loadTeachers(): Teacher[] {
  const data = repo.getAll();
  if (data.length === 0) {
    repo.save(defaultTeachers);
    return defaultTeachers;
  }
  return data;
}

export function getTeachers(): Teacher[] {
  return loadTeachers();
}

export function getTeacherById(id: string): Teacher | null {
  return loadTeachers().find((t) => t.id === id) ?? null;
}

export function createTeacher(input: Omit<Teacher, "id">): Teacher {
  const teachers = loadTeachers();
  const id = `tch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const teacher: Teacher = { ...input, id };
  teachers.push(teacher);
  repo.save(teachers);
  return teacher;
}

export function updateTeacher(id: string, input: Partial<Omit<Teacher, "id">>): Teacher | null {
  const teachers = loadTeachers();
  const index = teachers.findIndex((t) => t.id === id);
  if (index === -1) return null;
  teachers[index] = { ...teachers[index], ...input };
  repo.save(teachers);
  return teachers[index];
}

export function deleteTeacher(id: string): boolean {
  const teachers = loadTeachers();
  const filtered = teachers.filter((t) => t.id !== id);
  if (filtered.length === teachers.length) return false;
  repo.save(filtered);
  return true;
}
