import { getPrograms, getFacilities } from "@/lib/content/programs-service";
import { ProgramList } from "@/components/programs/program-list";
import { FacilityList } from "@/components/programs/facility-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program & Fasilitas",
  description: "Daftar program unggulan dan fasilitas belajar sekolah.",
};

export default async function ProgramsPage() {
  const [programs, facilities] = await Promise.all([
    getPrograms(),
    getFacilities(),
  ]);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">Program & Fasilitas</h1>
          <p className="mt-2 text-center text-slate-300">
            Daftar program unggulan dan sarana prasarana penunjang belajar mengajar
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="space-y-16">
            <ProgramList programs={programs} />
            <FacilityList facilities={facilities} />
          </div>
        </div>
      </section>
    </>
  );
}
