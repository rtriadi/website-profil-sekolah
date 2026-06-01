import { getFAQItems } from "@/lib/content/faq-service";
import { AdminFAQClient } from "@/components/admin/admin-faq-client";

export default async function AdminFAQPage() {
  const items = getFAQItems();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">FAQ</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminFAQClient items={items} />
      </div>
    </div>
  );
}
