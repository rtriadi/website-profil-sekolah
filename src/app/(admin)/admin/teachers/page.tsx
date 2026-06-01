import { getTeachers } from "@/lib/content/teachers-service";
import { AdminTeachersClient } from "@/components/admin/admin-teachers-client";

export default function AdminTeachersPage() {
  const teachers = getTeachers();
  return <AdminTeachersClient teachers={teachers} />;
}
