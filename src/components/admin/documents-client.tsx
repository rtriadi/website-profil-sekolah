"use client";

import { useActionState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import { uploadDocumentAction, deleteDocumentAction } from "@/lib/actions/document-actions";
import type { SchoolDocument } from "@/lib/content/schema";

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  administrasi: "Administrasi",
  tata_tertib: "Tata Tertib",
  lainnya: "Lainnya",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Props {
  documents: SchoolDocument[];
}

export function AdminDocumentsClient({ documents }: Props) {
  const [state, formAction, pending] = useActionState(uploadDocumentAction, undefined);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dokumen</h1>

      <div className="mb-8 max-w-xl rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Unggah Dokumen</h2>
        <form action={formAction} className="space-y-4">
          <ToastStateWatcher state={state} successMessage="Dokumen berhasil diunggah!" />
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Judul</label>
            <input id="title" name="title" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Deskripsi (opsional)</label>
            <textarea id="description" name="description" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
            <select id="category" name="category" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none">
              {Object.entries(categoryLabel).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file" className="mb-1 block text-sm font-medium text-slate-700">File (PDF, DOC, DOCX, XLS, XLSX — maks 10MB)</label>
            <input id="file" name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200" />
          </div>
          <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
            {pending ? "Mengunggah..." : "Unggah"}
          </button>
        </form>
      </div>

      {documents.length === 0 ? (
        <p className="text-slate-500">Belum ada dokumen.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Judul</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Kategori</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Ukuran</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">File</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
                  <td className="px-4 py-3 text-slate-600">{categoryLabel[doc.category] ?? doc.category}</td>
                  <td className="px-4 py-3 text-slate-600">{formatBytes(doc.fileSize)}</td>
                  <td className="px-4 py-3">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 underline hover:text-slate-900">
                      {doc.filename}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteDocumentAction.bind(null, doc.id)}>
                      <button type="submit" className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">
                        Hapus
                      </button>
                    </form>
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
