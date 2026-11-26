import { NextResponse } from 'next/server';
import {
  formatWhatsappSummary,
  type SumateSubmissionPayload,
  validateSumatePayload
} from '@/lib/slugs';
import { fetchTakenSlugs, getSupabaseWriteContext } from '@/lib/supabase';

export async function POST(request: Request) {
  let body: Partial<SumateSubmissionPayload>;
  try {
    body = (await request.json()) as Partial<SumateSubmissionPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Formato JSON inválido en la solicitud.' },
      { status: 400 }
    );
  }

  const takenSlugs = await fetchTakenSlugs();
  const check = validateSumatePayload(body, takenSlugs);

  if (!check.valid || !check.normalized) {
    return NextResponse.json(
      {
        ok: false,
        error: check.errors[0] ?? 'Revisá los campos obligatorios.',
        errors: check.errors
      },
      { status: 400 }
    );
  }

  const normalized = check.normalized;
  const whatsappSummary = formatWhatsappSummary(normalized);
  const dbEnabled = process.env.NEXT_PUBLIC_SUMATE_DB_ENABLED === 'true';
  const writeCtx = dbEnabled ? getSupabaseWriteContext() : null;

  if (writeCtx) {
    const baseRow = {
      mode: normalized.mode,
      desired_plan: normalized.desiredPlan,
      display_name: normalized.displayName,
      slug: normalized.slug,
      category: normalized.category,
      zone_or_feria: normalized.zoneOrFeria,
      location_type: normalized.locationType ?? null,
      address_or_puesto: normalized.addressOrPuesto,
      hours_summary: normalized.hoursSummary,
      tagline: normalized.tagline,
      whatsapp: normalized.whatsapp,
      instagram: normalized.instagram ?? null,
      has_pdf_catalog: Boolean(normalized.hasPdfCatalog),
      accepted_terms: true,
      payload: normalized,
      status: 'pending_review'
    };

    const rowWithEmail = {
      ...baseRow,
      contact_email: normalized.contactEmail ?? null
    };

    const insertRow = async (row: Record<string, unknown>) => {
      if (writeCtx.isServiceRole) {
        const res = await writeCtx.client
          .from('sumate_submissions')
          .insert(row)
          .select('id')
          .maybeSingle();
        return {
          id: res.data?.id ? String(res.data.id) : null,
          error: res.error
        };
      }
      // Con anon key respetamos RLS (no hay SELECT público sobre sumate_submissions)
      const res = await writeCtx.client.from('sumate_submissions').insert(row);
      return { id: null, error: res.error };
    };

    try {
      let result = await insertRow(rowWithEmail);

      // Compatibilidad hacia atrás si la base aún tiene solo la migración 0001 sin contact_email
      if (result.error && result.error.message?.includes('contact_email')) {
        result = await insertRow(baseRow);
      }

      if (!result.error) {
        return NextResponse.json(
          {
            ok: true,
            mode: 'db',
            submissionId: result.id,
            slug: normalized.slug,
            whatsappSummary
          },
          { status: 201 }
        );
      }
    } catch {
      // Si la tabla todavía no fue migrada en Supabase, continuamos con el handoff ordenado a WhatsApp.
    }
  }

  return NextResponse.json({
    ok: true,
    mode: 'whatsapp_only',
    submissionId: null,
    slug: normalized.slug,
    whatsappSummary
  });
}
