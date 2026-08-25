export const PERMISSION_RESOURCES = [
  "patients",
  "queues",
  "visits",
  "follow-up-visits",
  "observations",
  "conditions",
  "procedures",
  "products",
  "manufacturers",
  "users",
  "condition-references",
  "procedure-references",
  "roles",
] as const;

export const PERMISSION_ACTIONS = ["read", "write", "delete"] as const;

export type PermissionResource = (typeof PERMISSION_RESOURCES)[number];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];
export type Permission = `${PermissionResource}:${PermissionAction}`;

const ALL_PERMISSIONS: Permission[] = PERMISSION_RESOURCES.flatMap((resource) =>
  PERMISSION_ACTIONS.map((action) => `${resource}:${action}` as Permission),
);

export function permission(resource: PermissionResource, action: PermissionAction): Permission {
  return `${resource}:${action}`;
}

export function isPermission(value: string): value is Permission {
  return (ALL_PERMISSIONS as string[]).includes(value);
}

export function allPermissions(): Permission[] {
  return [...ALL_PERMISSIONS];
}
