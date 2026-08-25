import { sql, type ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle, type NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type { ConnectionOptions } from "node:tls";
import { DATABASE_PORT, OUTBOUND_DIRECTION } from "../../../../constants.js";
import { ServiceUnavailableError } from "../../../../domain/errors/domain/service-unavailable-error.js";
import { DatabaseError } from "../../../../domain/errors/infrastructure-errors.js";
import type {
  Database,
  TxContext,
  TxConfig,
} from "../../../../domain/ports/out/database/database.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import * as schema from "./schema.js";
import { PG_CONNECTION_FAILED_ERROR } from "./utils/db-error-codes.js";
import { pgMapper } from "./utils/db-error-mapper.js";

export type DrizzleDatabaseParams = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
};

export class DrizzleDatabase
  extends BaseAdapter
  implements Database<DrizzleTxContext>
{
  public readonly db: ReturnType<typeof this.createDrizzle>;

  constructor(private readonly params: DrizzleDatabaseParams) {
    super(DATABASE_PORT, OUTBOUND_DIRECTION, DatabaseError);

    this.db = this.createDrizzle();
  }

  async ping(): Promise<void> {
    await this.call(
      () => this.db.execute(sql`SELECT 1`),
      "Database ping failed",
    );
  }

  async beginTx<T>(
    fn: (ctx: DrizzleTxContext) => Promise<T>,
    config?: TxConfig,
  ): Promise<T> {
    let result: T;

    await this.call(
      () =>
        this.db.transaction(async (tx) => {
          const txContext = new DrizzleTxContext(tx);
          result = await fn(txContext);
        }, config),
      "beginTx: Transaction failed",
      pgMapper({
        [PG_CONNECTION_FAILED_ERROR]: () =>
          new ServiceUnavailableError("Database unavailable"),
      }),
    );

    return result!;
  }

  async migrate() {
    await migrate(this.db, { migrationsFolder: "./drizzle" });
  }

  private createDrizzle() {
    const ssl: ConnectionOptions | undefined = this.params.ssl
      ? { rejectUnauthorized: false }
      : undefined;

    return drizzle({
      connection: {
        host: this.params.host,
        port: this.params.port,
        user: this.params.user,
        password: this.params.password,
        database: this.params.database,
        ssl,
      },
      casing: "snake_case",
      schema,
    });
  }
}

export class DrizzleTxContext implements TxContext<DrizzleTx> {
  constructor(readonly tx: DrizzleTx) {}

  async rollback(): Promise<void> {
    this.tx.rollback();
  }

  async beginTx(fn: (ctx: TxContext<DrizzleTx>) => Promise<void>) {
    return this.tx.transaction(async (tx) => {
      const txContext = new DrizzleTxContext(tx);
      await fn(txContext);
    });
  }
}

export type DrizzleTx = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
