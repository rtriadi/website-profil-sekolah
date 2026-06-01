/**
 * Authentication configuration baseline for admin area.
 *
 * Defines staff role assumptions and a protected-route guard
 * primitive for the `/admin` namespace.  No database coupling —
 * the guard receives an auth session object determined by the
 * caller (e.g. a middleware or server component).
 */

export enum StaffRole {
  Admin = "admin",
  Editor = "editor",
}

export interface StaffSession {
  authenticated: boolean;
  userId?: string;
  role?: StaffRole;
  name?: string;
  email?: string;
}

export interface AuthConfig {
  adminPrefix: string;
  signInPath: string;
  defaultRedirect: string;
}

export const authConfig: AuthConfig = {
  adminPrefix: "/admin",
  signInPath: "/admin/sign-in",
  defaultRedirect: "/admin/dashboard",
};

/**
 * Returns true when the session represents an authenticated staff member
 * with at least the given minimum role.
 */
export function isAuthenticated(
  session: StaffSession,
  minimumRole: StaffRole = StaffRole.Editor,
): boolean {
  if (!session.authenticated || !session.role) return false;

  const hierarchy: Record<StaffRole, number> = {
    [StaffRole.Editor]: 1,
    [StaffRole.Admin]: 2,
  };

  return hierarchy[session.role] >= hierarchy[minimumRole];
}

/**
 * Checks whether the given pathname falls under the admin namespace.
 * Useful for middleware-level route matching.
 */
export function isAdminRoute(
  pathname: string,
  prefix: string = authConfig.adminPrefix,
): boolean {
  return pathname.startsWith(prefix);
}
