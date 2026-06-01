"use client";

import { useActionState, useState } from "react";
import type { FAQItem } from "@/lib/content/schema";
import { saveFAQAction } from "@/lib/actions/faq-actions";

interface Props {
  items: FAQItem[];
}

const categoryLabels: Record<string, string> = {
  ppdb: "PPDB",
  biaya: "Biaya",
  akademik: "Akademik",
  fasilitas: "Fasilitas",
  lainnya: "Lainnya",
};

let _counter = 0;
function nextId() {
  _counter++;
  return `faq-${Date.now()}-${_counter}`;
}

export function AdminFAQClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveFAQAction, undefined);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(items);

  function addItem() {
    setFaqItems((prev) => [
      ...prev,
      {
        id: nextId(),
        question: "",
        answer: "",
        category: "lainnya",
        sortOrder: prev.length + 1,
      },
    ]);
  }

  function removeItem(id: string) {
    setFaqItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setFaqItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(faqItems);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          {faqItems.length} Pertanyaan
        </h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <input
                value={item.question}
                onChange={(e) => updateItem(item.id, "question", e.target.value)}
                placeholder="Pertanyaan"
                className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium"
              />
              <select
                value={item.category}
                onChange={(e) => updateItem(item.id, "category", e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
              >
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <textarea
              value={item.answer}
              onChange={(e) => updateItem(item.id, "answer", e.target.value)}
              placeholder="Jawaban"
              rows={3}
              className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        ))}
      </div>

      {faqItems.length === 0 && (
        <p className="text-sm text-slate-400">Belum ada pertanyaan. Klik &quot;+ Tambah&quot; untuk mulai.</p>
      )}

      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{state.error}</div>
      )}
      {state?.success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">FAQ berhasil disimpan!</div>
      )}

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
