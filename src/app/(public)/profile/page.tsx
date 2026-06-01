import { getSchoolProfile, getSchoolNarrative } from "@/lib/content/profile-service";
import { IdentitySection } from "@/components/profile/identity-section";
import { NarrativeSection } from "@/components/profile/narrative-section";

export default async function ProfilePage() {
  const [profile, narrative] = await Promise.all([
    getSchoolProfile(),
    getSchoolNarrative(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Profil Sekolah
        </h1>

        <div className="space-y-12">
          <IdentitySection profile={profile} />
          <NarrativeSection narrative={narrative} />
        </div>
      </div>
    </main>
  );
}
