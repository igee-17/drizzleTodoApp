"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import TodoTable from "@/components/TodoTable";
import TodoModal from "@/components/TodoModal";
import { Todo, NewTodo } from "@/db/types";
import Loader from "@/components/Loader";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Todo List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
      <TodoTable
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />
      {isModalOpen && (
        <TodoModal
          todo={currentTodo}
          onSave={handleSaveTodo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
}
