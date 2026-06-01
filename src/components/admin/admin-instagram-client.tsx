"use client";

import { useActionState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import { saveInstagramAction } from "@/lib/actions/instagram-actions";
import type { InstagramSettings } from "@/lib/content/instagram-service";

interface Props {
  settings: InstagramSettings;
}

export function SaveInstagramForm({ settings }: Props) {
  const [state, action, pending] = useActionState(saveInstagramAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <ToastStateWatcher state={state} successMessage="Pengaturan disimpan!" />
      <div>
        <label className="block text-sm font-medium text-slate-700">Username Instagram</label>
        <input
          name="handle"
          defaultValue={settings.handle}
          placeholder="cth: sekolahkami"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">URL Profil (opsional)</label>
        <input
          name="url"
          defaultValue={settings.url}
          placeholder="https://www.instagram.com/username/"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
        />
        <p className="mt-1 text-xs text-slate-400">Kosongi untuk menggunakan URL otomatis</p>
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
