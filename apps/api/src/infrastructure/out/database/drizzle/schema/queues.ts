import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";

export const queues = pgTable("queues", {
  id: uuid().primaryKey(),
  patientId: uuid()
    .notNull()
    .references(() => patients.id),
  visitId: uuid(),
  status: text({ enum: ["waiting", "in-service", "done", "cancelled"] })
    .notNull()
    .default("waiting"),
  version: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  deletedAt: timestamp({ withTimezone: true, mode: "date" }),
});
