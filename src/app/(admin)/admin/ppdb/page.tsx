import { getPPDBConfig } from "@/lib/content/ppdb-service";
import { AdminPPDBClient } from "@/components/admin/admin-ppdb-client";

export default function AdminPPDBPage() {
  const config = getPPDBConfig();
  return <AdminPPDBClient config={config} />;
}
