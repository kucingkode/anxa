import type { AuthUser } from "@simk/contracts";

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type LoginUseCase = {
  login(input: LoginInput): Promise<LoginOutput>;
};
