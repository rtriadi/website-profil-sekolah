import Link from "next/link";
import { getSchoolProfile } from "@/lib/content/profile-service";
import { getAnnouncements, getSpotlightAnnouncement } from "@/lib/content/announcement-service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const [profile, announcements, spotlight] = await Promise.all([
    getSchoolProfile(),
    getAnnouncements(),
    getSpotlightAnnouncement(),
  ]);

  const latest = announcements.slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b15] text-slate-100 font-sans pb-24">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl animate-pulse-glow" />
      <div className="absolute top-[40%] right-1/4 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "-4s" }} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span>✨</span> Portal Resmi Pendidikan
          </div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-none">
            <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              {profile.identity.name}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Membentuk masa depan cemerlang melalui dedikasi akademik, integritas karakter, dan inovasi tanpa batas. Temukan visi luhur dan program unggulan kami.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/profile"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Jelajahi Profil 
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
            >
              Info PPDB
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Statistics Grid */}
      <section className="relative px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-md shadow-lg shadow-black/10 hover:border-indigo-500/20 transition-all group">
              <div className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                A
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
                Akreditasi {profile.accreditation.institution}
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-md shadow-lg shadow-black/10 hover:border-indigo-500/20 transition-all group">
              <div className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                {profile.identity.npsn}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
                NPSN Resmi
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-md shadow-lg shadow-black/10 hover:border-indigo-500/20 transition-all group">
              <div className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                {new Date(profile.identity.foundedDate).getFullYear()}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
                Tahun Berdiri
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-md shadow-lg shadow-black/10 hover:border-indigo-500/20 transition-all group">
              <div className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                {profile.identity.status}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
                Status Sekolah
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Announcement Section */}
      {spotlight && (
        <section className="relative mt-16 px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent p-8 backdrop-blur-md shadow-xl shadow-black/25">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Pengumuman Utama
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              {spotlight.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
              {spotlight.summary}
            </p>
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <Link
                href={`/announcements/${spotlight.slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-950 hover:bg-slate-100 transition-colors"
              >
                Baca Selengkapnya
              </Link>
              <time dateTime={spotlight.publishedAt} className="text-xs text-slate-400 font-medium">
                Diterbitkan pada {formatDate(spotlight.publishedAt)}
              </time>
            </div>
          </div>
        </section>
      )}

      {/* Quick Navigation Cards */}
      <section className="relative mt-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-4">
            <Link
              href="/profile"
              className="group rounded-2xl border border-white/5 bg-white/5 p-5 text-center backdrop-blur-md shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10"
            >
              <div className="mx-auto h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg text-indigo-400 group-hover:scale-110 transition-transform">
                🏫
              </div>
              <h2 className="font-heading mt-3 text-sm font-bold text-white">
                Profil
              </h2>
              <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                Visi, misi, & sejarah.
              </p>
            </Link>

            <Link
              href="/programs"
              className="group rounded-2xl border border-white/5 bg-white/5 p-5 text-center backdrop-blur-md shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10"
            >
              <div className="mx-auto h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg text-indigo-400 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h2 className="font-heading mt-3 text-sm font-bold text-white">
                Program Studi
              </h2>
              <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                Jurusan & fasilitas.
              </p>
            </Link>

            <Link
              href="/galeri"
              className="group rounded-2xl border border-white/5 bg-white/5 p-5 text-center backdrop-blur-md shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10"
            >
              <div className="mx-auto h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg text-indigo-400 group-hover:scale-110 transition-transform">
                🖼️
              </div>
              <h2 className="font-heading mt-3 text-sm font-bold text-white">
                Galeri
              </h2>
              <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                Foto kegiatan.
              </p>
            </Link>

            <Link
              href="/announcements"
              className="group rounded-2xl border border-white/5 bg-white/5 p-5 text-center backdrop-blur-md shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10"
            >
              <div className="mx-auto h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg text-indigo-400 group-hover:scale-110 transition-transform">
                📢
              </div>
              <h2 className="font-heading mt-3 text-sm font-bold text-white">
                Pengumuman
              </h2>
              <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                Berita & agenda.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Extra Links Grid (All routes access) */}
      <section className="relative mt-6 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-5">
            <Link
              href="/guru"
              className="group rounded-xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur-md hover:border-indigo-500/20 transition-all hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">👨‍🏫 Guru</span>
            </Link>
            <Link
              href="/struktur-organisasi"
              className="group rounded-xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur-md hover:border-indigo-500/20 transition-all hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">📊 Struktur</span>
            </Link>
            <Link
              href="/kalender-akademik"
              className="group rounded-xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur-md hover:border-indigo-500/20 transition-all hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">📅 Kalender</span>
            </Link>
            <Link
              href="/faq"
              className="group rounded-xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur-md hover:border-indigo-500/20 transition-all hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">❓ FAQ</span>
            </Link>
            <Link
              href="/unduhan"
              className="group rounded-xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur-md hover:border-indigo-500/20 transition-all hover:bg-white/10"
            >
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">📥 Unduhan</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Announcements List */}
      <section className="relative mt-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-end justify-between border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Pembaruan Terkini
              </span>
              <h2 className="font-heading mt-1 text-2xl font-bold text-white">
                Pengumuman & Berita
              </h2>
            </div>
            <Link
              href="/announcements"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          {latest.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-md">
              <p className="text-slate-400 text-sm">Belum ada pengumuman yang diterbitkan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {latest.map((item) => (
                <Link
                  key={item.slug}
                  href={`/announcements/${item.slug}`}
                  className="block rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-black/10 transition-all hover:bg-white/10 hover:border-indigo-500/25 group"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <span className="inline-block rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-400">
                        {item.category}
                      </span>
                      <time
                        dateTime={item.publishedAt}
                        className="text-[11px] text-slate-500 font-semibold"
                      >
                        {formatDate(item.publishedAt)}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
