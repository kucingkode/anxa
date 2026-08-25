import type { Role } from "@simk/contracts";

export type ListRolesInput = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ListRolesOutput = Role[];

export type ListRolesUseCase = {
  listRoles(input: ListRolesInput): Promise<ListRolesOutput>;
};
