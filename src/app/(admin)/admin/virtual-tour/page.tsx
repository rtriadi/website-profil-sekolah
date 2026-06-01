import { getTourSettings } from "@/lib/content/tour-service";
import { TourForm } from "@/components/admin/tour-form";

export default async function AdminVirtualTourPage() {
  const settings = await getTourSettings();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-slate-800 tracking-tight">Virtual Tour 360</h1>
      <div className="max-w-md">
        <TourForm settings={settings} />
      </div>
    </div>
  );
}
