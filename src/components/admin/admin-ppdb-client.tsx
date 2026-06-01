"use client";

import { useActionState, useState } from "react";
import { savePPDBConfigAction } from "@/lib/actions/ppdb-actions";
import type { PPDBConfig, PPDBRequirement, PPDBStep } from "@/lib/content/schema";

interface Props {
  config: PPDBConfig;
}

export function AdminPPDBClient({ config }: Props) {
  const [state, formAction, pending] = useActionState(savePPDBConfigAction, undefined);

  const [requirements, setRequirements] = useState<PPDBRequirement[]>(config.requirements);
  const [steps, setSteps] = useState<PPDBStep[]>(config.steps);
  const [reqForm, setReqForm] = useState({ label: "", description: "" });
  const [stepForm, setStepForm] = useState({ title: "", description: "" });

  function addRequirement() {
    if (!reqForm.label.trim()) return;
    setRequirements((prev) => [...prev, { label: reqForm.label.trim(), description: reqForm.description.trim() || "" }]);
    setReqForm({ label: "", description: "" });
  }

  function removeRequirement(i: number) {
    setRequirements((prev) => prev.filter((_, idx) => idx !== i));
  }

  function addStep() {
    if (!stepForm.title.trim()) return;
    setSteps((prev) => [...prev, { order: prev.length + 1, title: stepForm.title.trim(), description: stepForm.description.trim() || "" }]);
    setStepForm({ title: "", description: "" });
  }

  function removeStep(i: number) {
    setSteps((prev) => prev.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, order: idx + 1 })));
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">PPDB Settings</h1>

      <form action={formAction} className="max-w-2xl space-y-5">
        <input type="hidden" name="requirements" value={JSON.stringify(requirements)} />
        <input type="hidden" name="steps" value={JSON.stringify(steps)} />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked={config.active} className="h-4 w-4 rounded border-slate-300 text-slate-900" />
          <span className="text-sm font-medium text-slate-700">PPDB Aktif</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-slate-700">Tahun Ajaran</label>
            <input id="year" name="year" defaultValue={config.year} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="bannerText" className="mb-1 block text-sm font-medium text-slate-700">Teks Banner (opsional)</label>
            <input id="bannerText" name="bannerText" defaultValue={config.bannerText ?? ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Judul</label>
          <input id="title" name="title" defaultValue={config.title} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          {state?.fieldErrors?.title && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Deskripsi</label>
          <textarea id="description" name="description" rows={3} defaultValue={config.description} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          {state?.fieldErrors?.description && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.description}</p>}
        </div>

        <div>
          <label htmlFor="scheduleText" className="mb-1 block text-sm font-medium text-slate-700">Jadwal</label>
          <textarea id="scheduleText" name="scheduleText" rows={4} defaultValue={config.scheduleText} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          <p className="mt-1 text-xs text-slate-400">Gunakan baris baru untuk setiap item, format bebas</p>
        </div>

        <div>
          <label htmlFor="contact" className="mb-1 block text-sm font-medium text-slate-700">Kontak Panitia</label>
          <textarea id="contact" name="contact" rows={3} defaultValue={config.contact} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </div>

        <div>
          <label htmlFor="registrationLink" className="mb-1 block text-sm font-medium text-slate-700">Link Pendaftaran (opsional)</label>
          <input id="registrationLink" name="registrationLink" defaultValue={config.registrationLink ?? ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Persyaratan</h3>
          <div className="space-y-2 mb-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-2 rounded bg-slate-50 p-2 text-sm">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{r.label}</p>
                  {r.description && <p className="text-xs text-slate-500">{r.description}</p>}
                </div>
                <button type="button" onClick={() => removeRequirement(i)} className="text-xs text-red-500 hover:text-red-700">Hapus</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="Label persyaratan" value={reqForm.label} onChange={(e) => setReqForm((f) => ({ ...f, label: e.target.value }))} className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm" />
            <input placeholder="Deskripsi (opsional)" value={reqForm.description} onChange={(e) => setReqForm((f) => ({ ...f, description: e.target.value }))} className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm" />
            <button type="button" onClick={addRequirement} className="rounded bg-slate-900 px-3 py-1 text-xs text-white">Tambah</button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Tahapan</h3>
          <div className="space-y-2 mb-3">
            {steps.sort((a, b) => a.order - b.order).map((s, i) => (
              <div key={i} className="flex items-start gap-2 rounded bg-slate-50 p-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">{s.order}</span>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500">{s.description}</p>
                </div>
                <button type="button" onClick={() => removeStep(i)} className="text-xs text-red-500 hover:text-red-700">Hapus</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="Judul tahapan" value={stepForm.title} onChange={(e) => setStepForm((f) => ({ ...f, title: e.target.value }))} className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm" />
            <input placeholder="Deskripsi" value={stepForm.description} onChange={(e) => setStepForm((f) => ({ ...f, description: e.target.value }))} className="flex-1 rounded border border-slate-300 px-2 py-1 text-sm" />
            <button type="button" onClick={addStep} className="rounded bg-slate-900 px-3 py-1 text-xs text-white">Tambah</button>
          </div>
        </div>

        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && <p className="text-sm text-emerald-600">PPDB settings berhasil disimpan!</p>}

        <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
          {pending ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </form>
    </div>
  );
}
