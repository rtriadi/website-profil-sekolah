import { Suspense } from "react";
import Link from "next/link";
import { getSchoolProfile } from "@/lib/content/profile-service";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const profile = await getSchoolProfile();
  const schoolName = profile?.identity?.name ?? "Sekolah";

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50/50 dark:bg-[#070b15] px-4 overflow-hidden transition-colors duration-300 font-sans">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[450px] w-[450px] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "-3s" }} />

      {/* Back to Home Navigation Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/5 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-md transition-all hover:bg-white dark:hover:bg-white/10 active:scale-95"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-0.5">&larr;</span>
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="relative w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-500">
        {/* Glow behind the card */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-400 opacity-20 dark:opacity-30 blur-lg" />

        <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/85 p-8 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/70">
          
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-2xl shadow-md transition-transform hover:scale-105 active:scale-95">
              🏫
            </div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Masuk Portal
            </h1>
            <p className="mt-2.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none">
              {schoolName}
            </p>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Gunakan akun staf administrasi Anda untuk mengakses panel CMS.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <svg className="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <div className="text-xs font-semibold text-slate-400">Memuat formulir...</div>
            </div>
          }>
            <LoginForm />
          </Suspense>

          {/* Footer Card */}
          <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wide border-t border-slate-100 dark:border-white/5 pt-5">
            &copy; {new Date().getFullYear()} {schoolName} &bull; Keamanan Terjaga
          </div>
        </div>
      </div>
    </main>
  );
}
