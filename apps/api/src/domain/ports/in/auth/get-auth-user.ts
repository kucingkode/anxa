import type { AuthUser } from "@simk/contracts";

export type GetAuthUserInput = {
  userId: string;
};

export type GetAuthUserOutput = AuthUser;

export type GetAuthUserUseCase = {
  getAuthUser(input: GetAuthUserInput): Promise<GetAuthUserOutput>;
};
