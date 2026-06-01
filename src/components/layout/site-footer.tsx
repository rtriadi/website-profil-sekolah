import Link from "next/link";

interface SiteFooterProps {
  schoolName?: string;
}

export function SiteFooter({ schoolName = "Website Profil Sekolah" }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-[10px]">
                🏫
              </span>
              Portal Resmi {schoolName}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Mendidik generasi cerdas, berkarakter unggul, dan siap menyongsong masa depan teknologi berlandaskan nilai-nilai luhur bangsa.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="hover:text-indigo-300 transition-colors">
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-indigo-300 transition-colors">
                  Program Studi & Fasilitas
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-indigo-300 transition-colors">
                  Pengumuman Terbaru
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-slate-200">
              Hubungi Kami
            </h4>
            <p className="text-sm leading-relaxed text-slate-400">
              Temukan informasi pendaftaran (PPDB), kerja sama, atau pertanyaan umum.
            </p>
            <div className="pt-1">
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white hover:bg-white/10 transition-all hover:border-sky-400"
              >
                Hubungi Kami &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs">
          <p>&copy; {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white transition-colors">
              CMS Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

