import { registerSingleton, setProvider, getProvider } from "./repository";

export function initializeDatabaseProvider() {
  // Auto-detect Vercel — use Supabase in production/preview
  const onVercel = !!process.env.VERCEL_ENV;
  const env = process.env.DATABASE_PROVIDER ?? (onVercel ? "supabase" : "json");
  setProvider(env === "supabase" ? "supabase" : "json");
}

export function isSupabaseMode(): boolean {
  return getProvider() === "supabase";
}
