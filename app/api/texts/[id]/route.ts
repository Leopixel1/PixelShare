import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { password } = body;

    const text = await prisma.text.findUnique({
      where: { shortCode: id },
    });

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Text not found" },
        { status: 404 }
      );
    }

    // Check expiration
    if (text.expiresAt && new Date(text.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: "Text has expired" },
        { status: 410 }
      );
    }

    // Check password
    if (text.password) {
      if (!password) {
        return NextResponse.json(
          { success: false, requiresPassword: true },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, text.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid password" },
          { status: 401 }
        );
      }
    }

    // Increment views
    await prisma.text.update({
      where: { shortCode: id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      text: {
        content: text.content,
        title: text.title,
        language: text.language,
        createdAt: text.createdAt,
      },
    });
  } catch (error) {
    console.error("Error accessing text:", error);
    return NextResponse.json(
      { success: false, error: "Failed to access text" },
      { status: 500 }
    );
  }
}
