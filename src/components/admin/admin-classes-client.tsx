"use client";

import { useActionState, useState } from "react";
import {
  createClassAction,
  deleteClassAction,
  updateClassAction,
} from "@/lib/actions/class-actions";
import type { SchoolClass, Teacher } from "@/lib/content/schema";
import { ToastStateWatcher } from "@/components/ui/toast";

interface Props {
  classes: SchoolClass[];
  teachers: Teacher[];
}

export function AdminClassesClient({ classes, teachers }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [createState, createAction, createPending] = useActionState(
    createClassAction,
    undefined,
  );
  
  type ActionState = { fieldErrors?: Record<string, string>; error?: string; success?: boolean };

  const [updateState, updateAction, updatePending] = useActionState(
    async (prev: unknown, formData: FormData): Promise<ActionState> => {
      if (!editingId) return {};
      return updateClassAction(editingId, prev, formData);
    },
    undefined,
  );

  const activeState = editingId ? updateState : createState;
  const activeAction = editingId ? updateAction : createAction;
  const activePending = editingId ? updatePending : createPending;

  const currentClass = editingId ? classes.find((c) => c.id === editingId) : null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Data Kelas</h1>

      <div className="mb-8 max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {editingId ? "Edit Kelas" : "Tambah Kelas"}
        </h2>
        <form action={activeAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Nama Kelas
            </label>
            <input
              id="name"
              name="name"
              defaultValue={currentClass?.name ?? ""}
              placeholder="Contoh: Kelas 1A…"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none focus-visible:ring-indigo-500"
            />
            {activeState?.fieldErrors?.name && (
              <p className="mt-1 text-xs text-red-500">{activeState.fieldErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacherId" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Wali Kelas
              </label>
              <select
                id="teacherId"
                name="teacherId"
                defaultValue={currentClass?.teacherId ?? ""}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
              >
                <option value="">-- Tanpa Wali Kelas --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="roomName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Nama Ruangan
              </label>
              <input
                id="roomName"
                name="roomName"
                defaultValue={currentClass?.roomName ?? ""}
                placeholder="Contoh: Ruang Bougenville…"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentCount" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Jumlah Siswa
              </label>
              <input
                id="studentCount"
                name="studentCount"
                type="number"
                defaultValue={currentClass?.studentCount ?? ""}
                placeholder="Contoh: 25…"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="sortOrder" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Urutan (Sort Order)
              </label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={currentClass?.sortOrder ?? ""}
                placeholder="Contoh: 1…"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Keterangan (opsional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              defaultValue={currentClass?.description ?? ""}
              placeholder="Keterangan singkat mengenai fokus kelas…"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
            />
          </div>

          <ToastStateWatcher
            state={activeState}
            successMessage={editingId ? "Data kelas berhasil diperbarui!" : "Kelas berhasil ditambahkan!"}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={activePending}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 px-6 py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-slate-800 dark:hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              {activePending ? "Menyimpan…" : editingId ? "Simpan Perubahan" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {classes.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">Belum ada data kelas.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Nama Kelas</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Wali Kelas</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Ruangan</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Jumlah Siswa</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Urutan</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/20">
              {classes.map((c) => {
                const teacherName = teachers.find((t) => t.id === c.teacherId)?.name ?? "—";
                return (
                  <tr key={c.id}>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{c.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{teacherName}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.roomName ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.studentCount ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.sortOrder}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(c.id)}
                          className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          Edit
                        </button>
                        <form action={deleteClassAction.bind(null, c.id)}>
                          <button
                            type="submit"
                            className="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20"
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
