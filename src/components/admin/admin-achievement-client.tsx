"use client";

import { useActionState, useState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { Achievement } from "@/lib/content/schema";
import { saveAchievementsAction } from "@/lib/actions/achievement-actions";

interface Props {
  items: Achievement[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `ach-${Date.now()}-${_counter}`;
}

export function AdminAchievementClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveAchievementsAction, undefined);
  const [achievements, setAchievements] = useState<Achievement[]>(items);

  function addItem() {
    setAchievements((prev) => [
      ...prev,
      {
        id: nextId(),
        title: "",
        description: "",
        date: "",
        category: "non-akademik",
        sortOrder: prev.length + 1,
      },
    ]);
  }

  function removeItem(id: string) {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setAchievements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(achievements);
      }}
      className="space-y-4"
    >
      <ToastStateWatcher state={state} successMessage="Prestasi berhasil disimpan!" />
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{achievements.length} Prestasi</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {achievements.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.title}
                    onChange={(e) => updateItem(item.id, "title", e.target.value)}
                    placeholder="Judul prestasi"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateItem(item.id, "date", e.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>
                <select
                  value={item.category}
                  onChange={(e) => updateItem(item.id, "category", e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                >
                  <option value="akademik">Akademik</option>
                  <option value="non-akademik">Non-Akademik</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="Deskripsi (opsional)"
              rows={2}
              className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <p className="text-sm text-slate-400">Belum ada prestasi.</p>
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
