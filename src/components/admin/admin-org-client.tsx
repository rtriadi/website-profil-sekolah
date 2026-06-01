"use client";

import { useActionState, useState } from "react";
import { saveOrgAction } from "@/lib/actions/org-actions";
import type { OrgNode } from "@/lib/content/schema";
import { ToastStateWatcher } from "@/components/ui/toast";

interface Props {
  initialMembers: OrgNode[];
}

let idCounter = 100;

function newId() {
  return `org-${Date.now()}-${++idCounter}`;
}

export function AdminOrgClient({ initialMembers }: Props) {
  const [members, setMembers] = useState<OrgNode[]>(initialMembers);
  const [state, formAction, pending] = useActionState(saveOrgAction, undefined);

  const [form, setForm] = useState({ name: "", position: "", description: "", parentId: "" });

  function addMember() {
    if (!form.name.trim() || !form.position.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: newId(),
        name: form.name.trim(),
        position: form.position.trim(),
        description: form.description.trim() || undefined,
        parentId: form.parentId || null,
        sortOrder: prev.length,
      },
    ]);
    setForm({ name: "", position: "", description: "", parentId: "" });
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white font-heading">Struktur Organisasi</h1>

      <div className="mb-8 max-w-xl rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/50 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white font-heading">Tambah Anggota</h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-white focus:border-slate-900 dark:focus:border-slate-100 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Jabatan</label>
            <input value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-white focus:border-slate-900 dark:focus:border-slate-100 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Keterangan (opsional)</label>
            <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-white focus:border-slate-900 dark:focus:border-slate-100 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Atasan (parent ID - kosongi untuk root)</label>
            <select value={form.parentId} onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))} className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-white focus:border-slate-900 dark:focus:border-slate-100 focus:outline-none">
              <option value="">Puncak / Struktur Tertinggi (Tanpa Atasan)</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.name} — {m.position}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={addMember} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Tambah
          </button>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/40">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-white/10 text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Nama</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Jabatan</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Parent</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-300">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
            {members.map((m) => {
              const parent = members.find((p) => p.id === m.parentId);
              return (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{m.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{m.position}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{parent ? `${parent.name} (${parent.position})` : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => removeMember(m.id)} className="rounded-md bg-red-50 dark:bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20">
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form action={formAction}>
        <input type="hidden" name="members" value={JSON.stringify(members)} />
        <button type="submit" disabled={pending} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md shadow-indigo-600/10">
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
      <ToastStateWatcher state={state} successMessage="Struktur organisasi berhasil disimpan!" />
    </div>
  );
}
