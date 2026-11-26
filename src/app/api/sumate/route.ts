import { NextResponse } from 'next/server';
import { whatsappUrl } from '@/lib/contact';
import {
  formatLeadWhatsappSummary,
  formatWhatsappSummary,
  normalizeComercioSlug,
  type SumateLeadPayload,
  type SumateSubmissionPayload,
  validateSumateLead,
  validateSumatePayload
} from '@/lib/slugs';
import { fetchTakenSlugs, getSupabaseWriteContext, type SupabaseWriteContext } from '@/lib/supabase';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const ipHits = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  return realIp || 'unknown';
}

function isRateLimited(ip: string, now = Date.now()): boolean {
  const existing = ipHits.get(ip) ?? [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);

  if (ipHits.size > 500) {
    const oldestKey = ipHits.keys().next().value;
    if (oldestKey) ipHits.delete(oldestKey);
  }
  return false;
}

async function insertSubmissionRow(
  writeCtx: SupabaseWriteContext,
  baseRow: Record<string, unknown>,
  contactEmail?: string | null
): Promise<{ id: string | null; error: { message?: string } | null }> {
  const runInsert = async (row: Record<string, unknown>) => {
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

  const rowWithEmail = { ...baseRow, contact_email: contactEmail ?? null };
  let result = await runInsert(rowWithEmail);

  // Compatibilidad hacia atrás si la base aún tiene solo la migración 0001 sin contact_email
  if (result.error && result.error.message?.includes('contact_email')) {
    result = await runInsert(baseRow);
  }

  return result;
}

type IncomingSumateBody =
  | ({ kind: 'lead' } & Partial<SumateLeadPayload>)
  | ({ kind?: 'builder'; website?: string } & Partial<SumateSubmissionPayload>);

export async function POST(request: Request) {
  let body: IncomingSumateBody;
  try {
    body = (await request.json()) as IncomingSumateBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Formato JSON inválido en la solicitud.' },
      { status: 400 }
    );
  }

  // Honeypot anti-spam: si un bot completa `website`, devolvemos 200 silencioso sin persistir.
  if (typeof body?.website === 'string' && body.website.trim().length > 0) {
    const fallbackSummary = 'Hola, quiero sumar mi comercio a Mataderos.ar.';
    return NextResponse.json({
      ok: true,
      mode: 'whatsapp_only',
      submissionId: null,
      whatsappSummary: fallbackSummary,
      whatsappHref: whatsappUrl(fallbackSummary)
    });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    const fallbackSummary = 'Hola, quiero sumar mi comercio a Mataderos.ar.';
    return NextResponse.json(
      {
        ok: false,
        error: 'Recibimos varias consultas seguidas desde tu conexión. Escribinos directo por WhatsApp.',
        whatsappHref: whatsappUrl(fallbackSummary)
      },
      { status: 429 }
    );
  }

  const isLeadPayload =
    body?.kind === 'lead' || ('businessName' in body && !('hoursSummary' in body));

  if (isLeadPayload) {
    const check = validateSumateLead(body as Partial<SumateLeadPayload>);
    if (!check.valid || !check.normalized) {
      return NextResponse.json(
        {
          ok: false,
          error: check.errors[0] ?? 'Revisá los campos obligatorios.',
          errors: check.errors,
          fieldErrors: check.fieldErrors
        },
        { status: 400 }
      );
    }

    const normalized = check.normalized;
    const whatsappSummary = formatLeadWhatsappSummary(normalized);
    const whatsappHref = whatsappUrl(whatsappSummary);
    const dbEnabled = (process.env.SUMATE_DB_ENABLED ?? process.env.NEXT_PUBLIC_SUMATE_DB_ENABLED) === 'true';
    const writeCtx = dbEnabled ? getSupabaseWriteContext() : null;
    const inferredMode =
      normalized.planInteres === 'feria' || /feria/i.test(normalized.addressOrFeria)
        ? 'emprendedor'
        : 'comercio';
    const leadSlug = normalizeComercioSlug(normalized.businessName) || 'consulta';

    if (writeCtx) {
      const baseRow = {
        mode: inferredMode,
        desired_plan: normalized.planInteres ?? 'consultar',
        display_name: normalized.businessName,
        slug: leadSlug,
        category: normalized.category,
        zone_or_feria: normalized.addressOrFeria,
        location_type: inferredMode === 'emprendedor' ? 'feria_puesto' : null,
        address_or_puesto: normalized.addressOrFeria,
        hours_summary: 'A coordinar en charla de 15 min',
        tagline: normalized.goal ?? 'Consulta comercial desde /sumate',
        whatsapp: normalized.whatsapp,
        instagram: null,
        has_pdf_catalog: false,
        accepted_terms: true,
        payload: { kind: 'lead', ...normalized },
        status: 'pending_review'
      };

      try {
        const result = await insertSubmissionRow(writeCtx, baseRow, null);
        if (!result.error) {
          return NextResponse.json(
            {
              ok: true,
              mode: 'db',
              submissionId: result.id,
              whatsappSummary,
              whatsappHref
            },
            { status: 201 }
          );
        }
      } catch {
        // Si la tabla todavía no está migrada en Supabase, mantenemos el flujo por WhatsApp.
      }
    }

    return NextResponse.json({
      ok: true,
      mode: 'whatsapp_only',
      submissionId: null,
      whatsappSummary,
      whatsappHref
    });
  }

  const takenSlugs = await fetchTakenSlugs();
  const check = validateSumatePayload(body as Partial<SumateSubmissionPayload>, takenSlugs);

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
  const whatsappHref = whatsappUrl(whatsappSummary);
  const dbEnabled = (process.env.SUMATE_DB_ENABLED ?? process.env.NEXT_PUBLIC_SUMATE_DB_ENABLED) === 'true';
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
      payload: { kind: 'builder', ...normalized },
      status: 'pending_review'
    };

    try {
      const result = await insertSubmissionRow(writeCtx, baseRow, normalized.contactEmail ?? null);
      if (!result.error) {
        return NextResponse.json(
          {
            ok: true,
            mode: 'db',
            submissionId: result.id,
            slug: normalized.slug,
            whatsappSummary,
            whatsappHref
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
    whatsappSummary,
    whatsappHref
  });
}
