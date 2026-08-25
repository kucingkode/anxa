import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";

export const followUpVisits = pgTable("follow_up_visits", {
  id: uuid().primaryKey(),
  patientId: uuid()
    .notNull()
    .references(() => patients.id),
  date: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  status: text({
    enum: ["booked", "arrived", "fulfilled", "cancelled", "noshow"],
  })
    .notNull()
    .default("booked"),
  reason: text(),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
});
