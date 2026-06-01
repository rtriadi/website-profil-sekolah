"use client";

import { useActionState } from "react";
import type { ContactInfo, OperatingHour } from "@/lib/content/schema";
import { saveContactAction } from "@/lib/actions/contact-actions";

interface Props {
  contact: ContactInfo;
}

const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const defaultHours: OperatingHour[] = [
  { day: "Senin", open: "07:30", close: "15:30", isClosed: false },
  { day: "Selasa", open: "07:30", close: "15:30", isClosed: false },
  { day: "Rabu", open: "07:30", close: "15:30", isClosed: false },
  { day: "Kamis", open: "07:30", close: "15:30", isClosed: false },
  { day: "Jumat", open: "07:30", close: "15:30", isClosed: false },
  { day: "Sabtu", open: "07:30", close: "12:00", isClosed: false },
  { day: "Minggu", open: "", close: "", isClosed: true },
];

export function AdminContactClient({ contact }: Props) {
  const [state, action, pending] = useActionState(saveContactAction, undefined);

  const hours = contact.operatingHours.length > 0 ? contact.operatingHours : defaultHours;

  return (
    <form action={action} className="space-y-8">
      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="text-sm font-semibold text-slate-900">Alamat</legend>
        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="street" className="mb-1 block text-sm font-medium text-slate-700">Jalan</label>
            <input id="street" name="street" defaultValue={contact.address.street} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            {state?.fieldErrors?.street && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.street}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="village" className="mb-1 block text-sm font-medium text-slate-700">Kelurahan</label>
              <input id="village" name="village" defaultValue={contact.address.village} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="district" className="mb-1 block text-sm font-medium text-slate-700">Kecamatan</label>
              <input id="district" name="district" defaultValue={contact.address.district} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-slate-700">Kota</label>
              <input id="city" name="city" defaultValue={contact.address.city} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              {state?.fieldErrors?.city && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.city}</p>}
            </div>
            <div>
              <label htmlFor="province" className="mb-1 block text-sm font-medium text-slate-700">Provinsi</label>
              <input id="province" name="province" defaultValue={contact.address.province} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-slate-700">Kode Pos</label>
              <input id="postalCode" name="postalCode" defaultValue={contact.address.postalCode} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="text-sm font-semibold text-slate-900">Kontak</legend>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">Telepon</label>
            <input id="phone" name="phone" type="tel" defaultValue={contact.phone} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            {state?.fieldErrors?.phone && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-slate-700">WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="tel" defaultValue={contact.whatsapp} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" type="email" defaultValue={contact.email} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            {state?.fieldErrors?.email && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.email}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="text-sm font-semibold text-slate-900">Google Maps</legend>
        <div className="mt-3">
          <label htmlFor="mapsEmbedUrl" className="mb-1 block text-sm font-medium text-slate-700">Embed URL</label>
          <input id="mapsEmbedUrl" name="mapsEmbedUrl" defaultValue={contact.mapsEmbedUrl} placeholder="<iframe src=... width=... height=... style=...></iframe>" className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono" />
          <p className="mt-1 text-xs text-slate-500">Paste full iframe embed dari Google Maps. Kosongkan jika belum ada.</p>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="text-sm font-semibold text-slate-900">Jam Operasional</legend>
        <div className="mt-3 space-y-2">
          {dayNames.map((day) => {
            const h = hours.find((h) => h.day === day) ?? { day, open: "", close: "", isClosed: true };
            return (
              <div key={day} className="flex items-center gap-3">
                <span className="w-20 text-sm font-medium text-slate-700">{day}</span>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    defaultChecked={!h.isClosed}
                    onChange={(e) => {
                      const row = e.target.closest(".flex");
                      if (row) {
                        const inputs = row.querySelectorAll<HTMLInputElement>("input[type='time']");
                        inputs.forEach((inp) => { inp.disabled = !e.target.checked; });
                      }
                    }}
                  />
                  Buka
                </label>
                <input
                  type="time"
                  defaultValue={h.open}
                  disabled={h.isClosed}
                  className="block w-32 rounded-md border border-slate-300 px-2 py-1.5 text-sm disabled:opacity-40"
                  data-day={day}
                  data-type="open"
                />
                <span className="text-sm text-slate-500">–</span>
                <input
                  type="time"
                  defaultValue={h.close}
                  disabled={h.isClosed}
                  className="block w-32 rounded-md border border-slate-300 px-2 py-1.5 text-sm disabled:opacity-40"
                  data-day={day}
                  data-type="close"
                />
              </div>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="text-sm font-semibold text-slate-900">Sosial Media</legend>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="instagram" className="mb-1 block text-sm font-medium text-slate-700">Instagram</label>
            <input id="instagram" name="instagram" defaultValue={contact.socialMedia.instagram ?? ""} placeholder="https://instagram.com/..." className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="facebook" className="mb-1 block text-sm font-medium text-slate-700">Facebook</label>
            <input id="facebook" name="facebook" defaultValue={contact.socialMedia.facebook ?? ""} placeholder="https://facebook.com/..." className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="youtube" className="mb-1 block text-sm font-medium text-slate-700">YouTube</label>
            <input id="youtube" name="youtube" defaultValue={contact.socialMedia.youtube ?? ""} placeholder="https://youtube.com/..." className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
        </div>
      </fieldset>

      <input type="hidden" name="operatingHours" />

      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{state.error}</div>
      )}
      {state?.success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">Kontak berhasil disimpan!</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          onClick={() => {
            const rows = document.querySelectorAll<HTMLElement>(".flex.items-center.gap-3");
            const hoursData: OperatingHour[] = [];
            rows.forEach((row) => {
              const day = row.querySelector("span")?.textContent ?? "";
              const checkbox = row.querySelector<HTMLInputElement>("input[type='checkbox']");
              const timeInputs = row.querySelectorAll<HTMLInputElement>("input[type='time']");
              hoursData.push({
                day,
                isClosed: !checkbox?.checked,
                open: timeInputs[0]?.value ?? "",
                close: timeInputs[1]?.value ?? "",
              });
            });
            const hidden = document.querySelector<HTMLInputElement>("input[name='operatingHours']");
            if (hidden) hidden.value = JSON.stringify(hoursData);
          }}
          className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
