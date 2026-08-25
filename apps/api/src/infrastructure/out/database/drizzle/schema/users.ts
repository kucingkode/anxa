import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey(),
    name: text(),
    email: text().notNull(),
    passwordHash: text("password_hash").notNull(),
    roleId: uuid("role_id").notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => [uniqueIndex("uq_users_email").on(t.email)],
);
