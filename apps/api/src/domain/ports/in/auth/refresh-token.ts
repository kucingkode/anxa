import type { AuthUser } from "@simk/contracts";

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenOutput = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type RefreshTokenUseCase = {
  refreshToken(input: RefreshTokenInput): Promise<RefreshTokenOutput>;
};
