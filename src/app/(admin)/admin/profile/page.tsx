import { getSchoolProfile } from "@/lib/content/profile-service";
import { updateProfileAction } from "@/lib/actions/profile-actions";
import { ProfileForm } from "@/components/admin/profile-form";

export default async function AdminProfilePage() {
  const profile = await getSchoolProfile();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Profil Sekolah
      </h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <ProfileForm profile={profile} action={updateProfileAction} />
      </div>
    </div>
  );
}
