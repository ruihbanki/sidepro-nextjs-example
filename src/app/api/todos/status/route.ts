import { NextResponse } from "next/server";
import { query } from "../../../../lib/db"; // Adjust the import path if necessary

export async function PATCH(req: Request) {
  try {
    // Parse the request body
    const { id, status } = await req.json();

    // Validate the input
    if (!id || !status) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Update the todo status in the database
    const result = await query(
      "UPDATE todos SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todo status updated",
      todo: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating todo status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
