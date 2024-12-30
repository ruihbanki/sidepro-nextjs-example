"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  due_date: string | null;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/todos");
        const data: Todo[] = await response.json();
        console.log(data);

        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
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
