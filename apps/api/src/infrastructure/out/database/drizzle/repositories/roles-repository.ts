import { randomUUID } from "node:crypto";
import { asc, eq, ilike } from "drizzle-orm";
import type { Role } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  ROLES_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { RolesRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type {
  NewRoleInput,
  RolesRepository,
  UpdateRoleInput,
} from "../../../../../domain/ports/out/database/roles-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { roles } from "../schema.js";

function toRole(row: typeof roles.$inferSelect): Role {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    permissions: row.permissions,
    isSystem: row.isSystem,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleRolesRepository
  extends BaseAdapter
  implements RolesRepository<DrizzleTxContext>
{
  constructor() {
    super(ROLES_REPOSITORY_PORT, OUTBOUND_DIRECTION, RolesRepositoryError);
  }

  async create(ctx: DrizzleTxContext, input: NewRoleInput): Promise<Role> {
    const now = new Date();
    const [row] = await ctx.tx
      .insert(roles)
      .values({
        id: randomUUID(),
        name: input.name,
        description: input.description,
        permissions: input.permissions,
        isSystem: input.isSystem ?? false,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return toRole(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Role[]> {
    const rows = await ctx.tx.query.roles.findMany({
      where: query ? ilike(roles.name, `%${query}%`) : undefined,
      orderBy: asc(roles.name),
      limit,
      offset,
    });
    return rows.map(toRole);
  }

  async getById(ctx: DrizzleTxContext, id: string): Promise<Role | undefined> {
    const row = await ctx.tx.query.roles.findFirst({
      where: eq(roles.id, id),
    });
    return row ? toRole(row) : undefined;
  }

  async findByName(ctx: DrizzleTxContext, name: string): Promise<Role | undefined> {
    const row = await ctx.tx.query.roles.findFirst({
      where: eq(roles.name, name),
    });
    return row ? toRole(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateRoleInput,
  ): Promise<Role | undefined> {
    const existing = await ctx.tx.query.roles.findFirst({
      where: eq(roles.id, id),
    });
    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(roles)
      .set({
        name: input.name ?? existing.name,
        description: input.description ?? existing.description,
        permissions: input.permissions ?? existing.permissions,
        updatedAt: new Date(),
      })
      .where(eq(roles.id, id))
      .returning();
    return toRole(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .delete(roles)
      .where(eq(roles.id, id))
      .returning({ id: roles.id });
    return rows.length > 0;
  }
}
