import { getMealMenu } from "@/lib/content/meal-service";
import { AdminMealMenuClient } from "@/components/admin/admin-meal-menu-client";

export default async function AdminMealMenuPage() {
  const items = getMealMenu();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Menu Makanan</h1>
      <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminMealMenuClient items={items} />
      </div>
    </div>
  );
}
