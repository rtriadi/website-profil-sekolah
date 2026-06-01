import type { SchoolProfile } from "@/lib/content/schema";

interface Props {
  profile: SchoolProfile;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-base text-slate-900">{value}</dd>
    </div>
  );
}

export function IdentitySection({ profile }: Props) {
  const { identity, address, contact, accreditation } = profile;

  return (
    <section aria-labelledby="heading-identity">
      <h2
        id="heading-identity"
        className="mb-4 text-xl font-semibold text-slate-900"
      >
        Identitas Sekolah
      </h2>

      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <DetailItem label="Nama Sekolah" value={identity.name} />
        <DetailItem label="NPSN" value={identity.npsn} />
        <DetailItem label="Status" value={identity.status} />
        <DetailItem label="Tanggal Berdiri" value={identity.foundedDate} />
        <div className="sm:col-span-2">
          <DetailItem label="Kepala Sekolah" value={identity.principalName} />
        </div>
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-slate-900">
        Alamat
      </h3>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <DetailItem label="Jalan" value={address.street} />
        <DetailItem label="Kelurahan" value={address.village} />
        <DetailItem label="Kecamatan" value={address.district} />
        <DetailItem label="Kota" value={address.city} />
        <DetailItem label="Provinsi" value={address.province} />
        <DetailItem label="Kode Pos" value={address.postalCode} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-slate-900">
        Kontak
      </h3>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <DetailItem label="Telepon" value={contact.phone} />
        <DetailItem label="Email" value={contact.email} />
        <div className="sm:col-span-2">
          <DetailItem label="Website" value={contact.website} />
        </div>
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-slate-900">
        Akreditasi
      </h3>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <DetailItem label="Peringkat" value={accreditation.rating} />
        <DetailItem label="Lembaga" value={accreditation.institution} />
        <DetailItem
          label="Nomor Sertifikat"
          value={accreditation.certificateNumber}
        />
        <DetailItem
          label="Berlaku Sampai"
          value={accreditation.validUntil}
        />
      </div>
    </section>
  );
}
