import { getPrograms, getFacilities } from "@/lib/content/programs-service";
import { ProgramList } from "@/components/programs/program-list";
import { FacilityList } from "@/components/programs/facility-list";

export default async function ProgramsPage() {
  const [programs, facilities] = await Promise.all([
    getPrograms(),
    getFacilities(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Program & Fasilitas
        </h1>

        <div className="space-y-16">
          <ProgramList programs={programs} />
          <FacilityList facilities={facilities} />
        </div>
      </div>
    </main>
  );
}
