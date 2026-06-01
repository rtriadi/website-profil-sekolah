"use client";

import { useActionState, useState } from "react";
import type { NewsArticle } from "@/lib/content/schema";
import { saveNewsAction } from "@/lib/actions/news-actions";
import { ToastStateWatcher } from "@/components/ui/toast";

interface Props {
  items: NewsArticle[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `news-${Date.now()}-${_counter}`;
}

export function AdminNewsClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveNewsAction, undefined);
  const [news, setNews] = useState<NewsArticle[]>(items);

  function addItem() {
    const now = new Date().toISOString().split("T")[0];
    setNews((prev) => [
      ...prev,
      { id: nextId(), slug: "", title: "", content: "", summary: "", author: "Admin", publishedAt: now },
    ]);
  }

  function removeItem(id: string) {
    setNews((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setNews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(news);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{news.length} Berita</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <input
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  placeholder="Judul berita"
                  className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={item.author}
                    onChange={(e) => updateItem(item.id, "author", e.target.value)}
                    placeholder="Penulis"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    type="date"
                    value={item.publishedAt}
                    onChange={(e) => updateItem(item.id, "publishedAt", e.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    value={item.slug}
                    onChange={(e) => updateItem(item.id, "slug", e.target.value)}
                    placeholder="Slug (otomatis)"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>
                <input
                  value={item.summary}
                  onChange={(e) => updateItem(item.id, "summary", e.target.value)}
                  placeholder="Ringkasan singkat"
                  className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />
                <textarea
                  value={item.content}
                  onChange={(e) => updateItem(item.id, "content", e.target.value)}
                  placeholder="Konten berita..."
                  rows={5}
                  className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastStateWatcher state={state} successMessage="Berita berhasil disimpan!" />

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
