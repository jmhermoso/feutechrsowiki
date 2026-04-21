// app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page_url, org_id, opinion, message } = body;

    if (!page_url || !opinion) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('feedback').insert({
      page_url,
      org_id: org_id ?? null,
      opinion,
      message: message ?? null,
    });

    if (error) {
      console.error('[feedback] Supabase error:', error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message ?? 'Unknown error') }, { status: 500 });
  }
}