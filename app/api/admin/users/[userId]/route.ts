import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId } = params;
    const { isAdmin } = await req.json();

    // Prevent removing admin status from yourself
    if (userId === session.user.id && isAdmin === false) {
      return NextResponse.json(
        { success: false, error: "Cannot remove admin status from yourself" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId } = params;

    // Prevent deleting yourself
    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: "Cannot delete yourself" },
        { status: 400 }
      );
    }

    // Delete user and all their content (cascade delete)
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
