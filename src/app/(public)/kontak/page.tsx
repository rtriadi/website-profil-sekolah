import { getContactInfo } from "@/lib/content/contact-service";
import { getSchoolProfile } from "@/lib/content/profile-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
};

export default async function ContactPage() {
  const contact = getContactInfo();
  const profile = await getSchoolProfile();
  const a = contact.address;

  const fullAddress = [a.street, a.village, a.district, a.city, a.province]
    .filter(Boolean)
    .join(", ");

  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Kontak & Lokasi
          </h1>
          <p className="mt-2 text-slate-600">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Alamat</h2>
                <p className="mt-1 text-slate-600">
                  {fullAddress}
                  <br />
                  {a.postalCode && <>Kode Pos {a.postalCode}</>}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Telepon & Email
                </h2>
                <div className="mt-1 space-y-1 text-slate-600">
                  <p>
                    <span className="font-medium text-slate-700">Telp:</span>{" "}
                    {contact.phone}
                  </p>
                  {contact.whatsapp && (
                    <p>
                      <span className="font-medium text-slate-700">WA:</span>{" "}
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {contact.whatsapp}
                      </a>
                    </p>
                  )}
                  {contact.email && (
                    <p>
                      <span className="font-medium text-slate-700">Email:</span>{" "}
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {contact.email}
                      </a>
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-slate-700">Website:</span>{" "}
                    <a
                      href={`https://${profile.identity.name.toLowerCase().replace(/\s+/g, "")}.sch.id`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {profile.identity.name.toLowerCase().replace(/\s+/g, "")}
                      .sch.id
                    </a>
                  </p>
                </div>
              </div>

              {contact.operatingHours.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Jam Operasional
                  </h2>
                  <div className="mt-2 divide-y divide-slate-100">
                    {contact.operatingHours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between py-1.5 text-sm"
                      >
                        <span className="text-slate-700">{h.day}</span>
                        <span className="text-slate-500">
                          {h.isClosed
                            ? "Libur"
                            : `${h.open} – ${h.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(contact.socialMedia.instagram ||
                contact.socialMedia.facebook ||
                contact.socialMedia.youtube) && (
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Ikuti Kami
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {contact.socialMedia.instagram && (
                      <a
                        href={contact.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700 hover:bg-pink-100"
                      >
                        Instagram
                      </a>
                    )}
                    {contact.socialMedia.facebook && (
                      <a
                        href={contact.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                      >
                        Facebook
                      </a>
                    )}
                    {contact.socialMedia.youtube && (
                      <a
                        href={contact.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                      >
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              {contact.mapsEmbedUrl ? (
                <div
                  className="overflow-hidden rounded-lg border border-slate-200"
                  dangerouslySetInnerHTML={{ __html: contact.mapsEmbedUrl }}
                />
              ) : (
                <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
                  <p className="text-sm text-slate-400">
                    Peta belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
