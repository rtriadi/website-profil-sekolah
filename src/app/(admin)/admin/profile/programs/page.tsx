import { getPrograms } from "@/lib/content/programs-service";
import { AdminProgramsClient } from "@/components/admin/programs-editor";

export default async function AdminProgramsPage() {
  const programs = await getPrograms();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Program Keahlian
      </h1>
      <div className="max-w-lg">
        <AdminProgramsClient programs={programs} />
      </div>
    </div>
  );
}
