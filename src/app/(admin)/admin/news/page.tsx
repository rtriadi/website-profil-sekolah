import { getNews } from "@/lib/content/news-service";
import { AdminNewsClient } from "@/components/admin/admin-news-client";

export default async function AdminNewsPage() {
  const items = getNews();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Berita</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminNewsClient items={items} />
      </div>
    </div>
  );
}
