-- ============================================================
-- Migration 00002: Fix json_store write policy
-- ============================================================
-- Masalah: json_store hanya bisa di-write oleh 'authenticated' role
-- tapi server actions menggunakan anon key (role = 'anon').
-- Solusi: Izinkan semua role (anon + authenticated) menulis ke json_store
-- karena tabel ini hanya diakses server-side, bukan dari browser publik.
-- ============================================================

-- Drop policy lama yang terlalu ketat untuk json_store
drop policy if exists "Admin write" on json_store;

-- Izinkan semua insert/update/delete ke json_store (server-side only table)
create policy "Server write" on json_store
  for all
  using (true)
  with check (true);
