import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const conditionReferences = pgTable(
  "condition_references",
  {
    id: uuid().primaryKey(),
    code: text().notNull(),
    display: text().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => [uniqueIndex("uq_condition_references_code").on(t.code)],
);