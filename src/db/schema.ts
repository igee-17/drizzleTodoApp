import { pgTable, serial, text, date } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: date("updated_at").defaultNow().notNull(),
});

`CREATE TABLE IF NOT EXISTS "todos"(
    "id" serial PRIMARY KEY NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "created_at" timestamp DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NOW()
  )`;
