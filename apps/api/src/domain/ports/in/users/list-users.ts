import type { User } from "@simk/contracts";

export type ListUsersInput = {
  limit?: number;
  offset?: number;
  query?: string;
  roleId?: string;
};

export type ListUsersOutput = User[];

export type ListUsersUseCase = {
  listUsers(input: ListUsersInput): Promise<ListUsersOutput>;
};