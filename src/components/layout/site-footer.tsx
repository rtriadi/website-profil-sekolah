import Link from "next/link";
import { getSchoolProfile } from "@/lib/content/profile-service";
import { getContactInfo } from "@/lib/content/contact-service";
import { Phone, Mail, MapPin, Award, Shield, ExternalLink } from "lucide-react";

export async function SiteFooter() {
  const [profile, contact] = await Promise.all([
    getSchoolProfile(),
    getContactInfo(),
  ]);

  const schoolName = profile.identity.name;
  const address = contact.address;
  const fullAddress = [
    address.street,
    address.village,
    address.district,
    address.city,
    address.province,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const hasSocialMedia =
    contact.socialMedia.instagram ||
    contact.socialMedia.facebook ||
    contact.socialMedia.youtube;

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#050810] text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Shield className="h-4 w-4 text-white" />
              </span>
              <span className="font-heading text-base font-bold text-slate-900 dark:text-white tracking-tight">
                {schoolName}
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs">
              Mendidik generasi cerdas, berkarakter unggul, dan siap menyongsong masa depan teknologi berlandaskan nilai-nilai luhur bangsa.
            </p>

            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2.5">
              <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Terakreditasi {profile.accreditation.rating}
                </p>
                <p className="text-[9px] text-slate-500 dark:text-slate-500">
                  {profile.accreditation.institution} · s.d. {new Date(profile.accreditation.validUntil).getFullYear()}
                </p>
              </div>
            </div>

            {/* Social Media */}
            {hasSocialMedia && (
              <div className="flex items-center gap-2">
                {contact.socialMedia.instagram && (
                  <a
                    href={contact.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-pink-500 hover:border-pink-200 dark:hover:border-pink-500/30 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all"
                    aria-label="Instagram"
                  >
                    {/* Instagram SVG */}
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {contact.socialMedia.facebook && (
                  <a
                    href={contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                    aria-label="Facebook"
                  >
                    {/* Facebook SVG */}
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {contact.socialMedia.youtube && (
                  <a
                    href={contact.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                    aria-label="YouTube"
                  >
                    {/* YouTube SVG */}
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/profile", label: "Profil & Visi Misi" },
                { href: "/programs", label: "Program & Fasilitas" },
                { href: "/guru", label: "Guru & Staf" },
                { href: "/announcements", label: "Pengumuman Terbaru" },
                { href: "/ppdb", label: "PPDB Online" },
                { href: "/galeri", label: "Galeri Kegiatan" },
                { href: "/kontak", label: "Kontak & Lokasi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors hover:translate-x-0.5 inline-block duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Kontak Kami
            </h4>
            <ul className="space-y-3">
              {fullAddress && (
                <li className="flex items-start gap-2.5 text-sm">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {fullAddress}
                  </span>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-2.5 text-sm">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="text-slate-500 dark:text-slate-400 text-xs hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2.5 text-sm">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-500 dark:text-slate-400 text-xs hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            <Link
              href="/kontak"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs font-semibold tracking-wide text-slate-700 dark:text-white shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:border-indigo-500 dark:hover:border-sky-400"
            >
              <ExternalLink className="h-3 w-3" />
              Lihat Peta Lokasi
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 dark:border-white/5 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} {schoolName}. Hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <span className="text-slate-300 dark:text-slate-700">NPSN: {profile.identity.npsn}</span>
            <Link href="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              CMS Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
