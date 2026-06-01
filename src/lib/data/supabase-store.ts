/**
 * Async Supabase json_store helper.
 *
 * - storeGet: reads via anon key (public read RLS)
 * - storeSet: writes via anon key (json_store has open write policy)
 *
 * The `json_store` table schema:
 *   filename   text PRIMARY KEY
 *   content    text NOT NULL
 *   updated_at timestamptz
 */

import { isSupabaseConfigured } from "@/lib/supabase/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function headers() {
  return {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  };
}

/**
 * Read a JSON payload from the json_store table.
 */
export async function storeGet<T>(filename: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;

  try {
    const url = `${SUPABASE_URL}/rest/v1/json_store?filename=eq.${encodeURIComponent(filename)}&select=content&limit=1`;
    const res = await fetch(url, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[storeGet] HTTP ${res.status} for ${filename}:`, await res.text());
      return fallback;
    }

    const rows = (await res.json()) as Array<{ content: string }>;
    if (rows.length > 0 && rows[0].content) {
      return JSON.parse(rows[0].content) as T;
    }
  } catch (err) {
    console.error(`[storeGet] Error reading ${filename}:`, err);
  }

  return fallback;
}

/**
 * Write/upsert a JSON payload to the json_store table.
 * Uses anon key — json_store has open write policy for server-side access.
 * Returns true on success.
 */
export async function storeSet<T>(filename: string, data: T): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/json_store`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        filename,
        content: JSON.stringify(data),
        updated_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error(`[storeSet] HTTP ${res.status} for ${filename}:`, await res.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[storeSet] Error writing ${filename}:`, err);
    return false;
  }
}
