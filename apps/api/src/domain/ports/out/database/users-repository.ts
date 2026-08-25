import type { NewUser, User, UpdateUser } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type UsersRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: Omit<NewUser, "password"> & { passwordHash: string }): Promise<User>;
  list(ctx: TxCtx, limit: number, query?: string, roleId?: string, offset?: number): Promise<User[]>;
  getById(ctx: TxCtx, id: string): Promise<User | undefined>;
  findByEmail(ctx: TxCtx, email: string): Promise<(User & { passwordHash: string }) | undefined>;
  update(ctx: TxCtx, id: string, input: Omit<UpdateUser, "password"> & { passwordHash?: string }): Promise<User | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
