import React from "react";
import { Todo } from "@/db/types";
import Loader from "./Loader";

interface TodoTableProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, onEdit, onDelete }) => {
  //   console.log("todos", todos);

  return (
    <table className="min-w-full bg-black">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {todo.title}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {todo.description}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <button
                className="text-blue-600 hover:text-blue-900 mr-2"
                onClick={() => onEdit(todo)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-900"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
