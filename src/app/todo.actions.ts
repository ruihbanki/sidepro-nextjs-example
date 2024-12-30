"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export const deleteTodoFetcher = async (
  url: string,
  { arg: id }: { arg: number }
) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
};
