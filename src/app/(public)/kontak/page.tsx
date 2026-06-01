import { getContactInfo } from "@/lib/content/contact-service";
import { getSchoolProfile } from "@/lib/content/profile-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
  description: "Hubungi sekolah resmi — alamat, telepon, e-mail, media sosial, dan lokasi peta",
};

export default async function ContactPage() {
  const contact = getContactInfo();
  const profile = await getSchoolProfile();
  
  // Use profile address if available, fallback to contact address
  const hasProfileAddress = profile.address && (profile.address.street || profile.address.city || profile.address.province);
  const a = hasProfileAddress ? profile.address : contact.address;

  // Use profile contact if available, fallback to contact
  const phone = profile.contact?.phone || contact.phone;
  const email = profile.contact?.email || contact.email;
  const websiteUrl = profile.contact?.website || "";

  const displayWebsite = websiteUrl
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "") || `${(profile.identity.shortName || profile.identity.name).toLowerCase().replace(/\s+/g, "")}.sch.id`;
  const linkHref = websiteUrl.startsWith("http") ? websiteUrl : `https://${displayWebsite}`;

  const fullAddress = [a.street, a.village, a.district, a.city, a.province]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Kontak & Lokasi
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Hubungi kami secara langsung atau kunjungi lokasi kampus resmi sekolah kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">Alamat Kampus</h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  📍 {fullAddress}
                  {a.postalCode && <><br /><span className="ml-5 text-xs text-slate-400">Kode Pos {a.postalCode}</span></>}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-3">
                  Telepon & Surel
                </h2>
                <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <p className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                    <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">📞 Telepon</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{phone}</span>
                  </p>
                  {contact.whatsapp && (
                    <p className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">💬 WhatsApp</span>
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {contact.whatsapp}
                      </a>
                    </p>
                  )}
                  {email && (
                    <p className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">✉️ Surel (Email)</span>
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {email}
                      </a>
                    </p>
                  )}
                  <p className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                    <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">🌐 Situs Resmi</span>
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {displayWebsite}
                    </a>
                  </p>
                </div>
              </div>

              {contact.operatingHours.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-3">
                    Jam Layanan Operasional
                  </h2>
                  <div className="divide-y divide-slate-100 dark:divide-white/5">
                    {contact.operatingHours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between py-2 text-xs font-semibold uppercase tracking-wider"
                      >
                        <span className="text-slate-500 dark:text-slate-400">{h.day}</span>
                        <span className="text-slate-800 dark:text-slate-200">
                          {h.isClosed ? (
                            <span className="text-red-500 dark:text-red-400">Tutup</span>
                          ) : (
                            `${h.open} – ${h.close}`
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(contact.socialMedia.instagram ||
                contact.socialMedia.facebook ||
                contact.socialMedia.youtube) && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-3">
                    Media Sosial Resmi
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {contact.socialMedia.instagram && (
                      <a
                        href={contact.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-pink-50 dark:bg-pink-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400 border border-pink-100/35 dark:border-pink-500/15 hover:bg-pink-100/60 dark:hover:bg-pink-500/20 active:scale-[0.98] transition-all"
                      >
                        📷 Instagram
                      </a>
                    )}
                    {contact.socialMedia.facebook && (
                      <a
                        href={contact.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-blue-50 dark:bg-blue-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 border border-blue-100/35 dark:border-blue-500/15 hover:bg-blue-100/60 dark:hover:bg-blue-500/20 active:scale-[0.98] transition-all"
                      >
                        👥 Facebook
                      </a>
                    )}
                    {contact.socialMedia.youtube && (
                      <a
                        href={contact.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 border border-red-100/35 dark:border-red-500/15 hover:bg-red-100/60 dark:hover:bg-red-500/20 active:scale-[0.98] transition-all"
                      >
                        🎥 YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-full min-h-[400px] rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900/50 p-2.5 shadow-sm">
              {contact.mapsEmbedUrl ? (
                <div
                  className="w-full h-full min-h-[380px] rounded-xl overflow-hidden shadow-inner border border-slate-100 dark:border-white/5 [&>iframe]:w-full [&>iframe]:h-full"
                  dangerouslySetInnerHTML={{ __html: contact.mapsEmbedUrl }}
                />
              ) : (
                <div className="flex h-full min-h-[380px] items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40">
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Peta lokasi belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
