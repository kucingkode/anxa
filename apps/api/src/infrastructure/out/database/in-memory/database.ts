import { DATABASE_PORT, OUTBOUND_DIRECTION } from "../../../../constants.js";
import { DatabaseError } from "../../../../domain/errors/infrastructure-errors.js";
import type {
  Database,
  TxConfig,
  TxContext,
} from "../../../../domain/ports/out/database/database.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";

export class MemoryDatabase
  extends BaseAdapter
  implements Database<MemoryTxContext>
{
  constructor() {
    super(DATABASE_PORT, OUTBOUND_DIRECTION, DatabaseError);
  }

  async beginTx<T>(fn: (ctx: MemoryTxContext) => Promise<T>): Promise<T> {
    return fn(new MemoryTxContext());
  }
}

export class MemoryTxContext implements TxContext<undefined> {
  readonly tx = undefined;

  async rollback(): Promise<void> {}

  async beginTx(
    fn: (ctx: TxContext<undefined>) => Promise<void>,
    _config: TxConfig,
  ): Promise<void> {
    await fn(this);
  }
}
