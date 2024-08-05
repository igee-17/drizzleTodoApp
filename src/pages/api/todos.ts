import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import { todos } from "@/db/schema";
import { Todo, NewTodo } from "@/db/types";
import { eq } from "drizzle-orm/expressions";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: true,
});

const db = drizzle(pool);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await pool.connect();
  try {
    switch (req.method) {
      case "GET":
        const allTodos: Todo[] = await db.select().from(todos);
        return res.status(200).json(allTodos);
      case "POST":
        const { title, description } = req.body as NewTodo;
        const newTodo: Todo[] = await db
          .insert(todos)
          .values({ title, description })
          .returning();
        return res.status(201).json(newTodo[0]);
      case "PUT":
        const { id, ...updateData } = req.body;
        const updatedTodo: Todo[] = await db
          .update(todos)
          .set({ ...updateData, updatedAt: new Date() })
          .where(eq(todos.id, id))
          .returning();
        return res.status(200).json(updatedTodo[0]);
      case "DELETE":
        const { id: deleteId } = req.body as { id: number };
        await db.delete(todos).where(eq(todos.id, deleteId));
        return res.status(204).end();
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  } finally {
    client.release();
  }
}
