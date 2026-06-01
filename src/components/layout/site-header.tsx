"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profile", label: "Profil" },
  { href: "/ppdb", label: "PPDB" },
  { href: "/programs", label: "Program & Fasilitas" },
  { href: "/guru", label: "Guru" },
  { href: "/struktur-organisasi", label: "Struktur" },
  { href: "/galeri", label: "Galeri" },
  { href: "/announcements", label: "Pengumuman" },
  { href: "/events", label: "Acara" },
  { href: "/unduhan", label: "Unduhan" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <header className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-lg shadow-xl shadow-slate-950/20">
        <div className="flex items-center justify-between px-6 py-3.5">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <span className="h-6.5 w-6.5 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-xs text-slate-950 shadow-md">
              🏫
            </span>
            <span className="bg-gradient-to-r from-white via-indigo-200 to-sky-300 bg-clip-text text-transparent">
              Profil Sekolah
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          <nav className="hidden sm:flex sm:items-center sm:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px mx-auto h-[2px] w-4 rounded-full bg-gradient-to-r from-indigo-400 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/5 sm:hidden max-h-[70vh] overflow-y-auto">
            <div className="space-y-1 px-4 pb-4 pt-2.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
