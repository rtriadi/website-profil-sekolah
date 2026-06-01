import { registerSingleton, setProvider, getProvider } from "./repository";

export function initializeDatabaseProvider() {
  const env = process.env.DATABASE_PROVIDER ?? "json";
  setProvider(env === "supabase" ? "supabase" : "json");
}

export function isSupabaseMode(): boolean {
  return getProvider() === "supabase";
}
