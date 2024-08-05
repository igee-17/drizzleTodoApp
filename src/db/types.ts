import { InferModel } from "drizzle-orm";
import { todos } from "./schema";

export type Todo = InferModel<typeof todos>;
export type NewTodo = InferModel<typeof todos, "insert">;
