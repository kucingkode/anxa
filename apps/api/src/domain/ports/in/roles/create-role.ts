import type { NewRole, Role } from "@simk/contracts";

export type CreateRoleInput = NewRole;
export type CreateRoleOutput = Role;

export type CreateRoleUseCase = {
  createRole(input: CreateRoleInput): Promise<CreateRoleOutput>;
};
