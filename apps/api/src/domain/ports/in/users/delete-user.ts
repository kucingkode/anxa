export type DeleteUserInput = {
  id: string;
  callerId: string;
};

export type DeleteUserOutput = void;

export type DeleteUserUseCase = {
  deleteUser(input: DeleteUserInput): Promise<DeleteUserOutput>;
};