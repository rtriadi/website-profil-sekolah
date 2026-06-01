import { getOrgStructure } from "@/lib/content/org-service";
import { AdminOrgClient } from "@/components/admin/admin-org-client";

export default function AdminOrgPage() {
  const org = getOrgStructure();
  return <AdminOrgClient initialMembers={org.members} />;
}
