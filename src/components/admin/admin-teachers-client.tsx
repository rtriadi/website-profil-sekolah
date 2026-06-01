"use client";

import { useActionState, useState } from "react";
import {
  createTeacherAction,
  deleteTeacherAction,
  updateTeacherAction,
} from "@/lib/actions/teacher-actions";
import type { Teacher } from "@/lib/content/schema";

interface Props {
  teachers: Teacher[];
}

export function AdminTeachersClient({ teachers }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createState, createAction, createPending] = useActionState(
    createTeacherAction,
    undefined,
  );
  type ActionState = { fieldErrors?: Record<string, string>; error?: string; success?: boolean };

  const [updateState, updateAction, updatePending] = useActionState(
    async (prev: unknown, formData: FormData): Promise<ActionState> => {
      if (!editingId) return {};
      return updateTeacherAction(editingId, prev, formData);
    },
    undefined,
  );

  const activeState = editingId ? updateState : createState;
  const activeAction = editingId ? updateAction : createAction;
  const activePending = editingId ? updatePending : createPending;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Data Guru</h1>

      <div className="mb-8 max-w-xl rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {editingId ? "Edit Guru" : "Tambah Guru"}
        </h2>
        <form action={activeAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Nama Lengkap</label>
            <input id="name" name="name" defaultValue={editingId ? teachers.find(t => t.id === editingId)?.name : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
            {activeState?.fieldErrors?.name && <p className="mt-1 text-xs text-red-500">{activeState.fieldErrors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nip" className="mb-1 block text-sm font-medium text-slate-700">NIP</label>
              <input id="nip" name="nip" defaultValue={editingId ? teachers.find(t => t.id === editingId)?.nip : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">Kelas</label>
              <input id="subject" name="subject" defaultValue={editingId ? teachers.find(t => t.id === editingId)?.subject : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
              {activeState?.fieldErrors?.subject && <p className="mt-1 text-xs text-red-500">{activeState.fieldErrors.subject}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="position" className="mb-1 block text-sm font-medium text-slate-700">Jabatan</label>
            <input id="position" name="position" defaultValue={editingId ? teachers.find(t => t.id === editingId)?.position : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="photoUrl" className="mb-1 block text-sm font-medium text-slate-700">Foto URL (opsional)</label>
            <input id="photoUrl" name="photoUrl" type="url" placeholder="https://..." defaultValue={editingId ? teachers.find(t => t.id === editingId)?.photoUrl : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Keterangan (opsional)</label>
            <textarea id="description" name="description" rows={2} defaultValue={editingId ? teachers.find(t => t.id === editingId)?.description : ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          </div>
          {activeState?.error && <p className="text-sm text-red-500">{activeState.error}</p>}
          {activeState?.success && (
            <p className="text-sm text-emerald-600">
              {editingId ? "Data guru berhasil diperbarui!" : "Guru berhasil ditambahkan!"}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button type="submit" disabled={activePending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
              {activePending ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah"}
            </button>
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {teachers.length === 0 ? (
        <p className="text-slate-500">Belum ada data guru.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Nama</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">NIP</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Kelas</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Jabatan</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                  <td className="px-4 py-3 text-slate-600">{t.nip}</td>
                  <td className="px-4 py-3 text-slate-600">{t.subject}</td>
                  <td className="px-4 py-3 text-slate-600">{t.position}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(t.id)}
                        className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </button>
                      <form action={deleteTeacherAction.bind(null, t.id)}>
                        <button type="submit" className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
