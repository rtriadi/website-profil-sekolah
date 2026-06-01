import { getRegulations } from "@/lib/content/regulation-service";
import { AdminRegulationClient } from "@/components/admin/admin-regulation-client";

export default async function AdminRegulationsPage() {
  const items = getRegulations();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Tata Tertib & Kebijakan</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminRegulationClient items={items} />
      </div>
    </div>
  );
}
