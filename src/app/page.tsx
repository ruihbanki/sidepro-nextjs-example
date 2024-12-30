"use client";

import { fetcher } from "@/lib/fetcher";
import { Todo } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [title, setTitle] = useState("");

  const {
    data: todos = [],
    isLoading,
    mutate,
  } = useSWR<Todo[]>("/api/todos", fetcher);

  const addTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: "desc",
        status: "pending",
        priority: 1,
        due_date: new Date().toISOString(),
      }),
    });
    setTitle("");
    await mutate();
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await mutate();
  };

  const completeTodo = async (id: number) => {
    await fetch("/api/todos/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "completed" }),
    });
    await mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="w-[600px] mx-auto my-10">
        <h1 className="text-6xl mb-3 text-center">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="mb-8 text-center">Powered by SidePro</p>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            className="px-4 py-3 text-gray-200 bg-gray-900 rounded-md mb-4 w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button
            className="bg-gray-200 rounded-md p-2 w-[100px] text-gray-800 mb-10"
            onClick={() => addTodo()}
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2 rounded-md">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`flex border border-gray-700 rounded-md ${
                todo.status === "completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              <div className="flex-none w-14 px-2 py-4 text-gray-300">
                <button onClick={() => completeTodo(todo.id)}>Complete</button>
              </div>
              <div className="flex-1 px-8 py-4 text-white">{todo.title}</div>
              <div className="flex-none w-14 px-2 py-4 text-gray-300">
                <button onClick={() => deleteTodo(todo.id)}>Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
