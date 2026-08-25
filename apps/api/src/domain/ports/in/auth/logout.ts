export type LogoutInput = {
  accessToken?: string;
  refreshToken?: string;
};

export type LogoutOutput = void;

export type LogoutUseCase = {
  logout(input: LogoutInput): Promise<LogoutOutput>;
};
