import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export async function GET() {
  try {
    const result = await query<Todo>("SELECT * FROM todos");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, priority, due_date } = body;

    if (!title || !priority) {
      return NextResponse.json(
        { error: "Title and Priority are required" },
        { status: 400 }
      );
    }

    const result = await query<Todo>(
      `INSERT INTO todos (title, description, status, priority, due_date)
       VALUES ($1, $2, 'pending', $3, $4) RETURNING *`,
      [title, description, priority, due_date]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
