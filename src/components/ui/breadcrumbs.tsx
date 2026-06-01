"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

const labelMap: Record<string, string> = {
  "": "Beranda",
  profile: "Profil",
  programs: "Program",
  guru: "Guru",
  "struktur-organisasi": "Struktur Organisasi",
  faq: "FAQ",
  biaya: "Biaya Pendidikan",
  ppdb: "PPDB",
  news: "Berita",
  announcements: "Pengumuman",
  events: "Acara",
  galeri: "Galeri",
  achievements: "Prestasi",
  extracurriculars: "Ekstrakurikuler",
  "kalender-akademik": "Kalender Akademik",
  kontak: "Kontak",
  unduhan: "Unduhan",
  regulations: "Tata Tertib",
  "virtual-tour": "Virtual Tour",
  instagram: "Instagram",
  "meal-menu": "Menu Makanan",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = useMemo(() => {
    // admin pages don't need breadcrumbs
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
      return null;
    }

    const parts = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];

    for (let i = 0; i < parts.length; i++) {
      const href = "/" + parts.slice(0, i + 1).join("/");
      const segment = parts[i];

      // skip slugs (dynamic segments) — use parent page label
      if (
        i > 0 &&
        segment !== parts[i - 1] &&
        !labelMap[segment] &&
        !labelMap[parts[i - 1]]
      ) {
        continue;
      }

      const label = labelMap[segment];
      if (label) {
        crumbs.push({ label, href });
      }
    }

    return crumbs.length > 1 ? crumbs : null;
  }, [pathname]);

  if (!segments) return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        {segments.map((crumb, index) => (
          <Fragment key={crumb.href}>
            {index > 0 && (
              <span className="mx-1 text-gray-300 dark:text-gray-600" aria-hidden="true">
                /
              </span>
            )}
            {index === segments.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-white">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
