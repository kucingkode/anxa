export type VerifyTokenInput = {
  accessToken: string;
};

export type VerifyTokenOutput = {
  userId: string;
};

export type VerifyTokenUseCase = {
  verifyToken(input: VerifyTokenInput): Promise<VerifyTokenOutput>;
};
