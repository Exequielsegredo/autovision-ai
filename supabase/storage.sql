-- AutoVision AI V4: ejecuta este archivo una sola vez en Supabase > SQL Editor.
insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do update set public = true;

create policy "public can view vehicle images"
on storage.objects for select
using (bucket_id = 'vehicle-images');

-- Temporal para desarrollo: se reemplazará por una política de administradores con login.
create policy "temporary upload vehicle images"
on storage.objects for insert
with check (bucket_id = 'vehicle-images');

create policy "temporary update vehicle images"
on storage.objects for update
using (bucket_id = 'vehicle-images')
with check (bucket_id = 'vehicle-images');
