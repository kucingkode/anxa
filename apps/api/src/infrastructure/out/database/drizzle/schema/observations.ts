import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { patients } from "./patients.js";
import { visits } from "./visits.js";

export const observations = pgTable("observations", {
  id: uuid().primaryKey(),
  patientId: uuid()
    .notNull()
    .references(() => patients.id),
  visitId: uuid()
    .notNull()
    .references(() => visits.id),
  code: text().notNull(),
  codeDisplay: text(),
  value: doublePrecision().notNull(),
  unit: text(),
  status: text({
    enum: [
      "preliminary",
      "final",
      "amended",
      "cancelled",
      "entered-in-error",
    ],
  })
    .notNull()
    .default("preliminary"),
  interpretation: text(),
  version: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
});
