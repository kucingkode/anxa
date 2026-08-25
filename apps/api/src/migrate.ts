import { DrizzleDatabase } from "./infrastructure/out/database/drizzle/database.js";
import { initLogger } from "./observability/logging.js";

initLogger({ logLevel: "info" });

const db = new DrizzleDatabase({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_DATABASE ?? "simk",
  ssl: process.env.DB_SSL === "true",
});

await db.migrate();

process.exit(0);
