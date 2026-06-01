/**
 * Async Supabase json_store helper.
 *
 * All services that run in Vercel (serverless) MUST use these helpers
 * instead of the synchronous SupabaseRepository (which relied on curl).
 *
 * The `json_store` table schema:
 *   filename  text PRIMARY KEY
 *   content   text NOT NULL          -- JSON-serialised payload
 *   updated_at timestamptz
 */

import { isSupabaseConfigured } from "@/lib/supabase/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function supabaseHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  };
}

/**
 * Read a JSON payload from the json_store table.
 * Falls back to `fallback` when not configured or row not found.
 */
export async function storeGet<T>(filename: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;

  try {
    const url = `${SUPABASE_URL}/rest/v1/json_store?filename=eq.${encodeURIComponent(filename)}&select=content&limit=1`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[storeGet] HTTP ${res.status} for ${filename}`);
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
 * Returns true on success.
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
      headers: supabaseHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[storeSet] HTTP ${res.status} for ${filename}:`, text);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[storeSet] Error writing ${filename}:`, err);
    return false;
  }
}
