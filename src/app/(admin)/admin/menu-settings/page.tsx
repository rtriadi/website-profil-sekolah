import { getMenuSettingsAsync } from "@/lib/content/menu-service";
import { MenuSettingsForm } from "@/components/admin/menu-settings-form";

export default async function MenuSettingsPage() {
  const settings = await getMenuSettingsAsync();


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Pengaturan Visibilitas Menu</h1>
        <p className="text-xs text-slate-500 font-medium">
          Aktifkan atau nonaktifkan visibilitas link menu di bagian navigasi atas (Site Header) pada frontend publik.
        </p>
      </div>

      <MenuSettingsForm initialSettings={settings} />
    </div>
  );
}
