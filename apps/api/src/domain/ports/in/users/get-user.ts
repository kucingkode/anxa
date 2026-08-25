import type { User } from "@simk/contracts";

export type GetUserInput = {
  id: string;
};

export type GetUserOutput = User;

export type GetUserUseCase = {
  getUser(input: GetUserInput): Promise<GetUserOutput>;
};