-- AutoVision AI V4: ejecuta este archivo DESPUÉS de crear tu usuario administrador.
drop policy if exists "temporary public inventory management" on public.vehicles;
create policy "authenticated users manage inventory"
on public.vehicles for all to authenticated
using (true) with check (true);

drop policy if exists "temporary upload vehicle images" on storage.objects;
drop policy if exists "temporary update vehicle images" on storage.objects;
create policy "authenticated users upload vehicle images"
on storage.objects for insert to authenticated
with check (bucket_id = 'vehicle-images');
create policy "authenticated users update vehicle images"
on storage.objects for update to authenticated
using (bucket_id = 'vehicle-images') with check (bucket_id = 'vehicle-images');
