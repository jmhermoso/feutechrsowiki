// app/api/organizations/route.ts
import { NextResponse } from "next/server";
import { fetchOrganizationsFromDb } from "../../../lib/db/organizations";

export const revalidate = 604800; // 7-day ISR

export async function GET() {
  const result = await fetchOrganizationsFromDb();

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, organizations: result.organizations });
}