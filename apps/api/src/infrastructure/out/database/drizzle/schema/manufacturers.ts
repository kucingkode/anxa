import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const manufacturers = pgTable("manufacturers", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  identifier: text().notNull(),
  contact: text(),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  deletedAt: timestamp({ withTimezone: true, mode: "string" }),
});