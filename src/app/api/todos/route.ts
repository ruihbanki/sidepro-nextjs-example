import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { Todo } from "@/types";

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
    const { title, priority } = body;

    if (!title || !priority) {
      return NextResponse.json(
        { error: "Title and Priority are required" },
        { status: 400 }
      );
    }

    const result = await query<Todo>(
      `INSERT INTO todos (title, status)
       VALUES ($1, 'pending') RETURNING *`,
      [title]
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

export async function DELETE(req: Request) {
  try {
    // Parse the request body
    const { id } = await req.json();

    console.log("delete todo", id);

    // Validate the input
    if (!id) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Delete the todo from the database
    const result = await query("DELETE FROM todos WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todo deleted successfully",
      todo: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
