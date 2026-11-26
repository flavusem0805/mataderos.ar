-- ============================================================================
-- MATADEROS.AR — Setup completo de base de datos en Supabase (1 sola ejecución)
-- ============================================================================
-- Pegá y ejecutá este script completo en:
--   Supabase Dashboard -> SQL Editor -> New query -> Run
--
-- Es 100% idempotente (podés volver a ejecutarlo sin errores).
-- Consolida:
--   1) supabase/schema.sql (businesses, articles, events)
--   2) supabase/migrations/0001_emprendedores_y_sumate.sql (emprendedores, sumate_submissions)
--   3) supabase/migrations/0002_produccion_mvp.sql (profiles, reserved_slugs, founder_cohort,
--      audit_events, protección de slugs, RPC get_taken_slugs, RPC approve_emprendedor,
--      RLS completo y buckets de Storage).
--
-- Nota: mientras `businesses`, `events` o `emprendedores` estén vacías, el portal
-- muestra automáticamente los datos curados locales como respaldo sin errores.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 0. Utilidad `updated_at`
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 1. Comercios del barrio (`public.businesses`)
-- ----------------------------------------------------------------------------
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  zone text not null,
  address text not null,
  near_corner text not null default 'Mataderos, Comuna 9',
  description text not null,
  long_description text not null,
  phone text,
  whatsapp text not null,
  contact_email text,
  hours jsonb not null default '[]'::jsonb,
  hours_summary text not null,
  is_open_now boolean not null default true,
  has_subdomain boolean not null default false,
  featured boolean not null default false,
  hero_image text not null,
  tagline text not null default '',
  years_in_neighborhood text not null default 'Comercio de Mataderos',
  payment_methods text not null default 'Consultar medios de pago',
  services jsonb not null default '[]'::jsonb,
  reviews jsonb not null default '[]'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'paused', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.businesses
  add column if not exists near_corner text not null default 'Mataderos, Comuna 9',
  add column if not exists contact_email text,
  add column if not exists years_in_neighborhood text not null default 'Comercio de Mataderos',
  add column if not exists payment_methods text not null default 'Consultar medios de pago',
  add column if not exists status text not null default 'published',
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_businesses_slug on public.businesses (slug);
create index if not exists idx_businesses_category on public.businesses (category);
create index if not exists idx_businesses_zone on public.businesses (zone);

-- ----------------------------------------------------------------------------
-- 2. Notas editoriales (`public.articles`)
-- ----------------------------------------------------------------------------
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
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles
  add column if not exists updated_at timestamptz not null default now();

-- ----------------------------------------------------------------------------
-- 3. Agenda barrial fechada (`public.events`)
-- ----------------------------------------------------------------------------
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_events_starts_at on public.events (starts_at);
create index if not exists idx_events_ambito_barrio on public.events (ambito, barrio);

-- ----------------------------------------------------------------------------
-- 4. Perfiles de usuarios y roles (`public.profiles`)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'vendor' check (role in ('vendor', 'admin')),
  phone text,
  accepted_terms_at timestamptz,
  accepted_terms_version text,
  accepted_privacy_at timestamptz,
  accepted_privacy_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = coalesce(excluded.email, public.profiles.email),
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if current_user not in ('postgres', 'supabase_admin')
       and coalesce(auth.role(), '') <> 'service_role' then
      raise exception 'No está permitido modificar el rol de usuario desde el cliente.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_prevent_role_escalation on public.profiles;
create trigger trg_profiles_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- ----------------------------------------------------------------------------
-- 5. Slugs reservados compartidos (`public.reserved_slugs`)
-- ----------------------------------------------------------------------------
create table if not exists public.reserved_slugs (
  slug text primary key check (slug = lower(slug)),
  reason text not null default 'Reservado por el portal',
  created_at timestamptz not null default now()
);

insert into public.reserved_slugs (slug, reason)
values
  ('www', 'Subdominio reservado'),
  ('mail', 'Infraestructura de correo'),
  ('webmail', 'Infraestructura de correo'),
  ('info', 'Cuenta institucional info@mataderos.ar'),
  ('noreply', 'Correo transaccional'),
  ('no-reply', 'Correo transaccional'),
  ('smtp', 'Infraestructura de correo'),
  ('imap', 'Infraestructura de correo'),
  ('pop', 'Infraestructura de correo'),
  ('ftp', 'Infraestructura'),
  ('cdn', 'Infraestructura'),
  ('assets', 'Infraestructura'),
  ('static', 'Infraestructura'),
  ('media', 'Infraestructura'),
  ('admin', 'Ruta interna del portal'),
  ('panel', 'Ruta interna del portal'),
  ('dashboard', 'Ruta interna del portal'),
  ('api', 'Ruta interna del portal'),
  ('auth', 'Ruta interna del portal'),
  ('login', 'Ruta interna del portal'),
  ('entrar', 'Ruta interna del portal'),
  ('onboarding', 'Ruta interna del portal'),
  ('sumate', 'Ruta interna del portal'),
  ('directorio', 'Ruta interna del portal'),
  ('agenda', 'Ruta interna del portal'),
  ('notas', 'Ruta interna del portal'),
  ('emprendedores', 'Ruta interna del portal'),
  ('emprendedor', 'Ruta interna del portal'),
  ('comercios', 'Ruta interna del portal'),
  ('comercio', 'Ruta interna del portal'),
  ('privacidad', 'Ruta interna del portal'),
  ('terminos', 'Ruta interna del portal'),
  ('ayuda', 'Ruta interna del portal'),
  ('soporte', 'Ruta interna del portal'),
  ('contacto', 'Ruta interna del portal'),
  ('app', 'Subdominio reservado'),
  ('dev', 'Entorno técnico'),
  ('staging', 'Entorno técnico'),
  ('test', 'Entorno técnico'),
  ('localhost', 'Entorno técnico'),
  ('root', 'Reservado'),
  ('mataderos', 'Marca del portal'),
  ('mataderosar', 'Marca del portal'),
  ('feriademataderos', 'Marca comunitaria reservada'),
  ('elplata', 'Referencia barrial reservada'),
  ('cineteatroelplata', 'Referencia barrial reservada'),
  ('tulocal', 'Placeholder de demo'),
  ('tunombre', 'Placeholder de demo'),
  ('tunegocio', 'Placeholder de demo')
on conflict (slug) do nothing;

-- ----------------------------------------------------------------------------
-- 6. Cohorte Fundadores — Primeros 50 verificados (`public.founder_cohort`)
-- ----------------------------------------------------------------------------
create table if not exists public.founder_cohort (
  id smallint primary key default 1 check (id = 1),
  cap integer not null default 50 check (cap > 0),
  granted integer not null default 0 check (granted >= 0),
  closed_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.founder_cohort (id, cap, granted)
values (1, 50, 0)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 7. Emprendedores verificados (`public.emprendedores`)
-- ----------------------------------------------------------------------------
create table if not exists public.emprendedores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users (id) on delete set null,
  slug text not null unique,
  display_name text not null,
  tagline text not null,
  offer_text text not null,
  category text not null,
  location_type text not null default 'feria_puesto'
    check (location_type in ('feria_puesto', 'direccion', 'ambos', 'solo_redes')),
  feria_name text,
  puesto_label text,
  address text,
  zone text not null default 'Mataderos · Comuna 9',
  location_note text not null default '',
  lat double precision,
  lng double precision,
  whatsapp text not null,
  contact_email text,
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
  catalog_pdf_bytes integer,
  is_founder boolean not null default false,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  plan_source text not null default 'none' check (plan_source in ('none', 'founder', 'subscription', 'comp')),
  plan_status text not null default 'none' check (plan_status in ('none', 'active', 'past_due', 'canceled')),
  plan_expires_at timestamptz,
  status text not null default 'pending_review'
    check (status in ('draft', 'pending_review', 'needs_changes', 'verified', 'rejected', 'suspended', 'archived')),
  review_note text,
  rejected_reason text,
  verified_at date,
  verified_by uuid references auth.users (id) on delete set null,
  published_at timestamptz,
  renew_by timestamptz,
  last_renewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.emprendedores
  add column if not exists owner_id uuid references auth.users (id) on delete set null,
  add column if not exists contact_email text,
  add column if not exists lat double precision,
  add column if not exists lng double precision,
  add column if not exists catalog_pdf_bytes integer,
  add column if not exists plan text not null default 'free',
  add column if not exists plan_source text not null default 'none',
  add column if not exists plan_status text not null default 'none',
  add column if not exists plan_expires_at timestamptz,
  add column if not exists review_note text,
  add column if not exists rejected_reason text,
  add column if not exists verified_by uuid references auth.users (id) on delete set null,
  add column if not exists published_at timestamptz,
  add column if not exists renew_by timestamptz,
  add column if not exists last_renewed_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_emprendedores_slug on public.emprendedores (slug);
create index if not exists idx_emprendedores_status on public.emprendedores (status, is_founder);
create index if not exists idx_emprendedores_category on public.emprendedores (category);
create index if not exists idx_emprendedores_plan on public.emprendedores (plan, plan_expires_at);
create index if not exists idx_emprendedores_renew_by on public.emprendedores (renew_by);
create unique index if not exists idx_emprendedores_owner_unique
  on public.emprendedores (owner_id)
  where owner_id is not null;

-- ----------------------------------------------------------------------------
-- 8. Solicitudes entrantes desde /sumate (`public.sumate_submissions`)
-- ----------------------------------------------------------------------------
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
  contact_email text,
  instagram text,
  has_pdf_catalog boolean not null default false,
  accepted_terms boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sumate_submissions
  add column if not exists contact_email text,
  add column if not exists review_note text,
  add column if not exists reviewed_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_sumate_submissions_slug on public.sumate_submissions (slug);
create index if not exists idx_sumate_submissions_status on public.sumate_submissions (status, created_at desc);

-- ----------------------------------------------------------------------------
-- 9. Auditoría administrativa (`public.audit_events`)
-- ----------------------------------------------------------------------------
create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('emprendedor', 'business', 'submission')),
  entity_id uuid not null,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  note text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_events_entity
  on public.audit_events (entity_type, entity_id, created_at desc);

-- ----------------------------------------------------------------------------
-- 10. Integridad de slugs compartidos y triggers `updated_at`
-- ----------------------------------------------------------------------------
create or replace function public.prevent_slug_collision()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  normalized text;
  compact text;
begin
  normalized := lower(trim(new.slug));
  new.slug := normalized;

  if normalized = '' or normalized !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then
    raise exception 'Slug inválido: % (usar solo minúsculas, números y guiones)', normalized;
  end if;

  if tg_op = 'UPDATE' and normalized = old.slug then
    return new;
  end if;

  compact := regexp_replace(normalized, '[^a-z0-9]', '', 'g');

  if exists (
    select 1 from public.reserved_slugs r
    where r.slug = normalized
       or regexp_replace(r.slug, '[^a-z0-9]', '', 'g') = compact
  ) then
    raise exception 'El slug "%" está reservado por Mataderos.ar.', normalized;
  end if;

  if tg_table_name = 'businesses' then
    if exists (
      select 1 from public.emprendedores e
      where e.status <> 'rejected'
        and (e.slug = normalized or regexp_replace(e.slug, '[^a-z0-9]', '', 'g') = compact)
    ) then
      raise exception 'El slug "%" ya pertenece a un emprendedor registrado.', normalized;
    end if;
  elsif tg_table_name = 'emprendedores' then
    if exists (
      select 1 from public.businesses b
      where b.slug = normalized or regexp_replace(b.slug, '[^a-z0-9]', '', 'g') = compact
    ) then
      raise exception 'El slug "%" ya pertenece a un comercio registrado.', normalized;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_businesses_slug_collision on public.businesses;
create trigger trg_businesses_slug_collision
  before insert or update of slug on public.businesses
  for each row execute function public.prevent_slug_collision();

drop trigger if exists trg_emprendedores_slug_collision on public.emprendedores;
create trigger trg_emprendedores_slug_collision
  before insert or update of slug on public.emprendedores
  for each row execute function public.prevent_slug_collision();

drop trigger if exists trg_businesses_updated_at on public.businesses;
create trigger trg_businesses_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_founder_cohort_updated_at on public.founder_cohort;
create trigger trg_founder_cohort_updated_at
  before update on public.founder_cohort
  for each row execute function public.set_updated_at();

drop trigger if exists trg_emprendedores_updated_at on public.emprendedores;
create trigger trg_emprendedores_updated_at
  before update on public.emprendedores
  for each row execute function public.set_updated_at();

drop trigger if exists trg_sumate_submissions_updated_at on public.sumate_submissions;
create trigger trg_sumate_submissions_updated_at
  before update on public.sumate_submissions
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 11. Funciones RPC (`get_taken_slugs` y `approve_emprendedor`)
-- ----------------------------------------------------------------------------
create or replace function public.get_taken_slugs()
returns table (slug text)
language sql
security definer
set search_path = public
as $$
  select lower(slug) as slug from public.reserved_slugs
  union
  select lower(slug) as slug from public.businesses where status <> 'archived'
  union
  select lower(slug) as slug from public.emprendedores where status <> 'rejected'
  union
  select lower(slug) as slug from public.sumate_submissions where status <> 'rejected';
$$;

revoke all on function public.get_taken_slugs() from public;
grant execute on function public.get_taken_slugs() to anon, authenticated, service_role;

create or replace function public.approve_emprendedor(
  target_id uuid,
  grant_founder boolean default true,
  admin_note text default null
)
returns public.emprendedores
language plpgsql
security definer
set search_path = public
as $$
declare
  cohort public.founder_cohort;
  emp public.emprendedores;
  will_grant_founder boolean := false;
begin
  if current_user not in ('postgres', 'supabase_admin')
     and coalesce(auth.role(), '') <> 'service_role'
     and not public.is_admin() then
    raise exception 'Acceso denegado: solo administradores pueden aprobar perfiles.';
  end if;

  select * into emp from public.emprendedores where id = target_id for update;
  if not found then
    raise exception 'Emprendedor no encontrado: %', target_id;
  end if;

  select * into cohort from public.founder_cohort where id = 1 for update;
  if found and grant_founder and not emp.is_founder and cohort.granted < cohort.cap then
    will_grant_founder := true;
  end if;

  update public.emprendedores
  set
    status = 'verified',
    verified_at = current_date,
    verified_by = coalesce(auth.uid(), verified_by),
    published_at = coalesce(published_at, now()),
    renew_by = now() + interval '6 months',
    review_note = coalesce(admin_note, review_note),
    is_founder = case when will_grant_founder then true else is_founder end,
    plan = case when will_grant_founder then 'pro' else plan end,
    plan_source = case when will_grant_founder then 'founder' else plan_source end,
    plan_status = case when will_grant_founder then 'active' else plan_status end,
    plan_expires_at = case
      when will_grant_founder then now() + interval '12 months'
      else plan_expires_at
    end
  where id = target_id
  returning * into emp;

  if will_grant_founder then
    update public.founder_cohort
    set
      granted = granted + 1,
      closed_at = case when granted + 1 >= cap then coalesce(closed_at, now()) else closed_at end
    where id = 1;
  end if;

  insert into public.audit_events (entity_type, entity_id, actor_id, action, note, payload)
  values (
    'emprendedor',
    target_id,
    auth.uid(),
    case when will_grant_founder then 'approved_founder' else 'approved' end,
    admin_note,
    jsonb_build_object('slug', emp.slug, 'is_founder', emp.is_founder, 'plan', emp.plan)
  );

  return emp;
end;
$$;

revoke all on function public.approve_emprendedor(uuid, boolean, text) from public;
grant execute on function public.approve_emprendedor(uuid, boolean, text) to authenticated, service_role;

-- ----------------------------------------------------------------------------
-- 12. Row Level Security (RLS)
-- ----------------------------------------------------------------------------
alter table public.businesses enable row level security;
alter table public.articles enable row level security;
alter table public.events enable row level security;
alter table public.profiles enable row level security;
alter table public.reserved_slugs enable row level security;
alter table public.founder_cohort enable row level security;
alter table public.emprendedores enable row level security;
alter table public.sumate_submissions enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "Lectura pública de comercios" on public.businesses;
create policy "Lectura pública de comercios"
  on public.businesses for select
  using (status = 'published');

drop policy if exists "Gestión admin de comercios" on public.businesses;
create policy "Gestión admin de comercios"
  on public.businesses for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura pública de noticias" on public.articles;
create policy "Lectura pública de noticias"
  on public.articles for select
  using (true);

drop policy if exists "Gestión admin de noticias" on public.articles;
create policy "Gestión admin de noticias"
  on public.articles for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura pública de eventos" on public.events;
create policy "Lectura pública de eventos"
  on public.events for select
  using (true);

drop policy if exists "Gestión admin de eventos" on public.events;
create policy "Gestión admin de eventos"
  on public.events for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura propia de perfil" on public.profiles;
create policy "Lectura propia de perfil"
  on public.profiles for select to authenticated
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Edición propia de perfil" on public.profiles;
create policy "Edición propia de perfil"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Lectura pública de slugs reservados" on public.reserved_slugs;
create policy "Lectura pública de slugs reservados"
  on public.reserved_slugs for select
  using (true);

drop policy if exists "Gestión admin de slugs reservados" on public.reserved_slugs;
create policy "Gestión admin de slugs reservados"
  on public.reserved_slugs for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura pública de cupo Fundadores" on public.founder_cohort;
create policy "Lectura pública de cupo Fundadores"
  on public.founder_cohort for select
  using (true);

drop policy if exists "Gestión admin de cupo Fundadores" on public.founder_cohort;
create policy "Gestión admin de cupo Fundadores"
  on public.founder_cohort for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura pública de emprendedores verificados" on public.emprendedores;
create policy "Lectura pública de emprendedores verificados"
  on public.emprendedores for select
  using (status = 'verified' and (renew_by is null or renew_by >= now()));

drop policy if exists "Lectura propia de emprendedor" on public.emprendedores;
create policy "Lectura propia de emprendedor"
  on public.emprendedores for select to authenticated
  using (auth.uid() = owner_id);

drop policy if exists "Gestión admin de emprendedores" on public.emprendedores;
create policy "Gestión admin de emprendedores"
  on public.emprendedores for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Envío público controlado de solicitudes /sumate" on public.sumate_submissions;
create policy "Envío público controlado de solicitudes /sumate"
  on public.sumate_submissions for insert
  with check (status = 'pending_review' and accepted_terms = true);

drop policy if exists "Gestión admin de solicitudes /sumate" on public.sumate_submissions;
create policy "Gestión admin de solicitudes /sumate"
  on public.sumate_submissions for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Lectura admin de auditoría" on public.audit_events;
create policy "Lectura admin de auditoría"
  on public.audit_events for select to authenticated
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- 13. Storage buckets y policies (imágenes 5 MB + catálogos PDF 10 MB)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'emprendedor-media',
    'emprendedor-media',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'emprendedor-catalogs',
    'emprendedor-catalogs',
    false,
    10485760,
    array['application/pdf']
  )
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Lectura pública de emprendedor-media" on storage.objects;
create policy "Lectura pública de emprendedor-media"
  on storage.objects for select
  using (bucket_id = 'emprendedor-media');

drop policy if exists "Escritura propia en emprendedor-media" on storage.objects;
create policy "Escritura propia en emprendedor-media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'emprendedor-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Borrado propio en emprendedor-media" on storage.objects;
create policy "Borrado propio en emprendedor-media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'emprendedor-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Lectura propia en emprendedor-catalogs" on storage.objects;
create policy "Lectura propia en emprendedor-catalogs"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'emprendedor-catalogs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Escritura propia en emprendedor-catalogs" on storage.objects;
create policy "Escritura propia en emprendedor-catalogs"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'emprendedor-catalogs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Borrado propio en emprendedor-catalogs" on storage.objects;
create policy "Borrado propio en emprendedor-catalogs"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'emprendedor-catalogs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Gestión admin de storage emprendedores" on storage.objects;
create policy "Gestión admin de storage emprendedores"
  on storage.objects for all to authenticated
  using (
    bucket_id in ('emprendedor-media', 'emprendedor-catalogs')
    and public.is_admin()
  )
  with check (
    bucket_id in ('emprendedor-media', 'emprendedor-catalogs')
    and public.is_admin()
  );
