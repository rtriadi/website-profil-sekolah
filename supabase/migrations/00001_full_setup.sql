-- ============================================================
-- FULL SETUP SCHEMA — Website Profil Sekolah
-- ============================================================
-- Jalankan seluruh file ini di Supabase SQL Editor
-- Project: itqgtfzkidizvdgtquvg
-- ============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. AUTH / STAFF
-- ============================================================

create table if not exists staff (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  password    text not null,
  role        text not null default 'staff' check (role in ('admin','editor','staff')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 2. PROFILE
-- ============================================================

create table if not exists school_profile (
  id              uuid primary key default gen_random_uuid(),
  name            text not null default 'Nama Sekolah',
  short_name      text not null default '',
  npsn            text not null default '',
  founded_date    date,
  principal_name  text not null default '',
  status          text not null default 'Swasta' check (status in ('Negeri','Swasta')),
  street          text not null default '',
  village         text not null default '',
  district        text not null default '',
  city            text not null default '',
  province        text not null default '',
  postal_code     text not null default '',
  phone           text not null default '',
  email           text not null default '',
  website         text not null default '',
  accreditation   text not null default '',
  accreditation_cert text not null default '',
  accreditation_valid date,
  updated_at      timestamptz not null default now()
);

insert into school_profile (name) values ('Nama Sekolah')
on conflict do nothing;

-- ============================================================
-- 3. SEJARAH & VISI MISI
-- ============================================================

create table if not exists school_narrative (
  id        uuid primary key default gen_random_uuid(),
  history   jsonb not null default '[]'::jsonb,
  vision    text not null default '',
  mission   jsonb not null default '[]'::jsonb
);

insert into school_narrative default values
on conflict do nothing;

-- ============================================================
-- 4. PROGRAMS / JURUSAN
-- ============================================================

create table if not exists school_programs (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  slug        text not null unique,
  program_type text not null default 'Umum',
  icon        text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 5. FACILITIES
-- ============================================================

create table if not exists facilities (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  slug        text not null unique,
  category    text not null default 'Lainnya',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 6. TEACHERS
-- ============================================================

create table if not exists teachers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  nip         text not null default '',
  subject     text not null default '',
  position    text not null default '',
  photo_url   text not null default '',
  description text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 6.5. CLASSES / KELAS
-- ============================================================

create table if not exists classes (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  teacher_id    uuid references teachers(id) on delete set null,
  room_name     text not null default '',
  student_count int,
  description   text not null default '',
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- 7. ORGANIZATIONAL STRUCTURE
-- ============================================================

create table if not exists org_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    text not null default '',
  parent_id   uuid references org_members(id) on delete set null,
  photo_url   text not null default '',
  description text not null default '',
  sort_order  int not null default 0
);

-- ============================================================
-- 8. PPDB CONFIG
-- ============================================================

create table if not exists ppdb_config (
  id                 uuid primary key default gen_random_uuid(),
  active             boolean not null default false,
  year               text not null default '',
  title              text not null default '',
  description        text not null default '',
  schedule_text      text not null default '',
  contact            text not null default '',
  registration_link  text not null default '',
  banner_text        text not null default '',
  requirements       jsonb not null default '[]'::jsonb,
  steps              jsonb not null default '[]'::jsonb,
  updated_at         timestamptz not null default now()
);

insert into ppdb_config (year, title) values ('', 'Penerimaan Peserta Didik Baru')
on conflict do nothing;

-- ============================================================
-- 9. ANNOUNCEMENTS
-- ============================================================

create table if not exists announcements (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  summary      text not null default '',
  content      text not null default '',
  author       text not null default '',
  category     text not null default 'pengumuman' check (category in ('berita','kegiatan','pengumuman')),
  spotlight    boolean not null default false,
  scheduled_at timestamptz,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_announcements_published_at on announcements(published_at desc);
create index if not exists idx_announcements_category on announcements(category);

-- ============================================================
-- 10. EVENTS
-- ============================================================

create table if not exists school_events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  date        date not null,
  time        text not null default '',
  location    text not null default '',
  description text not null default '',
  category    text not null default 'lainnya' check (category in ('akademik','non-akademik','libur','rapat','lainnya')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_events_date on school_events(date);

-- ============================================================
-- 11. DOCUMENTS
-- ============================================================

create table if not exists school_documents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  category    text not null check (category in ('formulir','brosur','kalender-akademik','kurikulum','lainnya')),
  filename    text not null default '',
  url         text not null default '',
  file_size   int not null default 0,
  uploaded_at timestamptz not null default now()
);

-- ============================================================
-- 12. CONTACT / LOCATION
-- ============================================================

create table if not exists contact_info (
  id              uuid primary key default gen_random_uuid(),
  phone           text not null default '',
  whatsapp        text not null default '',
  email           text not null default '',
  maps_embed_url  text not null default '',
  street          text not null default '',
  village         text not null default '',
  district        text not null default '',
  city            text not null default '',
  province        text not null default '',
  postal_code     text not null default '',
  operating_hours jsonb not null default '[]'::jsonb,
  social_media    jsonb not null default '{}'::jsonb,
  updated_at      timestamptz not null default now()
);

insert into contact_info default values
on conflict do nothing;

-- ============================================================
-- 13. ACADEMIC CALENDAR
-- ============================================================

create table if not exists academic_calendars (
  id            uuid primary key default gen_random_uuid(),
  title         text not null default '',
  academic_year text not null default '',
  periods       jsonb not null default '[]'::jsonb,
  updated_at    timestamptz not null default now()
);

insert into academic_calendars (title, academic_year) values ('Kalender Akademik', '')
on conflict do nothing;

-- ============================================================
-- 14. FAQ
-- ============================================================

create table if not exists faq_items (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null default '',
  category    text not null check (category in ('ppdb','biaya','akademik','fasilitas','lainnya')),
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 15. TESTIMONIES
-- ============================================================

create table if not exists testimonies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null default '',
  content     text not null default '',
  avatar_url  text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 16. ACHIEVEMENTS
-- ============================================================

create table if not exists achievements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  date        date,
  category    text not null check (category in ('akademik','non-akademik')),
  image_url   text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 17. TUITION (SPP / Biaya)
-- ============================================================

create table if not exists tuition_data (
  id             uuid primary key default gen_random_uuid(),
  academic_year  text not null default '',
  items          jsonb not null default '[]'::jsonb,
  updated_at     timestamptz not null default now()
);

insert into tuition_data default values
on conflict do nothing;

-- ============================================================
-- 18. MEAL MENU
-- ============================================================

create table if not exists meal_menus (
  id      uuid primary key default gen_random_uuid(),
  day     text not null,
  snack   text not null default '',
  main    text not null default '',
  drink   text not null default '',
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 19. EXTRACURRICULARS
-- ============================================================

create table if not exists extracurriculars (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  schedule    text not null default '',
  coach       text not null default '',
  icon        text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 20. REGULATIONS
-- ============================================================

create table if not exists regulations (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  content     text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 21. NEWS
-- ============================================================

create table if not exists news_articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  content      text not null default '',
  summary      text not null default '',
  image_url    text not null default '',
  author       text not null default '',
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_news_published_at on news_articles(published_at desc);

-- ============================================================
-- 22. MEDIA / GALLERY
-- ============================================================

create table if not exists media_items (
  id          uuid primary key default gen_random_uuid(),
  filename    text not null,
  url         text not null,
  alt_text    text not null default '',
  file_size   int not null default 0,
  type        text not null default '',
  album       text not null default '',
  uploaded_at timestamptz not null default now()
);

create index if not exists idx_media_album on media_items(album);

-- ============================================================
-- 23. GALLERY ALBUMS
-- ============================================================

create table if not exists gallery_albums (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  slug        text not null unique,
  cover_url   text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 24. INSTAGRAM SETTINGS
-- ============================================================

create table if not exists instagram_settings (
  id        uuid primary key default gen_random_uuid(),
  embed_url text not null default '',
  active    boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into instagram_settings default values
on conflict do nothing;

-- ============================================================
-- 25. VIRTUAL TOUR
-- ============================================================

create table if not exists virtual_tour (
  id        uuid primary key default gen_random_uuid(),
  image_url text not null default '',
  title     text not null default 'Virtual Tour Sekolah',
  updated_at timestamptz not null default now()
);

insert into virtual_tour default values
on conflict do nothing;

-- ============================================================
-- 26. ACTIVITY LOG
-- ============================================================

create table if not exists activity_logs (
  id         uuid primary key default gen_random_uuid(),
  action     text not null,
  section    text not null,
  detail     text not null default '',
  staff_id   uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_logs_created_at on activity_logs(created_at desc);

-- ============================================================
-- 27. JSON STORE — persistence untuk serverless (KUNCI UTAMA)
-- ============================================================

create table if not exists json_store (
  filename   text primary key,
  content    text not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'staff','school_profile','school_programs','facilities',
      'teachers','classes','json_store','announcements','school_events',
      'faq_items','testimonies','achievements',
      'extracurriculars','regulations','news_articles',
      'gallery_albums'
    ])
  loop
    execute format('
      drop trigger if exists trigger_%I_updated_at on %I;
      create trigger trigger_%I_updated_at
        before update on %I
        for each row execute function update_updated_at();
    ', tbl, tbl, tbl, tbl);
  end loop;
end $$;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS dan public read untuk semua tabel konten
do $$ declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'school_profile','school_narrative','school_programs','facilities',
      'teachers','classes','org_members','ppdb_config','announcements','school_events',
      'school_documents','contact_info','academic_calendars','faq_items',
      'testimonies','achievements','tuition_data','meal_menus',
      'extracurriculars','regulations','news_articles','media_items',
      'gallery_albums','instagram_settings','virtual_tour','activity_logs'
    ])
  loop
    execute format('alter table %I enable row level security;', tbl);
    execute format('
      drop policy if exists "Public read" on %I;
      create policy "Public read" on %I for select using (true);
    ', tbl, tbl);
    execute format('
      drop policy if exists "Admin write" on %I;
      create policy "Admin write" on %I for all using (
        auth.role() = ''authenticated''
      );
    ', tbl, tbl);
  end loop;
end $$;

-- ============================================================
-- json_store: OPEN write policy (server-side only table)
-- PENTING: Ini yang memungkinkan server actions menyimpan data
-- ============================================================

alter table json_store enable row level security;

drop policy if exists "Public read" on json_store;
create policy "Public read" on json_store for select using (true);

drop policy if exists "Admin write" on json_store;
drop policy if exists "Server write" on json_store;
create policy "Server write" on json_store
  for all
  using (true)
  with check (true);

-- Staff table: hanya authenticated yang bisa baca
alter table staff enable row level security;
drop policy if exists "Staff self read" on staff;
create policy "Staff self read" on staff for select using (auth.role() = 'authenticated');
drop policy if exists "Staff self update" on staff;
create policy "Staff self update" on staff for update using (id = auth.uid());
