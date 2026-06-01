import { type AcademicCalendar, defaultAcademicCalendar } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "academic-calendar.json";

export function getAcademicCalendar(): AcademicCalendar {
  const data = readJsonFile<AcademicCalendar | null>(DATA_FILE, null);
  return data ?? defaultAcademicCalendar;
}

export function saveAcademicCalendar(input: AcademicCalendar): void {
  writeJsonFile(DATA_FILE, input);
}
