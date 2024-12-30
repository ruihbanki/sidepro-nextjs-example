"use client";

import { fetcher } from "@/lib/fetcher";
import { Todo } from "@/types";
import { useState } from "react";
import useSWR from "swr";
import {
  FaCheckCircle,
  FaTrash,
  FaCircle,
  FaCircleNotch,
} from "react-icons/fa";

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

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/todos/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status,
      }),
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
              className={`flex border border-gray-700 rounded-md text-gray-300 ${
                todo.status === "completed" ? "line-through text-gray-600" : ""
              }`}
            >
              <div className="flex justify-center flex-none w-14 px-2 py-4">
                {todo.status === "completed" ? (
                  <button onClick={() => updateStatus(todo.id, "pending")}>
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  </button>
                ) : (
                  <button onClick={() => updateStatus(todo.id, "completed")}>
                    <FaCircle
                      className="text-gray-300 text-2xl"
                      style={{
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "5",
                      }}
                    />
                  </button>
                )}
              </div>
              <div className="flex-1 px-2 py-4 ">{todo.title}</div>
              <div className="flex justify-center flex-none w-14 px-2 py-4">
                <button onClick={() => deleteTodo(todo.id)}>
                  <FaTrash className="text-red-500 text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
