import type { NewUser, User } from "@simk/contracts";

export type CreateUserInput = NewUser;
export type CreateUserOutput = User;

export type CreateUserUseCase = {
  createUser(input: CreateUserInput): Promise<CreateUserOutput>;
};