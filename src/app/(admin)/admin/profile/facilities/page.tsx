import { getFacilities } from "@/lib/content/programs-service";
import { AdminFacilitiesClient } from "@/components/admin/facilities-editor";

export default async function AdminFacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Fasilitas
      </h1>
      <div className="max-w-lg">
        <AdminFacilitiesClient facilities={facilities} />
      </div>
    </div>
  );
}
