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
      <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>:{" "}
            {todo.description || "No description"} (Priority: {todo.priority})
          </li>
        ))}
      </ul>
    </main>
  );
}
