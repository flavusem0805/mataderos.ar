-- Esquema listo para ejecutar en el SQL Editor de Supabase
-- Portal Mataderos.ar + Landings Multi-Tenant por Subdominio

create extension if not exists "pgcrypto";

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  zone text not null,
  address text not null,
  description text not null,
  long_description text not null,
  phone text,
  whatsapp text not null,
  hours jsonb not null default '[]'::jsonb,
  hours_summary text not null,
  is_open_now boolean not null default true,
  has_subdomain boolean not null default false,
  featured boolean not null default false,
  hero_image text not null,
  tagline text not null default '',
  services jsonb not null default '[]'::jsonb,
  reviews jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  category text not null,
  zone text not null,
  read_time text not null,
  image_url text not null,
  published_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  venue_id text,
  venue_name text,
  title text not null,
  date_label text not null,
  time_label text,
  location text not null,
  place text,
  maps_query text,
  barrio text not null default 'Mataderos',
  ambito text not null default 'Mataderos',
  category text not null,
  description text not null,
  highlight_tag text not null default 'Gratis',
  starts_at timestamptz,
  ends_at timestamptz,
  is_multiday boolean not null default false,
  date_badge text,
  price_label text,
  is_free boolean not null default true,
  source_label text,
  source_url text,
  source_note text,
  related_nota_slug text,
  photo_id text,
  created_at timestamptz not null default now()
);

-- Índices útiles para búsquedas por subdominio, filtros barriales y agenda fechada
create index if not exists idx_businesses_slug on public.businesses (slug);
create index if not exists idx_businesses_category on public.businesses (category);
create index if not exists idx_businesses_zone on public.businesses (zone);
create index if not exists idx_events_starts_at on public.events (starts_at);
create index if not exists idx_events_ambito_barrio on public.events (ambito, barrio);

-- Habilitar Row Level Security con lectura pública
alter table public.businesses enable row level security;
alter table public.articles enable row level security;
alter table public.events enable row level security;

create policy "Lectura pública de comercios"
  on public.businesses for select using (true);

create policy "Lectura pública de noticias"
  on public.articles for select using (true);

create policy "Lectura pública de eventos"
  on public.events for select using (true);
