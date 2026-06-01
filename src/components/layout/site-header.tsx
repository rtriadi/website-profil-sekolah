"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const directLinks = [
  { href: "/", label: "Beranda" }
];

const menuGroups = [
  {
    key: "akademik",
    label: "Profil & Akademik",
    items: [
      { href: "/profile", label: "Profil Sekolah" },
      { href: "/guru", label: "Guru & Staf" },
      { href: "/struktur-organisasi", label: "Struktur Organisasi" },
      { href: "/programs", label: "Program & Fasilitas" },
      { href: "/regulations", label: "Tata Tertib" },
      { href: "/kalender-akademik", label: "Kalender Akademik" },
      { href: "/faq", label: "FAQ Sekolah" },
      { href: "/kontak", label: "Kontak & Lokasi" },
    ],
  },
  {
    key: "kesiswaan",
    label: "Kesiswaan & Galeri",
    items: [
      { href: "/galeri", label: "Galeri Kegiatan" },
      { href: "/achievements", label: "Prestasi Siswa" },
      { href: "/extracurriculars", label: "Ekstrakurikuler" },
      { href: "/instagram", label: "Instagram" },
    ],
  },
  {
    key: "layanan",
    label: "Layanan & Info",
    items: [
      { href: "/ppdb", label: "PPDB (Siswa Baru)" },
      { href: "/biaya", label: "Biaya Sekolah" },
      { href: "/meal-menu", label: "Menu Makanan" },
      { href: "/news", label: "Berita" },
      { href: "/virtual-tour", label: "Virtual Tour" },
      { href: "/announcements", label: "Pengumuman" },
      { href: "/events", label: "Acara" },
      { href: "/unduhan", label: "Unduhan Dokumen" },
    ],
  },
];

interface SiteHeaderProps {
  menuSettings?: Record<string, boolean>;
}

export function SiteHeader({ menuSettings = {} }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const toggleMobileGroup = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => menuSettings[item.href] !== false),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <header className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-950/75 backdrop-blur-xl shadow-2xl shadow-slate-950/40">
        <div className="flex items-center justify-between px-6 py-3.5">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-xs text-slate-950 shadow-md">
              🏫
            </span>
            <span className="bg-gradient-to-r from-white via-indigo-200 to-sky-300 bg-clip-text text-transparent">
              Profil Sekolah
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Navigation Links with dropdowns */}
            <nav className="hidden md:flex md:items-center md:gap-2">
              {/* Direct Links (e.g. Beranda) */}
              {directLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-px mx-auto h-[2px] w-4 rounded-full bg-gradient-to-r from-indigo-400 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    )}
                  </Link>
                );
              })}

              {/* Dropdown Groups */}
              {visibleGroups.map((group) => {
                const isOpen = activeDropdown === group.key;
                const hasActiveChild = group.items.some((item) => pathname === item.href);

                return (
                  <div
                    key={group.key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(group.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : group.key)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
                        hasActiveChild
                          ? "text-white bg-white/10"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{group.label}</span>
                      <svg
                        className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Dropdown Content */}
                    {isOpen && (
                      <div className="absolute left-0 top-full z-50 pt-2 w-60 origin-top-left">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/95 p-2 backdrop-blur-xl shadow-2xl shadow-black/60 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`block rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
                                    isActive
                                      ? "bg-indigo-500/10 text-indigo-300"
                                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <ThemeToggle variant="public" />

            {/* Mobile Menu Toggle button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors md:hidden"
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
          </div>
        </div>

        {/* Mobile Sidebar/Menu overlay */}
        {menuOpen && (
          <nav className="border-t border-white/5 md:hidden max-h-[75vh] overflow-y-auto scrollbar-thin">
            <div className="space-y-1.5 px-4 pb-5 pt-3">
              {/* Beranda Direct Link */}
              {directLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${
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

              {/* Mobile Collapsible Groups */}
              {visibleGroups.map((group) => {
                const isExpanded = !!mobileExpanded[group.key];
                const hasActiveChild = group.items.some((item) => pathname === item.href);

                return (
                  <div key={group.key} className="space-y-1">
                    <button
                      onClick={() => toggleMobileGroup(group.key)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${
                        hasActiveChild
                          ? "text-white bg-white/5"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{group.label}</span>
                      <svg
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="pl-4 space-y-1 border-l border-white/5 ml-4 my-1">
                        {group.items.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                                isActive
                                  ? "bg-indigo-500/10 text-indigo-300"
                                  : "text-slate-400 hover:text-white"
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
