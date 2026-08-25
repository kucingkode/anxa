import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  code: text().notNull(),
  unit: text().notNull(),
  manufacturerId: uuid("manufacturer_id").notNull(),
  description: text(),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  deletedAt: timestamp({ withTimezone: true, mode: "string" }),
});