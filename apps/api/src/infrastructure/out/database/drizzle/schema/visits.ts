import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";

export const visits = pgTable("visits", {
  id: uuid().primaryKey(),
  patientId: uuid()
    .notNull()
    .references(() => patients.id),
  status: text({
    enum: [
      "planned",
      "arrived",
      "triaged",
      "in-progress",
      "finished",
      "cancelled",
    ],
  }).notNull(),
  class: text().notNull(),
  periodStart: timestamp({ withTimezone: true, mode: "date" }),
  periodEnd: timestamp({ withTimezone: true, mode: "date" }),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
});
