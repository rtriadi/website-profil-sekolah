import { getTestimonies } from "@/lib/content/testimony-service";
import { AdminTestimonyClient } from "@/components/admin/admin-testimony-client";

export default async function AdminTestimoniesPage() {
  const items = getTestimonies();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Testimoni</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminTestimonyClient items={items} />
      </div>
    </div>
  );
}
