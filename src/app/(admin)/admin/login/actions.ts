"use server";

import { createSession } from "@/lib/auth/session";
import { StaffRole } from "@/lib/auth/config";

interface SignInResult {
  success: boolean;
  error?: string;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@sekolah.sch.id";
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? "admin123";

export async function signIn(formData: FormData): Promise<SignInResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Email atau kata sandi salah" };
  }

  await createSession({
    userId: "1",
    role: StaffRole.Admin,
    name: "Admin Sekolah",
    email,
  });

  return { success: true };
}
