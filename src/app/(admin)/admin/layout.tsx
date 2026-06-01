import { readSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();
  if (!session?.authenticated) {
    redirect("/login");
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
