import type { StaffSession } from "@/lib/auth/config";
import { clearSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

interface Props {
  session: StaffSession;
  children: React.ReactNode;
}

export function AdminShell({ session, children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <nav className="flex w-60 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-sm font-bold text-white">
            {session.name?.charAt(0) ?? "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {session.name}
            </p>
            <p className="truncate text-xs text-slate-500">{session.email}</p>
          </div>
        </div>

        <div className="flex-1 px-3 py-4">
          <a
            href="/admin"
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Dashboard
          </a>
        </div>

        <div className="border-t border-slate-200 px-3 py-3">
          <form
            action={async () => {
              "use server";
              await clearSession();
              redirect("/admin/login");
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Keluar
            </button>
          </form>
        </div>
      </nav>

      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
