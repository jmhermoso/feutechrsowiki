// app/api/officers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchOfficersFromDb } from "@/lib/db/officers";

export const revalidate = 604800; // 7 days ISR cache

export async function GET(req: NextRequest) {
  const orgId = req.nextUrl.searchParams.get("org");

  if (!orgId) {
    return NextResponse.json(
      { ok: false, error: "Missing ?org= parameter" },
      { status: 400 }
    );
  }

  const result = await fetchOfficersFromDb(orgId);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, officers: result.officers });
}