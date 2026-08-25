import type { Role, UpdateRole } from "@simk/contracts";

export type UpdateRoleInput = {
  id: string;
  changes: UpdateRole;
};

export type UpdateRoleOutput = Role;

export type UpdateRoleUseCase = {
  updateRole(input: UpdateRoleInput): Promise<UpdateRoleOutput>;
};
