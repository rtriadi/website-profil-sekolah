import Link from "next/link";
import { getSchoolProfile } from "@/lib/content/profile-service";
import { getAnnouncements, getSpotlightAnnouncement } from "@/lib/content/announcement-service";
import { getMenuSettingsAsync } from "@/lib/content/menu-service";

import { getTestimonies } from "@/lib/content/testimony-service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Visual portal groupings aligned with header navigation
const portalGroups = [
  {
    title: "Layanan & Info",
    description: "Portal pendaftaran online, biaya sekolah, menu makanan harian, dan tour lingkungan.",
    badgeColor: "from-indigo-500/10 to-indigo-500/20 text-indigo-300 border-indigo-500/30",
    glowColor: "bg-indigo-500/10",
    items: [
      {
        href: "/ppdb",
        label: "PPDB Online",
        description: "Informasi dan pendaftaran siswa baru tahun ajaran mendatang.",
        icon: "⚡",
      },
      {
        href: "/biaya",
        label: "Biaya Sekolah",
        description: "Rincian transparan biaya sekolah, SPP, dan uang pangkal.",
        icon: "💳",
      },
      {
        href: "/meal-menu",
        label: "Menu Makanan",
        description: "Daftar menu makanan sehat harian penunjang tumbuh kembang anak.",
        icon: "🍱",
      },
      {
        href: "/news",
        label: "Berita",
        description: "Artikel informatif dan kabar terkini kegiatan sekolah.",
        icon: "📰",
      },
      {
        href: "/virtual-tour",
        label: "Virtual Tour",
        description: "Jelajahi sudut ruang dan fasilitas sekolah secara virtual 360°.",
        icon: "🌐",
      },
      {
        href: "/announcements",
        label: "Pengumuman",
        description: "Pemberitahuan resmi dan rilis penting dari pihak sekolah.",
        icon: "📢",
      },
      {
        href: "/events",
        label: "Acara",
        description: "Daftar agenda kegiatan dan perayaan besar sekolah.",
        icon: "🎟️",
      },
      {
        href: "/unduhan",
        label: "Unduhan Dokumen",
        description: "Download brosur, berkas formulir, dan dokumen kelengkapan.",
        icon: "📥",
      },
    ],
  },
  {
    title: "Profil & Akademik",
    description: "Kenali lebih dekat sejarah, visi, misi, pengajar, serta tata tertib sekolah.",
    badgeColor: "from-sky-500/10 to-sky-500/20 text-sky-300 border-sky-500/30",
    glowColor: "bg-sky-500/10",
    items: [
      {
        href: "/profile",
        label: "Profil Sekolah",
        description: "Sejarah berdirinya sekolah, visi mulia, dan misi strategis.",
        icon: "🏫",
      },
      {
        href: "/programs",
        label: "Program & Fasilitas",
        description: "Fasilitas penunjang serta program studi kurikulum unggulan.",
        icon: "📚",
      },
      {
        href: "/guru",
        label: "Guru & Staf",
        description: "Daftar dewan guru pengajar ahli dan staf administratif.",
        icon: "👨‍🏫",
      },
      {
        href: "/kelas",
        label: "Daftar Kelas",
        description: "Daftar susunan kelas, ruangan belajar, serta wali kelas masing-masing.",
        icon: "🚪",
      },
      {
        href: "/struktur-organisasi",
        label: "Struktur Organisasi",
        description: "Bagan struktur pimpinan sekolah, yayasan, dan komite.",
        icon: "📊",
      },
      {
        href: "/regulations",
        label: "Tata Tertib",
        description: "Pedoman moral dan tata tertib siswa demi disiplin unggul.",
        icon: "📜",
      },
      {
        href: "/kalender-akademik",
        label: "Kalender Akademik",
        description: "Jadwal kegiatan akademik, libur, dan semester sekolah.",
        icon: "📅",
      },
      {
        href: "/faq",
        label: "FAQ Sekolah",
        description: "Jawaban cepat atas pertanyaan umum seputar sekolah.",
        icon: "❓",
      },
      {
        href: "/kontak",
        label: "Kontak & Lokasi",
        description: "Alamat lengkap, peta interaktif, dan nomor kontak resmi.",
        icon: "📍",
      },
    ],
  },
  {
    title: "Kesiswaan & Galeri",
    description: "Kegiatan penunjang minat, bakat, prestasi membanggakan, dan media sosial.",
    badgeColor: "from-emerald-500/10 to-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glowColor: "bg-emerald-500/10",
    items: [
      {
        href: "/galeri",
        label: "Galeri Kegiatan",
        description: "Dokumentasi foto dan video kilas balik aktivitas sekolah.",
        icon: "🖼️",
      },
      {
        href: "/achievements",
        label: "Prestasi Siswa",
        description: "Deretan piala dan pencapaian gemilang siswa berprestasi.",
        icon: "🏆",
      },
      {
        href: "/extracurriculars",
        label: "Ekstrakurikuler",
        description: "Pilihan klub minat bakat penunjang soft skill siswa.",
        icon: "⭐",
      },
      {
        href: "/instagram",
        label: "Instagram Stream",
        description: "Hubungkan dengan sosial media resmi untuk interaksi harian.",
        icon: "📸",
      },
    ],
  },
];

export default async function Home() {
  const [profile, announcements, spotlight, testimonies, menuSettings] = await Promise.all([
    getSchoolProfile(),
    getAnnouncements(),
    getSpotlightAnnouncement(),
    getTestimonies(),
    getMenuSettingsAsync(),
  ]);

  const latest = announcements.slice(0, 3);

  // Filter portal groups dynamically based on menu visibility settings
  const visiblePortalGroups = portalGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => menuSettings[item.href] !== false),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b15] text-slate-100 font-sans pb-24">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl animate-pulse-glow" />
      <div className="absolute top-[40%] right-1/4 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "-4s" }} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span>✨</span> {profile.heroBadge || "Portal Resmi Pendidikan"}
          </div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-none">
            <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              {profile.identity.name}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.heroSubtitle || "Membentuk masa depan cemerlang melalui dedikasi akademik, integritas karakter, dan inovasi tanpa batas. Temukan visi luhur dan program unggulan kami."}
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
                {profile.accreditation.rating}
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

      {/* Menu Portal Grid Section */}
      <section className="relative mt-24 px-6">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              Layanan Navigasi Satu Pintu
            </span>
            <h2 className="font-heading mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Portal Layanan & Informasi
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Jelajahi seluruh menu layanan publik resmi, program sekolah, dokumentasi kesiswaan, dan berita terbaru kami secara transparan.
            </p>
          </div>

          {visiblePortalGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="relative space-y-6">
              {/* Subtle background glow behind each group */}
              <div className={`absolute -inset-x-6 -inset-y-4 rounded-3xl ${group.glowColor} opacity-20 blur-xl pointer-events-none`} />
              
              <div className="relative border-b border-white/5 pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  {group.description}
                </p>
              </div>

              <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-lg shadow-sm border border-white/5 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                        {item.icon}
                      </div>
                      <h4 className="font-heading mt-3 text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.label}
                      </h4>
                      <p className="mt-1 text-[10px] text-slate-400 leading-normal line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center text-[10px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Buka Menu</span>
                      <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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

      {/* Testimonials Section */}
      {menuSettings["/testimonies"] !== false && testimonies && testimonies.length > 0 && (
        <section className="relative mt-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                Apa Kata Mereka
              </span>
              <h2 className="font-heading mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Testimoni Orang Tua & Siswa
              </h2>
              <p className="mt-4 text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                Ulasan tulus dari orang tua murid mengenai kualitas pendidikan, pelayanan, dan kenyamanan lingkungan belajar kami.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {testimonies
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((testimony) => (
                  <div
                    key={testimony.id}
                    className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-black/10 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300"
                  >
                    <p className="text-sm italic text-slate-300 leading-relaxed">
                      "{testimony.content}"
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-sm font-extrabold text-slate-950 shadow-md">
                        {testimony.avatarUrl ? (
                          <img
                            src={testimony.avatarUrl}
                            alt={testimony.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          testimony.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{testimony.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{testimony.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
