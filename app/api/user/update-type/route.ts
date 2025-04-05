import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userType } = await request.json();

    if (!userType || !["creator", "advertiser"].includes(userType)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
    }

    // Update user type in database
    await db.execute(
      `UPDATE "user" SET "userType" = '${userType}' WHERE id = '${session.user.id}'`
    );

    return NextResponse.json({
      success: true,
      userType,
      message: `Account type updated to ${userType}`,
    });
  } catch (error) {
    console.error("Error updating user type:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
