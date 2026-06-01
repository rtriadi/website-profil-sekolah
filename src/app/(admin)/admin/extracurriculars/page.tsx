import { getExtracurriculars } from "@/lib/content/extracurricular-service";
import { AdminExtracurricularClient } from "@/components/admin/admin-extracurricular-client";

export default async function AdminExtracurricularsPage() {
  const items = getExtracurriculars();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Ekstrakurikuler</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminExtracurricularClient items={items} />
      </div>
    </div>
  );
}
