import { type Teacher, defaultTeachers } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "teachers.json";

function loadTeachers(): Teacher[] {
  const data = readJsonFile<Teacher[]>(DATA_FILE, defaultTeachers);
  if (data === defaultTeachers) {
    writeJsonFile(DATA_FILE, data);
  }
  return data;
}

export function getTeachers(): Teacher[] {
  return loadTeachers();
}

export function getTeacherById(id: string): Teacher | null {
  return loadTeachers().find((t) => t.id === id) ?? null;
}

export function createTeacher(
  input: Omit<Teacher, "id">,
): Teacher {
  const teachers = loadTeachers();
  const id = `tch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const teacher: Teacher = { ...input, id };
  teachers.push(teacher);
  writeJsonFile(DATA_FILE, teachers);
  return teacher;
}

export function updateTeacher(
  id: string,
  input: Partial<Omit<Teacher, "id">>,
): Teacher | null {
  const teachers = loadTeachers();
  const index = teachers.findIndex((t) => t.id === id);
  if (index === -1) return null;
  teachers[index] = { ...teachers[index], ...input };
  writeJsonFile(DATA_FILE, teachers);
  return teachers[index];
}

export function deleteTeacher(id: string): boolean {
  const teachers = loadTeachers();
  const filtered = teachers.filter((t) => t.id !== id);
  if (filtered.length === teachers.length) return false;
  writeJsonFile(DATA_FILE, filtered);
  return true;
}
