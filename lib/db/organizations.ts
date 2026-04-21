// lib/db/organizations.ts
import { supabaseAdmin } from "../supabase";
import type { Organization } from "../organizations";

export type OrgFetchResult =
  | { ok: true; organizations: Organization[] }
  | { ok: false; error: string };

export async function fetchOrganizationsFromDb(): Promise<OrgFetchResult> {
  try {
    const { data, error } = await supabaseAdmin
      .from("organizations")
      .select("id, name, abbreviation, description, color, theme_background, theme_accent, theme_text")
      .order("id");

    if (error) {
      console.error("[fetchOrganizationsFromDb] Supabase error:", error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true, organizations: data as Organization[] };
  } catch (err: any) {
    console.error("[fetchOrganizationsFromDb] Unexpected error:", err);
    return { ok: false, error: String(err?.message ?? "Unknown error") };
  }
}

export async function fetchOrgByIdFromDb(id: string): Promise<Organization | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("organizations")
      .select("id, name, abbreviation, description, color, theme_background, theme_accent, theme_text")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as Organization;
  } catch {
    return null;
  }
}