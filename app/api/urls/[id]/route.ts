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

    const url = await prisma.url.findUnique({
      where: { shortCode: id },
    });

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL not found" },
        { status: 404 }
      );
    }

    // Check expiration
    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: "URL has expired" },
        { status: 410 }
      );
    }

    // Check password
    if (url.password) {
      if (!password) {
        return NextResponse.json(
          { success: false, requiresPassword: true },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, url.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid password" },
          { status: 401 }
        );
      }
    }

    // Increment clicks
    await prisma.url.update({
      where: { shortCode: id },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      url: {
        originalUrl: url.originalUrl,
        title: url.title,
        createdAt: url.createdAt,
      },
    });
  } catch (error) {
    console.error("Error accessing URL:", error);
    return NextResponse.json(
      { success: false, error: "Failed to access URL" },
      { status: 500 }
    );
  }
}
