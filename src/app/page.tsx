"use client";

import { fetcher } from "@/lib/fetcher";
import { Todo } from "@/types";
import useSWR from "swr";

export default function Home() {
  const { data: todos = [], isLoading } = useSWR<Todo[]>("/api/todos", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="container mx-auto my-10">
        <h1 className="text-6xl mb-3 text-center">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="mb-8 text-center">Powered by SidePro</p>
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-8 py-4">Title</th>
              <th className="px-8 py-4">Description</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Priority</th>
              <th className="px-8 py-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo) => (
              <tr
                key={todo.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-8 py-4 text-white">{todo.title}</td>
                <td className="px-8 py-4 text-gray-400">
                  {todo.description || "N/A"}
                </td>
                <td
                  className={`px-8 py-4 ${
                    todo.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {todo.status}
                </td>
                <td className="px-8 py-4 text-gray-300">{todo.priority}</td>
                <td className="px-8 py-4 text-gray-300">
                  {todo.due_date
                    ? new Date(todo.due_date).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
