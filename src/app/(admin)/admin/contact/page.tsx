import { getContactInfo } from "@/lib/content/contact-service";
import { AdminContactClient } from "@/components/admin/admin-contact-client";

export default async function AdminContactPage() {
  const contact = getContactInfo();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Kontak & Lokasi
      </h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminContactClient contact={contact} />
      </div>
    </div>
  );
}
