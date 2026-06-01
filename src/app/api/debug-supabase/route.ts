import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function GET() {
  const results: Record<string, unknown> = {
    config: {
      hasUrl: !!SUPABASE_URL,
      hasAnonKey: !!ANON_KEY,
      hasServiceKey: !!SERVICE_KEY,
      url: SUPABASE_URL ? SUPABASE_URL.substring(0, 40) + "..." : "NOT SET",
    },
  };

  // Test 1: Read from json_store (anon key)
  try {
    const readRes = await fetch(
      `${SUPABASE_URL}/rest/v1/json_store?filename=eq.test-debug.json&select=content&limit=1`,
      {
        headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
        cache: "no-store",
      }
    );
    results.read = {
      status: readRes.status,
      ok: readRes.ok,
      body: await readRes.text(),
    };
  } catch (e: any) {
    results.read = { error: e.message };
  }

  // Test 2: Write with ANON key
  try {
    const writeAnonRes = await fetch(`${SUPABASE_URL}/rest/v1/json_store`, {
      method: "POST",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        filename: "test-debug.json",
        content: JSON.stringify({ test: true, time: new Date().toISOString() }),
        updated_at: new Date().toISOString(),
      }),
    });
    results.writeAnon = {
      status: writeAnonRes.status,
      ok: writeAnonRes.ok,
      body: await writeAnonRes.text(),
    };
  } catch (e: any) {
    results.writeAnon = { error: e.message };
  }

  // Test 3: Write with SERVICE ROLE key (if available)
  if (SERVICE_KEY) {
    try {
      const writeSvcRes = await fetch(`${SUPABASE_URL}/rest/v1/json_store`, {
        method: "POST",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          filename: "test-debug.json",
          content: JSON.stringify({ test: true, withServiceKey: true, time: new Date().toISOString() }),
          updated_at: new Date().toISOString(),
        }),
      });
      results.writeServiceKey = {
        status: writeSvcRes.status,
        ok: writeSvcRes.ok,
        body: await writeSvcRes.text(),
      };
    } catch (e: any) {
      results.writeServiceKey = { error: e.message };
    }
  } else {
    results.writeServiceKey = "SKIPPED — SUPABASE_SERVICE_ROLE_KEY not set";
  }

  return NextResponse.json(results, { status: 200 });
}
