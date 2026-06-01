import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { StaffSession } from "./config";
import { StaffRole } from "./config";

const SESSION_COOKIE = "admin_session";
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "dev-secret-change-in-production-min-32-chars!",
);

interface SessionPayload {
  userId: string;
  role: StaffRole;
  name: string;
  email: string;
}

export async function createSession(
  payload: SessionPayload,
): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return token;
}

export async function readSession(): Promise<StaffSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      authenticated: true,
      userId: payload.userId as string,
      role: payload.role as StaffRole,
      name: payload.name as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
