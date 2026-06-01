import { getSchoolProfile } from "@/lib/content/profile-service";
import { getSchoolNarrative } from "@/lib/content/narrative-service";
import { IdentitySection } from "@/components/profile/identity-section";
import { NarrativeSection } from "@/components/profile/narrative-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Sekolah",
  description: "Sejarah, visi, misi, dan identitas resmi sekolah.",
};

export default async function ProfilePage() {
  const [profile, narrative] = await Promise.all([
    getSchoolProfile(),
    getSchoolNarrative(),
  ]);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">Profil Sekolah</h1>
          <p className="mt-2 text-center text-slate-300">
            Mengenal lebih dekat visi, misi, sejarah luhur, dan identitas resmi sekolah kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="space-y-12">
            <IdentitySection profile={profile} />
            <NarrativeSection narrative={narrative} />
          </div>
        </div>
      </section>
    </>
  );
}
