import { randomUUID } from "node:crypto";
import type { NewUser, UpdateUser, User } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  USERS_REPOSITORY_PORT,
} from "../../../../constants.js";
import { UsersRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { UsersRepository } from "../../../../domain/ports/out/database/users-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryUsersRepository
  extends BaseAdapter
  implements UsersRepository<MemoryTxContext>
{
  private readonly users = new Map<string, User & { passwordHash: string }>();

  constructor() {
    super(USERS_REPOSITORY_PORT, OUTBOUND_DIRECTION, UsersRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewUser & { passwordHash: string },
  ): Promise<User> {
    const now = new Date().toISOString();
    const { passwordHash, ...newUserFields } = input;
    const user: User & { passwordHash: string } = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...newUserFields,
      passwordHash,
    };
    this.users.set(user.id, user);
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    roleId?: string,
    offset = 0,
  ): Promise<User[]> {
    let matches = [...this.users.values()];
    if (roleId) {
      matches = matches.filter((u) => u.roleId === roleId);
    }
    if (query) {
      const needle = query.toLowerCase();
      matches = matches.filter(
        (u) =>
          u.email.toLowerCase().includes(needle) ||
          (u.name && u.name.toLowerCase().includes(needle)),
      );
    }
    return matches
      .slice(offset, offset + limit)
      .map(({ passwordHash: _, ...user }) => user);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async findByEmail(
    _ctx: MemoryTxContext,
    email: string,
  ): Promise<(User & { passwordHash: string }) | undefined> {
    const normalized = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === normalized) {
        return user;
      }
    }
    return undefined;
  }

  async update(
    ctx: MemoryTxContext,
    id: string,
    input: UpdateUser & { passwordHash?: string },
  ): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated: User & { passwordHash: string } = {
      id: user.id,
      name: input.name ?? user.name,
      email: input.email ?? user.email,
      roleId: input.roleId ?? user.roleId,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
      passwordHash: input.passwordHash ?? user.passwordHash,
    };
    this.users.set(id, updated);
    const { passwordHash: _, ...result } = updated;
    return result;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }
    return this.users.delete(id);
  }
}
