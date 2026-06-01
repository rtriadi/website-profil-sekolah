import { getClasses } from "@/lib/content/classes-service";
import { getTeachers } from "@/lib/content/teachers-service";
import { AdminClassesClient } from "@/components/admin/admin-classes-client";

export default async function AdminClassesPage() {
  const [classes, teachers] = await Promise.all([
    getClasses(),
    getTeachers(),
  ]);

  return <AdminClassesClient classes={classes} teachers={teachers} />;
}
