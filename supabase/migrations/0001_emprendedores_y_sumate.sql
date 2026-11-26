-- Migración para habilitar emprendedores verificados y pre-cargas desde /sumate
-- Complementa supabase/schema.sql (public.businesses, public.articles, public.events)

create table if not exists public.emprendedores (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  tagline text not null,
  offer_text text not null,
  category text not null,
  location_type text not null default 'feria_puesto',
  feria_name text,
  puesto_label text,
  address text,
  zone text not null default 'Mataderos · Comuna 9',
  location_note text not null default '',
  whatsapp text not null,
  instagram text,
  facebook text,
  tiktok text,
  other_url text,
  hero_image text not null default '/notas/frente-recova.jpg',
  hero_alt text not null default 'Emprendimiento de Mataderos',
  photos jsonb not null default '[]'::jsonb,
  catalog_pdf_name text,
  catalog_pdf_size_label text,
  catalog_pdf_url text,
  is_founder boolean not null default false,
  status text not null default 'pending_review' check (status in ('pending_review', 'verified', 'rejected', 'archived')),
  verified_at date,
  created_at timestamptz not null default now()
);

create index if not exists idx_emprendedores_slug on public.emprendedores (slug);
create index if not exists idx_emprendedores_status on public.emprendedores (status, is_founder);

alter table public.emprendedores enable row level security;

create policy "Lectura pública de emprendedores verificados"
  on public.emprendedores for select
  using (status = 'verified');

create table if not exists public.sumate_submissions (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('comercio', 'emprendedor')),
  desired_plan text not null,
  display_name text not null,
  slug text not null,
  category text not null,
  zone_or_feria text not null,
  location_type text,
  address_or_puesto text not null,
  hours_summary text not null,
  tagline text not null,
  whatsapp text not null,
  instagram text,
  has_pdf_catalog boolean not null default false,
  accepted_terms boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists idx_sumate_submissions_slug on public.sumate_submissions (slug);
create index if not exists idx_sumate_submissions_status on public.sumate_submissions (status, created_at desc);

alter table public.sumate_submissions enable row level security;

create policy "Envío público controlado de solicitudes /sumate"
  on public.sumate_submissions for insert
  with check (status = 'pending_review' and accepted_terms = true);
