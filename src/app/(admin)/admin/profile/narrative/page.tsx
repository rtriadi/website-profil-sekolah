import { getSchoolNarrative } from "@/lib/content/narrative-service";
import { updateNarrativeAction } from "@/lib/actions/profile-actions";

async function submitNarrative(formData: FormData) {
  "use server";
  await updateNarrativeAction(undefined, formData);
}

export default async function AdminNarrativePage() {
  const narrative = await getSchoolNarrative();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Sejarah, Visi & Misi
      </h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <form action={submitNarrative} className="space-y-5">
          <div>
            <label htmlFor="history" className="mb-1 block text-sm font-medium text-slate-700">
              Sejarah (setiap baris = paragraf baru)
            </label>
            <textarea
              id="history"
              name="history"
              rows={4}
              defaultValue={narrative.history.join("\n")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
          <div>
            <label htmlFor="vision" className="mb-1 block text-sm font-medium text-slate-700">Visi</label>
            <textarea
              id="vision"
              name="vision"
              rows={3}
              defaultValue={narrative.vision}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
          <div>
            <label htmlFor="mission" className="mb-1 block text-sm font-medium text-slate-700">
              Misi (setiap baris = 1 misi)
            </label>
            <textarea
              id="mission"
              name="mission"
              rows={5}
              defaultValue={narrative.mission.join("\n")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
              Simpan
            </button>
            <a href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">Batal</a>
          </div>
        </form>
      </div>
    </div>
  );
}
