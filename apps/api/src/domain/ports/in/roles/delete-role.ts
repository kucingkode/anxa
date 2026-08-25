export type DeleteRoleInput = {
  id: string;
};

export type DeleteRoleOutput = void;

export type DeleteRoleUseCase = {
  deleteRole(input: DeleteRoleInput): Promise<DeleteRoleOutput>;
};
