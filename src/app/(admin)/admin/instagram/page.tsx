import { getInstagramSettings } from "@/lib/content/instagram-service";
import { SaveInstagramForm } from "@/components/admin/admin-instagram-client";

export default async function AdminInstagramPage() {
  const settings = getInstagramSettings();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Instagram Feed</h1>
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6">
        <SaveInstagramForm settings={settings} />
      </div>
    </div>
  );
}
