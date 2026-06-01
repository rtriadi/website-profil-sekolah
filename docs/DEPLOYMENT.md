# Deployment Guide

## Architecture

```
Browser → Vercel (Next.js) → Supabase (PostgreSQL + Auth)
                        ↘ data/*.json (local dev only)
```

- **Local dev**: JSON files in `data/` — no database needed
- **Vercel (prod)**: Supabase PostgreSQL — filesystem is read-only

---

## 1. Prasyarat

Sebelum mulai, siapkan:

- Akun [Vercel](https://vercel.com) (hubungkan dengan GitHub/GitLab)
- Akun [Supabase](https://supabase.com) (free tier cukup)
- Repository Git project ini sudah terpush (GitHub, GitLab, atau Bitbucket)

---

## 2. Persiapan Project

### 2.1 Set `NEXT_PUBLIC_SITE_URL`

File `src/app/sitemap.ts` dan `src/app/layout.tsx` menggunakan env var ini untuk generate sitemap dan Open Graph URL.

Di **`.env.local`** (local development):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Di Vercel nanti akan diisi dengan domain production.

### 2.2 File-file yang sudah siap

| File | Fungsi |
|---|---|
| `public/favicon.svg` | Icon tab browser |
| `public/icon.svg` | Icon PWA & manifest |
| `public/manifest.json` | PWA manifest (bisa di-install ke HP) |
| `public/robots.txt` | SEO — izinkan crawler |
| `src/app/sitemap.ts` | SEO — XML sitemap (otomatis generate semua halaman) |
| `src/app/not-found.tsx` | Halaman 404 custom |
| `src/components/ui/breadcrumbs.tsx` | Breadcrumb navigasi |
| `supabase/migrations/00001_init.sql` | Migration SQL |

---

## 3. Supabase Setup

### 3.1 Create Project

1. Buka [supabase.com](https://supabase.com) → **New project**
2. Isi:
   - **Name**: `website-profil-sekolah` (atau nama sekolah Anda)
   - **Database Password**: simpan baik-baik
   - **Region**: Pilih yang terdekat — **Singapore (`sin1`)** recommended untuk Indonesia
3. Tunggu provisioning selesai (~2 menit)
4. Buka **Settings → API** — catat:
   - `Project URL` (misal: `https://abcdefgh.supabase.co`)
   - `anon public` key

### 3.2 Run Migration

Buka **SQL Editor** di dashboard Supabase → **New query**.

Buka file [`supabase/migrations/00001_init.sql`](../supabase/migrations/00001_init.sql), copy seluruh isinya, paste ke SQL Editor, lalu klik **Run**.

> Migration ini akan membuat semua tabel yang diperlukan dan mengaktifkan Row Level Security (RLS).

### 3.3 Verifikasi

Di **Table Editor**, pastikan tabel-tabel sudah muncul:
- `school_profile`, `programs`, `facilities`, `teachers`
- `news`, `announcements`, `events`, `gallery_albums`, `gallery_media`
- `achievements`, `extracurriculars`, `faq`, `regulations`
- `testimonials`, `ppdb`, `tuition`, `meal_menu`
- `organizational_structure`, `academic_calendar`, `documents`
- `contact_settings`, `whatsapp`, `instagram`, `menu_settings`
- `virtual_tour`, `activity_logs`

### 3.4 Auth Setup (untuk Admin Login)

1. Buka **Authentication → Providers**
2. Pastikan **Email** provider aktif
3. Buka **Authentication → Settings**
4. **DISABLE** "Confirm email" (karena hanya admin internal) — atau biarkan aktif jika ingin konfirmasi email

### 3.5 (Opsional) Seed Data

Jika ingin mengisi data awal, jalankan SQL berikut di SQL Editor:

```sql
-- Insert admin user (ganti email & password dengan milik Anda)
INSERT INTO auth.users (email, password)
VALUES ('admin@sekolah.com', 'password-anda');

-- Atau gunakan Supabase Management API untuk create user
```

---

## 4. Vercel Setup

### 4.1 Connect Repository

1. Buka [vercel.com](https://vercel.com) → **Add New → Project**
2. Pilih repository project ini
3. Vercel akan otomatis mendeteksi **Next.js** framework

### 4.2 Configure Project

Di halaman konfigurasi:

| Pengaturan | Value |
|---|---|
| **Framework Preset** | Next.js (otomatis terdeteksi) |
| **Build Command** | `next build` (default) |
| **Output Directory** | `.next` (default) |
| **Root Directory** | biarkan kosong |

### 4.3 Environment Variables (SEKALIGUS — tidak perlu isi satu-satu)

Ada 2 cara untuk mengisi semua env var sekaligus:

---

#### Cara A: Via Script (CLI, 1x jalan)

Jalankan script PowerShell ini dari terminal:

```powershell
.\scripts\setup-vercel-env.ps1
```

Script akan:
1. Meminta semua nilai satu per satu (dengan default value)
2. Otomatis generate `SESSION_SECRET` jika dikosongkan
3. Set semua variable ke Vercel via CLI (`vercel env add`)
4. Selesai dalam 1-2 menit

> Prasyarat: Install [Vercel CLI](https://vercel.com/docs/cli) dan login (`vercel login`).

---

#### Cara B: Bulk Paste (Via Dashboard)

1. Siapkan file `.env` (copy dari `.env.example` lalu isi nilai sebenarnya):

```ini
NEXT_PUBLIC_SITE_URL=https://sekolah-anda.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
DATABASE_PROVIDER=supabase
SESSION_SECRET=generated-32-char-random-string
ADMIN_EMAIL=admin@sekolah.sch.id
ADMIN_PASSWORD=password-kuat-disini
```

2. Di dashboard Vercel: **Project Settings → Environment Variables**
3. Paste semua isi `.env` sekaligus ke dalam form
4. Pilih environment **Production**
5. Klik **Save**

---

#### Daftar Lengkap Variable

| Variable | Fungsi | Cara Generate |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domain untuk sitemap & OG | Domain Vercel Anda |
| `NEXT_PUBLIC_SUPABASE_URL` | Koneksi ke Supabase | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase | Settings → API → anon public |
| `DATABASE_PROVIDER` | Pilih provider database | `supabase` (wajib di Vercel) |
| `SESSION_SECRET` | Enkripsi session JWT | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | Email login admin | Email sekolah Anda |
| `ADMIN_PASSWORD` | Password login admin | Password kuat minimal 8 karakter |

### 4.4 Deploy

Klik **Deploy** — Vercel akan otomatis:
1. Install dependencies (`npm install`)
2. Build project (`next build`)
3. Deploy ke production URL

Proses ~2-3 menit. Setelah selesai, klik **Continue to Dashboard**.

### 4.5 Set Custom Domain (Opsional)

1. Di project dashboard → **Settings → Domains**
2. Masukkan domain sekolah Anda (misal: `smpn1-suka.sch.id` atau `smknegeri2.example.com`)
3. Ikuti petunjuk untuk menambahkan DNS record di domain registrar Anda

---

## 5. Post-Deploy Checklist

### 5.1 Verifikasi Halaman Publik

- [ ] `https://domain-anda.com/` — Beranda (hero, profil singkat, berita terbaru)
- [ ] `https://domain-anda.com/profile` — Profil sekolah
- [ ] `https://domain-anda.com/guru` — Data guru (foto tampil?)
- [ ] `https://domain-anda.com/news` — Berita (load-more berfungsi?)
- [ ] `https://domain-anda.com/announcements` — Pengumuman
- [ ] `https://domain-anda.com/events` — Acara/kegiatan
- [ ] `https://domain-anda.com/galeri` — Galeri foto
- [ ] `https://domain-anda.com/achievements` — Prestasi
- [ ] `https://domain-anda.com/ppdb` — Halaman PPDB
- [ ] `https://domain-anda.com/kontak` — Kontak (maps tampil?)
- [ ] `https://domain-anda.com/faq` — FAQ
- [ ] `https://domain-anda.com/biaya` — Biaya pendidikan
- [ ] `https://domain-anda.com/sitemap.xml` — Sitemap SEO (harus return XML valid)
- [ ] `https://domain-anda.com/robots.txt` — Robots.txt

### 5.2 Verifikasi Admin

- [ ] `https://domain-anda.com/login` — Halaman login muncul
- [ ] Login dengan `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [ ] Redirect ke dashboard admin
- [ ] Coba tambah/edit berita, pengumuman, guru
- [ ] Cek halaman **Activity Log** — log tercatat?

### 5.3 Verifikasi Teknis

- [ ] 404 page — buka URL tidak valid, tampil halaman custom?
- [ ] Breadcrumbs — muncul di halaman dalam?
- [ ] Sitemap — valid (cek via Google Search Console)
- [ ] Responsive — buka dari HP, layout menyesuaikan?
- [ ] Dark mode — toggle theme berfungsi?
- [ ] Icon tab — muncul icon sekolah?

### 5.4 Cek Logs (jika ada error)

```bash
# Via Vercel CLI
vercel logs <deployment-url>
```

Atau dari dashboard Vercel → project → **Deployments** → klik deployment → **Logs**.

---

## 6. Troubleshooting

### 6.1 Build Error: "Page not found"

Pastikan semua file di `src/app/` tidak ada yang corrupt. Coba:

```bash
rm -rf .next
npm run build
```

### 6.2 Login Error di Production

Mungkin karena session secret tidak konsisten. Pastikan `SESSION_SECRET` sudah di-set di environment variables Vercel dan tidak berubah.

### 6.3 Data Tidak Muncul

1. Cek Supabase **Table Editor** — apakah ada data?
2. Cek **Logs** di Vercel — mungkin ada error koneksi Supabase
3. Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` benar

### 6.4 Filesystem Read-Only Error

Ini normal di Vercel — JSON provider tidak bisa menulis. Pastikan `DATABASE_PROVIDER=supabase`.

### 6.5 Migration Checksum Error

Jika Supabase CLI melaporkan checksum mismatch:

```bash
supabase migration repair --status applied 00001
```

---

## 7. Rollback

```bash
# Rollback deployment Vercel
vercel rollback

# Rollback database Supabase
supabase db reset
```

---

## 8. Maintenance

### Update Konten

Semua konten bisa diubah via halaman admin (`/admin/...`). Tidak perlu deploy ulang untuk mengubah:
- Berita, pengumuman, acara
- Profil sekolah, guru, fasilitas
- Galeri foto, prestasi
- Dan semua konten lainnya

### Deploy Update Kode

Push ke branch terhubung → Vercel auto-deploy.

```bash
git push origin main
```

### Monitoring

Pantau di Vercel dashboard:
- **Analytics** — traffic, performa
- **Logs** — error & warnings
- **Speed Insights** — Core Web Vitals
