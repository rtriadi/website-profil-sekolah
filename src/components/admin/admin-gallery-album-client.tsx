"use client";

import { useActionState, useState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { GalleryAlbum } from "@/lib/content/gallery-album-service";
import { saveAlbumsAction } from "@/lib/actions/gallery-album-actions";

interface Props {
  items: GalleryAlbum[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `album-${Date.now()}-${_counter}`;
}

export function AdminGalleryAlbumClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveAlbumsAction, undefined);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(items);

  function addItem() {
    setAlbums((prev) => [
      ...prev,
      { id: nextId(), name: "", sortOrder: prev.length + 1 },
    ]);
  }

  function removeItem(id: string) {
    setAlbums((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setAlbums((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(albums);
      }}
      className="space-y-4"
    >
      <ToastStateWatcher state={state} successMessage="Album berhasil disimpan!" />
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{albums.length} Album</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-2">
        {albums.map((item) => (
          <div key={item.id} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3">
            <input
              value={item.name}
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              placeholder="Nama album"
              className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
            <input
              type="number"
              value={item.sortOrder}
              onChange={(e) => updateItem(item.id, "sortOrder", e.target.value)}
              className="w-16 rounded-md border border-slate-300 px-2 py-1.5 text-sm text-center"
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
