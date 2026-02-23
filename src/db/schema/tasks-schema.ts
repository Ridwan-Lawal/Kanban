import { columns } from "@/db/schema/boards-schema";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  columnId: text("column_id")
    .notNull()
    .references(() => columns.id, { onDelete: "cascade" }),
});
