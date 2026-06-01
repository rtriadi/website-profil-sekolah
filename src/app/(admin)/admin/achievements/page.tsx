import { getAchievements } from "@/lib/content/achievement-service";
import { AdminAchievementClient } from "@/components/admin/admin-achievement-client";

export default async function AdminAchievementsPage() {
  const items = getAchievements();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Prestasi</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminAchievementClient items={items} />
      </div>
    </div>
  );
}
