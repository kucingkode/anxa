import type { Role } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type NewRoleInput = {
  name: string;
  description?: string;
  permissions: string[];
  isSystem?: boolean;
};

export type UpdateRoleInput = {
  name?: string;
  description?: string;
  permissions?: string[];
};

export type RolesRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewRoleInput): Promise<Role>;
  list(ctx: TxCtx, limit: number, query?: string, offset?: number): Promise<Role[]>;
  getById(ctx: TxCtx, id: string): Promise<Role | undefined>;
  findByName(ctx: TxCtx, name: string): Promise<Role | undefined>;
  update(ctx: TxCtx, id: string, input: UpdateRoleInput): Promise<Role | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
