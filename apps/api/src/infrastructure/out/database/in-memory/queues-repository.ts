import { randomUUID } from "node:crypto";
import type { NewQueue, Queue } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  QUEUES_REPOSITORY_PORT,
} from "../../../../constants.js";
import { QueuesRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { QueuesRepository } from "../../../../domain/ports/out/database/queues-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryQueuesRepository
  extends BaseAdapter
  implements QueuesRepository<MemoryTxContext>
{
  private readonly queues = new Map<string, Queue>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(QUEUES_REPOSITORY_PORT, OUTBOUND_DIRECTION, QueuesRepositoryError);
  }

  async create(_ctx: MemoryTxContext, input: NewQueue): Promise<Queue> {
    const now = new Date().toISOString();
    const queue: Queue = {
      id: randomUUID(),
      patientId: input.patientId,
      status: "waiting",
      version: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.queues.set(queue.id, queue);
    return queue;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    status?: Queue["status"],
    offset = 0,
  ): Promise<Queue[]> {
    const matches = [...this.queues.values()].filter((q) => {
      if (this.deleted.has(q.id)) return false;
      if (patientId && q.patientId !== patientId) return false;
      if (status && q.status !== status) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Queue | undefined> {
    const queue = this.queues.get(id);
    return queue && !this.deleted.has(id) ? queue : undefined;
  }

  async findActiveByPatientId(
    _ctx: MemoryTxContext,
    patientId: string,
  ): Promise<Queue | undefined> {
    for (const queue of this.queues.values()) {
      if (
        !this.deleted.has(queue.id) &&
        queue.patientId === patientId &&
        (queue.status === "waiting" || queue.status === "in-service")
      ) {
        return queue;
      }
    }
    return undefined;
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    status: Queue["status"],
    expectedVersion: number,
    visitId?: string,
  ): Promise<Queue | undefined> {
    const queue = this.queues.get(id);
    if (!queue || this.deleted.has(id) || queue.version !== expectedVersion) {
      return undefined;
    }

    const updated: Queue = {
      ...queue,
      status,
      version: queue.version + 1,
      updatedAt: new Date().toISOString(),
      ...(visitId !== undefined ? { visitId } : {}),
    };
    this.queues.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.queues.has(id) || this.deleted.has(id)) {
      return false;
    }
    this.deleted.add(id);
    return true;
  }
}
