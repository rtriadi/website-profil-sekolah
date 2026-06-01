import { type AcademicCalendar, defaultAcademicCalendar } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<AcademicCalendar>("academic-calendar");

export function getAcademicCalendar(): AcademicCalendar {
  const data = repo.getAll();
  return data[0] ?? defaultAcademicCalendar;
}

export function saveAcademicCalendar(input: AcademicCalendar): void {
  repo.save([input]);
}
