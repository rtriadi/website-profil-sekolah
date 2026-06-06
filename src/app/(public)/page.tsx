import Link from "next/link";
import Image from "next/image";
import { getSchoolProfile } from "@/lib/content/profile-service";
import { getAnnouncements, getSpotlightAnnouncement } from "@/lib/content/announcement-service";
import { getMenuSettingsAsync } from "@/lib/content/menu-service";
import { getTestimonies } from "@/lib/content/testimony-service";
import { HeroSlider } from "@/components/home/hero-slider";
import { getHeroSlides } from "@/lib/content/hero-slides-service";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import {
  Zap, CreditCard, UtensilsCrossed, Newspaper, Globe, Megaphone,
  CalendarDays, Download, School, BookOpen, GraduationCap, DoorOpen,
  Network, ScrollText, CircleHelp, MapPin, Images, Trophy, Star, Camera, ChevronRight,
} from "lucide-react";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Icon map for portal items
const iconMap: Record<string, React.ReactNode> = {
  "/ppdb": <Zap className="h-4 w-4" />,
  "/biaya": <CreditCard className="h-4 w-4" />,
  "/meal-menu": <UtensilsCrossed className="h-4 w-4" />,
  "/news": <Newspaper className="h-4 w-4" />,
  "/virtual-tour": <Globe className="h-4 w-4" />,
  "/announcements": <Megaphone className="h-4 w-4" />,
  "/events": <CalendarDays className="h-4 w-4" />,
  "/unduhan": <Download className="h-4 w-4" />,
  "/profile": <School className="h-4 w-4" />,
  "/programs": <BookOpen className="h-4 w-4" />,
  "/guru": <GraduationCap className="h-4 w-4" />,
  "/kelas": <DoorOpen className="h-4 w-4" />,
  "/struktur-organisasi": <Network className="h-4 w-4" />,
  "/regulations": <ScrollText className="h-4 w-4" />,
  "/kalender-akademik": <CalendarDays className="h-4 w-4" />,
  "/faq": <CircleHelp className="h-4 w-4" />,
  "/kontak": <MapPin className="h-4 w-4" />,
  "/galeri": <Images className="h-4 w-4" />,
  "/achievements": <Trophy className="h-4 w-4" />,
  "/extracurriculars": <Star className="h-4 w-4" />,
  "/instagram": <Camera className="h-4 w-4" />,
};

// Visual portal groupings aligned with header navigation
const portalGroups = [
  {
    title: "Layanan & Info",
    description: "Portal pendaftaran online, biaya sekolah, menu makanan harian, dan tour lingkungan.",
    badgeColor: "from-indigo-500/10 to-indigo-500/20 text-indigo-300 border-indigo-500/30",
    glowColor: "bg-indigo-500/10",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    items: [
      { href: "/ppdb", label: "PPDB Online", description: "Informasi dan pendaftaran siswa baru tahun ajaran mendatang." },
      { href: "/biaya", label: "Biaya Sekolah", description: "Rincian transparan biaya sekolah, SPP, dan uang pangkal." },
      { href: "/meal-menu", label: "Menu Makanan", description: "Daftar menu makanan sehat harian penunjang tumbuh kembang anak." },
      { href: "/news", label: "Berita", description: "Artikel informatif dan kabar terkini kegiatan sekolah." },
      { href: "/virtual-tour", label: "Virtual Tour", description: "Jelajahi sudut ruang dan fasilitas sekolah secara virtual 360Â°." },
      { href: "/announcements", label: "Pengumuman", description: "Pemberitahuan resmi dan rilis penting dari pihak sekolah." },
      { href: "/events", label: "Acara", description: "Daftar agenda kegiatan dan perayaan besar sekolah." },
      { href: "/unduhan", label: "Unduhan Dokumen", description: "Download brosur, berkas formulir, dan dokumen kelengkapan." },
    ],
  },
  {
    title: "Profil & Akademik",
    description: "Kenali lebih dekat sejarah, visi, misi, pengajar, serta tata tertib sekolah.",
    badgeColor: "from-sky-500/10 to-sky-500/20 text-sky-300 border-sky-500/30",
    glowColor: "bg-sky-500/10",
    accentColor: "text-sky-600 dark:text-sky-400",
    items: [
      { href: "/profile", label: "Profil Sekolah", description: "Sejarah berdirinya sekolah, visi mulia, dan misi strategis." },
      { href: "/programs", label: "Program & Fasilitas", description: "Fasilitas penunjang serta program studi kurikulum unggulan." },
      { href: "/guru", label: "Guru & Staf", description: "Daftar dewan guru pengajar ahli dan staf administratif." },
      { href: "/kelas", label: "Daftar Kelas", description: "Daftar susunan kelas, ruangan belajar, serta wali kelas masing-masing." },
      { href: "/struktur-organisasi", label: "Struktur Organisasi", description: "Bagan struktur pimpinan sekolah, yayasan, dan komite." },
      { href: "/regulations", label: "Tata Tertib", description: "Pedoman moral dan tata tertib siswa demi disiplin unggul." },
      { href: "/kalender-akademik", label: "Kalender Akademik", description: "Jadwal kegiatan akademik, libur, dan semester sekolah." },
      { href: "/faq", label: "FAQ Sekolah", description: "Jawaban cepat atas pertanyaan umum seputar sekolah." },
      { href: "/kontak", label: "Kontak & Lokasi", description: "Alamat lengkap, peta interaktif, dan nomor kontak resmi." },
    ],
  },
  {
    title: "Kesiswaan & Galeri",
    description: "Kegiatan penunjang minat, bakat, prestasi membanggakan, dan media sosial.",
    badgeColor: "from-emerald-500/10 to-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glowColor: "bg-emerald-500/10",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    items: [
      { href: "/galeri", label: "Galeri Kegiatan", description: "Dokumentasi foto dan video kilas balik aktivitas sekolah." },
      { href: "/achievements", label: "Prestasi Siswa", description: "Deretan piala dan pencapaian gemilang siswa berprestasi." },
      { href: "/extracurriculars", label: "Ekstrakurikuler", description: "Pilihan klub minat bakat penunjang soft skill siswa." },
      { href: "/instagram", label: "Instagram Stream", description: "Hubungkan dengan sosial media resmi untuk interaksi harian." },
    ],
  },
];

export default async function Home() {
  const [profile, announcements, spotlight, testimonies, menuSettings, slides] = await Promise.all([
    getSchoolProfile(),
    getAnnouncements(),
    getSpotlightAnnouncement(),
    getTestimonies(),
    getMenuSettingsAsync(),
    getHeroSlides(),
  ]);

  const latest = announcements.slice(0, 3);

  // Filter portal groups dynamically based on menu visibility settings
  const visiblePortalGroups = portalGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => menuSettings[item.href] !== false),
    }))
    .filter((group) => group.items.length > 0);

  const foundedYear = new Date(profile.identity.foundedDate).getFullYear();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50/50 dark:bg-[#070b15] text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-300 grain-overlay">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 h-[700px] w-[700px] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-[20%] left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/3 dark:bg-emerald-500/5 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "-8s" }} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 text-left space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.05)] dark:shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              {profile.heroBadge || "Portal Resmi Pendidikan"}
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl sm:leading-none">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
                {profile.identity.name}
              </span>
            </h1>

            {/* Large background watermark text */}
            <div className="absolute top-16 left-0 right-0 text-[10vw] font-heading font-extrabold text-slate-900/[0.02] dark:text-white/[0.02] whitespace-nowrap overflow-hidden select-none pointer-events-none tracking-tight leading-none" aria-hidden="true">
              {profile.identity.name}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {profile.heroSubtitle || "Membentuk masa depan cemerlang melalui dedikasi akademik, integritas karakter, dan inovasi tanpa batas. Temukan visi luhur dan program unggulan kami."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/profile"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-500 to-sky-400 px-6 py-3.5 text-sm font-bold text-slate-950 btn-shimmer shadow-[0_0_20px_rgba(99,102,241,0.2)] dark:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              >
                Jelajahi Profil
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ppdb"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-white shadow-sm dark:shadow-none backdrop-blur-md transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.98]"
              >
                Info PPDB
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Image Carousel */}
          <div className="lg:col-span-5 w-full flex justify-center animate-in fade-in slide-in-from-right-4 duration-500">
            <HeroSlider slides={slides} />
          </div>

        </div>
      </section>

      {/* Quick Statistics Grid */}
      <section className="relative px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {[
              { value: profile.accreditation.rating, label: `Akreditasi ${profile.accreditation.institution}` },
              { value: profile.identity.npsn, label: "NPSN Resmi" },
              { value: String(foundedYear), label: "Tahun Berdiri" },
              { value: profile.identity.status, label: "Status Sekolah" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 80} direction="up">
                <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-6 text-center shadow-sm dark:shadow-lg dark:shadow-black/10 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all group">
                  <div className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400 dark:from-indigo-400 dark:to-sky-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Announcement Section */}
      {spotlight && (
        <ScrollReveal className="mt-16 px-6" direction="up" delay={100}>
          <section className="relative px-0">
            <div className="mx-auto max-w-4xl rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-transparent dark:to-transparent p-8 shadow-sm dark:shadow-xl dark:shadow-black/25">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Pengumuman Utama
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {spotlight.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {spotlight.summary}
              </p>
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <Link
                  href={`/announcements/${spotlight.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-xs font-bold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md dark:shadow-none active:scale-[0.98]"
                >
                  Baca Selengkapnya
                  <ChevronRight className="h-3 w-3" />
                </Link>
                <time dateTime={spotlight.publishedAt} className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                  Diterbitkan pada {formatDate(spotlight.publishedAt)}
                </time>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Menu Portal Grid Section */}
      <section className="relative mt-24 px-6">
        <div className="mx-auto max-w-4xl space-y-16">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Layanan Navigasi Satu Pintu
              </span>
              <h2 className="font-heading mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                Portal Layanan & Informasi
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Jelajahi seluruh menu layanan publik resmi, program sekolah, dokumentasi kesiswaan, dan berita terbaru kami secara transparan.
              </p>
            </div>
          </ScrollReveal>

          {visiblePortalGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="relative space-y-6">
              {/* Subtle background glow behind each group */}
              <div className={`absolute -inset-x-6 -inset-y-4 rounded-3xl ${group.glowColor} opacity-5 dark:opacity-20 blur-xl pointer-events-none`} />

              <ScrollReveal direction="up" delay={groupIdx * 50}>
                <div className="relative border-b border-slate-200 dark:border-white/5 pb-3">
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {group.description}
                  </p>
                </div>
              </ScrollReveal>

              <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item, itemIdx) => (
                  <ScrollReveal
                    key={item.href}
                    delay={groupIdx * 50 + itemIdx * 60}
                    direction="up"
                  >
                    <Link
                      href={item.href}
                      className="group relative rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:bg-slate-50/50 dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {iconMap[item.href] ?? <Star className="h-4 w-4" />}
                        </div>
                        <h4 className="font-heading mt-3 text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.label}
                        </h4>
                        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Buka Menu</span>
                        <ChevronRight className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Announcements List */}
      <section className="relative mt-24 px-6">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal direction="up">
            <div className="mb-8 flex items-end justify-between border-b border-slate-200 dark:border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Pembaruan Terkini
                </span>
                <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Pengumuman & Berita
                </h2>
              </div>
              <Link
                href="/announcements"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                Lihat Semua <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </ScrollReveal>

          {latest.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-8 text-center shadow-sm">
              <p className="text-slate-400 dark:text-slate-500 text-sm">Belum ada pengumuman yang diterbitkan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {latest.map((item, i) => (
                <ScrollReveal key={item.slug} delay={i * 80} direction="up">
                  <Link
                    href={`/announcements/${item.slug}`}
                    className="block rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-lg dark:shadow-black/10 transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:border-indigo-500/25 dark:hover:border-indigo-500/25 group"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
                        <span className="inline-block rounded bg-indigo-55 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          {item.category}
                        </span>
                        <time
                          dateTime={item.publishedAt}
                          className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold whitespace-nowrap"
                        >
                          {formatDate(item.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {menuSettings["/testimonies"] !== false && testimonies && testimonies.length > 0 && (
        <section className="relative mt-24 px-6">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal direction="up">
              <div className="mb-12 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Apa Kata Mereka
                </span>
                <h2 className="font-heading mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  Testimoni Orang Tua & Siswa
                </h2>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Ulasan tulus dari orang tua murid mengenai kualitas pendidikan, pelayanan, dan kenyamanan lingkungan belajar kami.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {testimonies
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((testimony, i) => (
                  <ScrollReveal key={testimony.id} delay={i * 80} direction="up">
                    <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-lg dark:shadow-black/10 flex flex-col justify-between hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300 h-full">
                      <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">
                        &ldquo;{testimony.content}&rdquo;
                      </p>
                      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-white/5 pt-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-sm font-extrabold text-slate-950 shadow-md overflow-hidden flex-shrink-0">
                          {testimony.avatarUrl ? (
                            <Image
                              src={testimony.avatarUrl}
                              alt={testimony.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            testimony.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{testimony.name}</h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{testimony.role}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


