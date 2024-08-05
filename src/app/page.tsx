"use client";
import Head from "next/head";
import TodoTable from "@/components/TodoTable";
import TodoModal from "@/components/TodoModal";
import Loader from "@/components/Loader";
import { useTodo } from "@/hooks/useTodo";
import { useEffect } from "react";

export default function Home() {
  const {
    todos,
    isLoading,
    currentTodo,
    isModalOpen,
    fetchTodos,
    handleAddTodo,
    handleEditTodo,
    handleSaveTodo,
    handleDeleteTodo,
    setIsModalOpen,
  } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, []);

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
