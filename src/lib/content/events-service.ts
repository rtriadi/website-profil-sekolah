import { type SchoolEvent, defaultEvents } from "./schema";
import { getRepository } from "@/lib/data/repository";

const repo = getRepository<SchoolEvent>("events");

function loadEvents(): SchoolEvent[] {
  const data = repo.getAll();
  if (data.length === 0) {
    repo.save(defaultEvents as SchoolEvent[]);
    return defaultEvents as SchoolEvent[];
  }
  return data;
}

export async function getEvents(): Promise<SchoolEvent[]> {
  const events = loadEvents();
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEventsByCategory(category: string): Promise<SchoolEvent[]> {
  const events = await getEvents();
  return events.filter((e) => e.category === category);
}

export async function getEventBySlug(slug: string): Promise<SchoolEvent | null> {
  const events = loadEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getEventById(id: string): Promise<SchoolEvent | null> {
  const events = loadEvents();
  return events.find((e) => e.id === id) ?? null;
}

export async function createEvent(input: Omit<SchoolEvent, "id" | "slug"> & { slug?: string }): Promise<SchoolEvent> {
  const events = loadEvents();
  const slug = input.slug?.trim() || input.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
  const id = `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const event: SchoolEvent = { ...input, id, slug };
  events.push(event);
  repo.save(events);
  return event;
}

export async function updateEvent(id: string, input: Partial<Omit<SchoolEvent, "id">>): Promise<SchoolEvent | null> {
  const events = loadEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...input };
  repo.save(events);
  return events[index];
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = loadEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  repo.save(filtered);
  return true;
}
