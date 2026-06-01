"use client";

import { useActionState } from "react";
import type { SchoolProfile } from "@/lib/content/schema";
import Link from "next/link";

interface Props {
  profile: SchoolProfile;
  action: (
    prev: unknown,
    formData: FormData,
  ) => Promise<{ success?: boolean; error?: string }>;
}

export function ProfileForm({ profile, action }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const p = profile;

  // Custom Input styling constants
  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none placeholder-slate-400 shadow-sm";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";
  const legendClass = "text-base font-bold font-heading text-slate-800 tracking-tight flex items-center gap-2 pb-2 border-b border-slate-100 w-full mb-4";

  return (
    <form action={formAction} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl">
      {/* Identitas Section */}
      <fieldset className="space-y-4">
        <legend className={legendClass}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs text-indigo-600 font-bold">1</span>
          Identitas Sekolah
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>Nama Sekolah</label>
            <input id="name" name="name" defaultValue={p.identity.name} placeholder="Contoh: SMA Unggul Jaya…" autoComplete="organization" className={inputClass} />
          </div>
          <div>
            <label htmlFor="shortName" className={labelClass}>Nama Singkat</label>
            <input id="shortName" name="shortName" defaultValue={p.identity.shortName} placeholder="Contoh: SUJ" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="npsn" className={labelClass}>NPSN</label>
            <input id="npsn" name="npsn" defaultValue={p.identity.npsn} placeholder="Masukkan 8 digit NPSN…" autoComplete="off" className={inputClass} />
          </div>
          <div>
            <label htmlFor="principalName" className={labelClass}>Kepala Sekolah</label>
            <input id="principalName" name="principalName" defaultValue={p.identity.principalName} placeholder="Nama Kepala Sekolah beserta gelar…" autoComplete="name" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="foundedDate" className={labelClass}>Tanggal Berdiri</label>
            <input id="foundedDate" name="foundedDate" type="date" defaultValue={p.identity.foundedDate} className={inputClass} />
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>Status Sekolah</label>
            <select id="status" name="status" defaultValue={p.identity.status} className={inputClass}>
              <option value="Negeri">Negeri</option>
              <option value="Swasta">Swasta</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Alamat Section */}
      <fieldset className="space-y-4 pt-4">
        <legend className={legendClass}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs text-indigo-600 font-bold">2</span>
          Alamat & Lokasi
        </legend>
        <div>
          <label htmlFor="street" className={labelClass}>Nama Jalan & No.</label>
          <input id="street" name="street" defaultValue={p.address.street} placeholder="Contoh: Jl. Sudirman No. 45…" autoComplete="street-address" className={inputClass} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="village" className={labelClass}>Kelurahan</label>
            <input id="village" name="village" defaultValue={p.address.village} placeholder="Kelurahan" className={inputClass} />
          </div>
          <div>
            <label htmlFor="district" className={labelClass}>Kecamatan</label>
            <input id="district" name="district" defaultValue={p.address.district} placeholder="Kecamatan" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className={labelClass}>Kota / Kabupaten</label>
            <input id="city" name="city" defaultValue={p.address.city} placeholder="Kota/Kabupaten" className={inputClass} />
          </div>
          <div>
            <label htmlFor="province" className={labelClass}>Provinsi</label>
            <input id="province" name="province" defaultValue={p.address.province} placeholder="Provinsi" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="postalCode" className={labelClass}>Kode Pos</label>
            <input id="postalCode" name="postalCode" defaultValue={p.address.postalCode} placeholder="Contoh: 10110…" autoComplete="postal-code" className={inputClass} />
          </div>
        </div>
      </fieldset>

      {/* Kontak Section */}
      <fieldset className="space-y-4 pt-4">
        <legend className={legendClass}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs text-indigo-600 font-bold">3</span>
          Kontak Resmi
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>No. Telepon Kantor</label>
            <input id="phone" name="phone" defaultValue={p.contact.phone} placeholder="Contoh: (021) 123456…" autoComplete="tel" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email Instansi</label>
            <input id="email" name="email" type="email" defaultValue={p.contact.email} placeholder="admin@sekolah.sch.id…" autoComplete="email" spellCheck={false} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>Alamat Website</label>
          <input id="website" name="website" type="url" defaultValue={p.contact.website} placeholder="https://sekolah.sch.id…" autoComplete="url" spellCheck={false} className={inputClass} />
        </div>
      </fieldset>

      {/* Akreditasi Section */}
      <fieldset className="space-y-4 pt-4">
        <legend className={legendClass}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs text-indigo-600 font-bold">4</span>
          Akreditasi Nasional
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="accreditationRating" className={labelClass}>Peringkat Nilai</label>
            <input id="accreditationRating" name="accreditationRating" defaultValue={p.accreditation.rating} placeholder="Contoh: A, B, C" className={inputClass} />
          </div>
          <div>
            <label htmlFor="accreditationInstitution" className={labelClass}>Lembaga Penguji</label>
            <input id="accreditationInstitution" name="accreditationInstitution" defaultValue={p.accreditation.institution} placeholder="Contoh: BAN-S/M" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="accreditationCertNumber" className={labelClass}>No. Sertifikat Resmi</label>
            <input id="accreditationCertNumber" name="accreditationCertNumber" defaultValue={p.accreditation.certificateNumber} placeholder="Masukkan nomor sertifikat akreditasi" className={inputClass} />
          </div>
          <div>
            <label htmlFor="accreditationValidUntil" className={labelClass}>Masa Berlaku Akhir</label>
            <input id="accreditationValidUntil" name="accreditationValidUntil" type="date" defaultValue={p.accreditation.validUntil} className={inputClass} />
          </div>
        </div>
      </fieldset>

      {/* Hero Section */}
      <fieldset className="space-y-4 pt-4">
        <legend className={legendClass}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs text-indigo-600 font-bold">5</span>
          Hero Halaman Depan
        </legend>
        <div>
          <label htmlFor="heroBadge" className={labelClass}>Label Badge</label>
          <input id="heroBadge" name="heroBadge" defaultValue={p.heroBadge ?? ""} placeholder="Contoh: Portal Resmi Pendidikan" className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubtitle" className={labelClass}>Subtitle / Deskripsi</label>
          <textarea id="heroSubtitle" name="heroSubtitle" defaultValue={p.heroSubtitle ?? ""} rows={3} placeholder="Teks deskripsi yang muncul di hero homepage" className={inputClass} />
        </div>
      </fieldset>

      {/* Form Submit & Cancel Controls */}
      <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {pending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Menyimpan…
            </>
          ) : (
            "Simpan Profil"
          )}
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all active:scale-[0.98]"
        >
          Batal
        </Link>
      </div>

      {/* Success/Error Alerts */}
      {state?.success && (
        <div className="rounded-xl border border-green-200 bg-green-50/80 p-4 text-sm font-semibold text-green-700 backdrop-blur-sm shadow-sm flex items-center gap-2">
          <span>✅</span> Profil sekolah berhasil diperbarui secara aman!
        </div>
      )}
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm font-semibold text-red-600 backdrop-blur-sm shadow-sm flex items-center gap-2">
          <span>⚠️</span> Gagal menyimpan: {state.error}
        </div>
      )}
    </form>
  );
}

