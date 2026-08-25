import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const procedureReferences = pgTable(
  "procedure_references",
  {
    id: uuid().primaryKey(),
    code: text().notNull(),
    display: text().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => [uniqueIndex("uq_procedure_references_code").on(t.code)],
);