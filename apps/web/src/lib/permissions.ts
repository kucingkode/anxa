import type { AuthUser } from "@simk/contracts";

export function hasPermission(user: AuthUser | null | undefined, permission: string): boolean {
  return Boolean(user?.role.permissions.includes(permission));
}
