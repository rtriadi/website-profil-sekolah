import { getDocuments } from "@/lib/content/documents-service";
import { AdminDocumentsClient } from "@/components/admin/documents-client";

export default function AdminDocumentsPage() {
  const documents = getDocuments();

  return <AdminDocumentsClient documents={documents} />;
}
