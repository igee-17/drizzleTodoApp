import { useState } from "react";
import { Todo, NewTodo } from "@/db/types";

export const useTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = () => {
    setCurrentTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTodo = async (todo: Todo | NewTodo) => {
    setIsLoading(true);
    try {
      const method = "id" in todo ? "PUT" : "POST";
      const response = await fetch("/api/todos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("Failed to save todo");
      await fetchTodos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todos,
    isModalOpen,
    currentTodo,
    setIsModalOpen,
    isLoading,
    fetchTodos,
    handleAddTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleSaveTodo,
  };
};
