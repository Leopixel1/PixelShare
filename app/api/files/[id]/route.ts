import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { readFile } from "fs/promises";
import path from "path";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { password } = body;

    const file = await prisma.file.findUnique({
      where: { shortCode: id },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Check expiration
    if (file.expiresAt && new Date(file.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: "File has expired" },
        { status: 410 }
      );
    }

    // Check password
    if (file.password) {
      if (!password) {
        return NextResponse.json(
          { success: false, requiresPassword: true },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, file.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid password" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      file: {
        originalName: file.originalName,
        fileName: file.fileName,
        fileSize: file.fileSize,
        mimeType: file.mimeType,
        createdAt: file.createdAt,
      },
    });
  } catch (error) {
    console.error("Error accessing file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to access file" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const file = await prisma.file.findUnique({
      where: { shortCode: id },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Check expiration
    if (file.expiresAt && new Date(file.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: "File has expired" },
        { status: 410 }
      );
    }

    // Increment downloads
    await prisma.file.update({
      where: { shortCode: id },
      data: { downloads: { increment: 1 } },
    });

    const filePath = path.join(process.cwd(), "uploads", file.fileName);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `attachment; filename="${file.originalName}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download file" },
      { status: 500 }
    );
  }
}
