import { getTuition } from "@/lib/content/tuition-service";
import { AdminTuitionClient } from "@/components/admin/admin-tuition-client";

export default async function AdminTuitionPage() {
  const data = getTuition();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Biaya & SPP</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminTuitionClient data={data} />
      </div>
    </div>
  );
}
