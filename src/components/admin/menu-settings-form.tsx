"use client";

import { updateMenuSettingsAction } from "@/lib/actions/menu-actions";
import { useState, useTransition } from "react";

interface Props {
  initialSettings: Record<string, boolean>;
}

const menuLabels: Record<string, { label: string; category: string }> = {
  "/profile": { label: "Profil Sekolah", category: "Profil & Akademik" },
  "/guru": { label: "Guru & Staf", category: "Profil & Akademik" },
  "/struktur-organisasi": { label: "Struktur Organisasi", category: "Profil & Akademik" },
  "/programs": { label: "Program & Fasilitas", category: "Profil & Akademik" },
  "/regulations": { label: "Tata Tertib", category: "Profil & Akademik" },
  "/galeri": { label: "Galeri Kegiatan", category: "Kesiswaan & Galeri" },
  "/achievements": { label: "Prestasi Siswa", category: "Kesiswaan & Galeri" },
  "/extracurriculars": { label: "Ekstrakurikuler", category: "Kesiswaan & Galeri" },
  "/instagram": { label: "Instagram", category: "Kesiswaan & Galeri" },
  "/ppdb": { label: "PPDB (Siswa Baru)", category: "Layanan & Info" },
  "/biaya": { label: "Biaya Sekolah", category: "Layanan & Info" },
  "/meal-menu": { label: "Menu Makanan", category: "Layanan & Info" },
  "/news": { label: "Berita", category: "Layanan & Info" },
  "/virtual-tour": { label: "Virtual Tour", category: "Layanan & Info" },
  "/announcements": { label: "Pengumuman", category: "Layanan & Info" },
  "/events": { label: "Acara", category: "Layanan & Info" },
  "/unduhan": { label: "Unduhan Dokumen", category: "Layanan & Info" },
  "/kalender-akademik": { label: "Kalender Akademik", category: "Profil & Akademik" },
  "/faq": { label: "FAQ Sekolah", category: "Profil & Akademik" },
  "/kontak": { label: "Kontak & Lokasi", category: "Profil & Akademik" },
  "/testimonies": { label: "Testimoni", category: "Kesiswaan & Galeri" },
};

export function MenuSettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      for (const [key, val] of Object.entries(settings)) {
        formData.append(key, val ? "true" : "false");
      }
      await updateMenuSettingsAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  // Group settings by category
  const categories = Array.from(new Set(Object.values(menuLabels).map((item) => item.category)));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saved && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600 backdrop-blur-md shadow-md animate-in fade-in slide-in-from-top-1 duration-200">
          ✨ Pengaturan visibilitas menu berhasil disimpan dan diterapkan ke frontend!
        </div>
      )}

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-sm font-bold text-slate-800 tracking-wide uppercase border-b border-slate-100 pb-3 mb-4">
              {category}
            </h3>
            <div className="divide-y divide-slate-100">
              {Object.entries(menuLabels)
                .filter(([_, info]) => info.category === category)
                .map(([key, info]) => {
                  const isActive = !!settings[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{info.label}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Jalur rute: {key}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle(key)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isActive ? "bg-indigo-600" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 transition-all"
        >
          {isPending ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}
