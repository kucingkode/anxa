import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";
import { visits } from "./visits.js";

export const procedures = pgTable("procedures", {
  id: uuid().primaryKey(),
  patientId: uuid()
    .notNull()
    .references(() => patients.id),
  visitId: uuid()
    .notNull()
    .references(() => visits.id),
  code: text().notNull(),
  codeDisplay: text(),
  status: text(),
  performedAt: timestamp({ withTimezone: true, mode: "date" }),
  notes: text(),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  deletedAt: timestamp({ withTimezone: true, mode: "date" }),
});
