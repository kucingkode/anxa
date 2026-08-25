import type { UpdateUser, User } from "@simk/contracts";

export type UpdateUserInput = {
  id: string;
  changes: UpdateUser;
};

export type UpdateUserOutput = User;

export type UpdateUserUseCase = {
  updateUser(input: UpdateUserInput): Promise<UpdateUserOutput>;
};