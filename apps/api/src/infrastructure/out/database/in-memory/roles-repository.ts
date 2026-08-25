import { randomUUID } from "node:crypto";
import type { Role } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  ROLES_REPOSITORY_PORT,
} from "../../../../constants.js";
import { RolesRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type {
  NewRoleInput,
  RolesRepository,
  UpdateRoleInput,
} from "../../../../domain/ports/out/database/roles-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryRolesRepository
  extends BaseAdapter
  implements RolesRepository<MemoryTxContext>
{
  private readonly roles = new Map<string, Role>();

  constructor() {
    super(ROLES_REPOSITORY_PORT, OUTBOUND_DIRECTION, RolesRepositoryError);
  }

  async create(_ctx: MemoryTxContext, input: NewRoleInput): Promise<Role> {
    const now = new Date().toISOString();
    const role: Role = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      permissions: [...input.permissions],
      isSystem: input.isSystem ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.roles.set(role.id, role);
    return role;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Role[]> {
    let matches = [...this.roles.values()];
    if (query) {
      const needle = query.toLowerCase();
      matches = matches.filter((r) => r.name.toLowerCase().includes(needle));
    }
    return matches.slice(offset, offset + limit);
  }

  async getById(_ctx: MemoryTxContext, id: string): Promise<Role | undefined> {
    return this.roles.get(id);
  }

  async findByName(_ctx: MemoryTxContext, name: string): Promise<Role | undefined> {
    const needle = name.toLowerCase();
    for (const role of this.roles.values()) {
      if (role.name.toLowerCase() === needle) {
        return role;
      }
    }
    return undefined;
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateRoleInput,
  ): Promise<Role | undefined> {
    const role = this.roles.get(id);
    if (!role) {
      return undefined;
    }

    const updated: Role = {
      ...role,
      name: input.name ?? role.name,
      description: input.description ?? role.description,
      permissions: input.permissions ?? role.permissions,
      updatedAt: new Date().toISOString(),
    };
    this.roles.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    return this.roles.delete(id);
  }
}
