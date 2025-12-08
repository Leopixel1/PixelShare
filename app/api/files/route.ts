import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const password = formData.get("password") as string | null;
    const expiresAt = formData.get("expiresAt") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const shortCode = nanoid(8);
    const fileExtension = path.extname(file.name);
    const fileName = `${shortCode}${fileExtension}`;
    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, fileName);

    // Ensure uploads directory exists
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(filePath, buffer);

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const fileRecord = await prisma.file.create({
      data: {
        shortCode,
        originalName: file.name,
        fileName,
        fileSize: file.size,
        mimeType: file.type,
        password: hashedPassword,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json({
      success: true,
      shortCode: fileRecord.shortCode,
      shortUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/file/${fileRecord.shortCode}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        shortCode: true,
        originalName: true,
        fileSize: true,
        mimeType: true,
        createdAt: true,
        downloads: true,
        expiresAt: true,
      },
    });

    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
