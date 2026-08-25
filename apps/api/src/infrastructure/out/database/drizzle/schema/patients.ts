import { date, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const patients = pgTable(
  "patients",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    identifier: text().notNull(),
    gender: text({ enum: ["male", "female", "other", "unknown"] }).notNull(),
    birthDate: date({ mode: "string" }),
    phone: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    deletedAt: timestamp({ withTimezone: true, mode: "string" }),
  },
  (t) => [uniqueIndex("uq_patients_identifier").on(t.identifier)],
);
