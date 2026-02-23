import { db } from "@/db";
import { isDBError } from "@/utils/db-utils";
import { checkIfUserIsAuthenticated } from "@/utils/verify-user-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await checkIfUserIsAuthenticated();
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  //   db query

  try {
    const data = await db.query.boards.findMany({
      where: (boards, { eq }) => eq(boards.userId, user.id),
      orderBy: (boards, { desc }) => [desc(boards.createdAt)],
      with: {
        columns: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[BOARDS_GET_ERROR]:", error);

    if (isDBError(error)) {
      if (error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED") {
        return NextResponse.json(
          { success: false, message: "Connection timed out. Please check your internet." },
          { status: 504 },
        );
      }

      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "This board name already exists." },
          { status: 409 }, // Conflict
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching your boards.",
      },
      { status: 500 },
    );
  }
}
