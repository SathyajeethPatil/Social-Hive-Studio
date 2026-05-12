create extension if not exists "uuid-ossp";

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  thumbnail_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.images (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category_id uuid not null references public.categories(id) on delete restrict,
  image_url text not null,
  show_on_home boolean not null default false,
  show_on_hall_of_fame boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists images_category_id_idx on public.images(category_id);
create index if not exists images_show_on_home_idx on public.images(show_on_home);
create index if not exists images_show_on_hall_of_fame_idx on public.images(show_on_hall_of_fame);

alter table public.categories enable row level security;
alter table public.images enable row level security;

create policy "Public can read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "Public can read images"
on public.images for select
to anon, authenticated
using (true);

-- Writes are handled by server routes using SUPABASE_SERVICE_ROLE_KEY.

insert into storage.buckets (id, name, public)
values ('studio-images', 'studio-images', true)
on conflict (id) do update set public = true;

create policy "Public can read studio images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'studio-images');
