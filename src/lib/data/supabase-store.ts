/**
 * Async Supabase json_store helper.
 *
 * - storeGet: reads via anon key (public read RLS)
 * - storeSet: writes via SERVICE ROLE key (bypasses RLS — server-only)
 *
 * The `json_store` table schema:
 *   filename   text PRIMARY KEY
 *   content    text NOT NULL          -- JSON-serialised payload
 *   updated_at timestamptz
 */

import { isSupabaseConfigured } from "@/lib/supabase/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
// Service role key bypasses RLS — only used server-side in Server Actions
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Read a JSON payload from the json_store table.
 * Uses anon key (public read is allowed by RLS).
 */
export async function storeGet<T>(filename: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;

  try {
    const url = `${SUPABASE_URL}/rest/v1/json_store?filename=eq.${encodeURIComponent(filename)}&select=content&limit=1`;
    const res = await fetch(url, {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[storeGet] HTTP ${res.status} for ${filename}:`, text);
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
 *
 * Uses SERVICE ROLE key to bypass RLS.
 * This function MUST only be called from server-side code (Server Actions).
 */
export async function storeSet<T>(filename: string, data: T): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const url = `${SUPABASE_URL}/rest/v1/json_store`;
    const body = {
      filename,
      content: JSON.stringify(data),
      updated_at: new Date().toISOString(),
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[storeSet] HTTP ${res.status} for ${filename}:`, text);
      return false;
    }

    console.log(`[storeSet] Saved ${filename} to Supabase`);
    return true;
  } catch (err) {
    console.error(`[storeSet] Error writing ${filename}:`, err);
    return false;
  }
}
