// lib/db/officers.ts
import { supabaseAdmin } from "@/lib/supabase";
import type { Officer, Tenure, SocialMedia } from "../officers/types";

export type OfficerFetchResult =
  | { ok: true; officers: Officer[] }
  | { ok: false; error: string };

export async function fetchOfficersFromDb(
  orgId: string
): Promise<OfficerFetchResult> {
  try {
    const { data: rows, error } = await supabaseAdmin
      .from("tenures")
      .select(
        `
        org_id,
        position,
        department,
        start_year,
        end_year,
        result,
        officers!inner (
          student_number,
          first_name,
          last_name,
          nickname,
          birthday,
          img_url,
          status,
          officer_socials (
            facebook,
            instagram
          )
        )
      `
      )
      .eq("org_id", orgId);

    if (error) {
      console.error("[fetchOfficersFromDb] Supabase query error:", error.message);
      return { ok: false, error: error.message };
    }

    if (!rows || rows.length === 0) {
      return { ok: true, officers: [] };
    }

    const officerMap = new Map<string, Officer>();

    for (const row of rows as any[]) {
      const o = row.officers;
      if (!o) continue;

      const sn: string = o.student_number;

      const tenure: Tenure = {
        startYear: row.start_year,
        endYear: row.end_year === null ? "present" : Number(row.end_year),
        position: row.position,
        department: row.department ?? undefined,
        result: row.result,
      };

      if (officerMap.has(sn)) {
        officerMap.get(sn)!.tenures.push(tenure);
      } else {
        const socials = Array.isArray(o.officer_socials)
          ? o.officer_socials[0]
          : o.officer_socials;

        const socialMedia: SocialMedia | undefined =
          socials?.facebook || socials?.instagram
            ? {
                facebook: socials.facebook ?? undefined,
                instagram: socials.instagram ?? undefined,
              }
            : undefined;

        officerMap.set(sn, {
          studentNumber: sn,
          lastName: o.last_name,
          firstName: o.first_name,
          nickname: o.nickname ?? undefined,
          birthday: o.birthday ?? undefined,
          img: o.img_url ?? undefined,
          status: o.status,
          tenures: [tenure],
          orgsAffiliated: [],
          socialMedia,
        });
      }
    }

    return { ok: true, officers: Array.from(officerMap.values()) };
  } catch (err: any) {
    console.error("[fetchOfficersFromDb] Unexpected error:", err);
    return { ok: false, error: String(err?.message ?? "Unknown error") };
  }
}