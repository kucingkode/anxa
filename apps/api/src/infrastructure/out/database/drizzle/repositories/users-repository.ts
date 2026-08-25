import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import type { NewUser, UpdateUser, User } from "@simk/contracts";
import { OUTBOUND_DIRECTION, USERS_REPOSITORY_PORT } from "../../../../../constants.js";
import { UsersRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { UsersRepository } from "../../../../../domain/ports/out/database/users-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { users } from "../schema.js";

function toUser(row: typeof users.$inferSelect): User {
  return {
    id: row.id,
    name: row.name ?? undefined,
    email: row.email,
    roleId: row.roleId,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleUsersRepository
  extends BaseAdapter
  implements UsersRepository<DrizzleTxContext>
{
  constructor() {
    super(USERS_REPOSITORY_PORT, OUTBOUND_DIRECTION, UsersRepositoryError);
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewUser & { passwordHash: string },
  ): Promise<User> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(users)
      .values({
        id: randomUUID(),
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        roleId: input.roleId,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toUser(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    roleId?: string,
    offset = 0,
  ): Promise<User[]> {
    let where = undefined;

    if (query && roleId) {
      where = and(
        or(ilike(users.name, `%${query}%`), ilike(users.email, `%${query}%`)),
        eq(users.roleId, roleId),
      );
    } else if (query) {
      where = or(
        ilike(users.name, `%${query}%`),
        ilike(users.email, `%${query}%`),
      );
    } else if (roleId) {
      where = eq(users.roleId, roleId);
    }

    const rows = await ctx.tx.query.users.findMany({
      where,
      orderBy: desc(users.createdAt),
      limit,
      offset,
    });

    return rows.map(toUser);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<User | undefined> {
    const row = await ctx.tx.query.users.findFirst({
      where: eq(users.id, id),
    });

    return row ? toUser(row) : undefined;
  }

  async findByEmail(
    ctx: DrizzleTxContext,
    email: string,
  ): Promise<(User & { passwordHash: string }) | undefined> {
    const row = await ctx.tx.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!row) return undefined;

    return {
      ...toUser(row),
      passwordHash: row.passwordHash,
    };
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateUser & { passwordHash?: string },
  ): Promise<User | undefined> {
    const existing = await ctx.tx.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(users)
      .set({
        name: input.name ?? existing.name,
        email: input.email ?? existing.email,
        passwordHash: input.passwordHash ?? existing.passwordHash,
        roleId: input.roleId ?? existing.roleId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return toUser(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return rows.length > 0;
  }
}
