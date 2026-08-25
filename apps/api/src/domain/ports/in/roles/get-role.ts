import type { Role } from "@simk/contracts";

export type GetRoleInput = {
  id: string;
};

export type GetRoleOutput = Role;

export type GetRoleUseCase = {
  getRole(input: GetRoleInput): Promise<GetRoleOutput>;
};
