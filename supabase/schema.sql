-- AutoVision AI V4: ejecuta este archivo en Supabase > SQL Editor.
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  year integer not null check (year between 1900 and 2100),
  price numeric(12,2) not null check (price >= 0),
  currency text not null default 'USD',
  mileage integer not null default 0 check (mileage >= 0),
  transmission text,
  fuel_type text,
  status text not null default 'available' check (status in ('available', 'reserved', 'sold')),
  description text,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

-- La ficha pública puede leer solo vehículos disponibles o reservados.
create policy "public can view listed vehicles"
on public.vehicles for select
using (status in ('available', 'reserved'));

-- Temporalmente permite administrar inventario con la clave publishable.
-- Sustituir esta política por autenticación de administradores antes de producción.
create policy "temporary public inventory management"
on public.vehicles for all
using (true)
with check (true);

insert into public.vehicles (brand, model, year, price, mileage, transmission, fuel_type, status, cover_image_url, description)
select 'BMW', 'X5 xDrive', 2024, 84900, 0, 'Automático', 'Híbrido', 'available',
  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=80',
  'SUV premium de muestra para AutoVision AI.'
where not exists (select 1 from public.vehicles where brand = 'BMW' and model = 'X5 xDrive');
