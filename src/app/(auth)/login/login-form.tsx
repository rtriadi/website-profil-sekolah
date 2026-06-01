"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "./actions";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await signIn(formData);
      if (result.success) {
        router.push(redirectTo);
      } else {
        setErrorMsg(result.error ?? "Gagal masuk. Silakan periksa kembali email & kata sandi Anda.");
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan koneksi server. Coba beberapa saat lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert Display */}
      {errorMsg && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-xs font-semibold text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="text-base leading-none">⚠️</span>
          <div className="flex-1 leading-normal">{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Email
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base pointer-events-none text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
              📧
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nama@sekolah.sch.id"
              className="block w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Kata Sandi
            </label>
          </div>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base pointer-events-none text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
              🔑
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="block w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 pl-10 pr-11 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              tabIndex={-1}
            >
              <span className="text-base select-none">{showPassword ? "👁️" : "🙈"}</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center items-center rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 px-4 py-3.5 text-sm font-bold text-white dark:text-slate-950 shadow-lg hover:shadow-xl dark:shadow-none transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Menghubungkan...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span>Masuk Portal</span>
              <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
