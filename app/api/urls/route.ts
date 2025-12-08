import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { z } from "zod";

const urlSchema = z.object({
  originalUrl: z.string().url(),
  title: z.string().optional(),
  password: z.string().optional(),
  expiresAt: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalUrl, title, password, expiresAt } = urlSchema.parse(body);

    const shortCode = nanoid(8);
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const url = await prisma.url.create({
      data: {
        shortCode,
        originalUrl,
        title,
        password: hashedPassword,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json({
      success: true,
      shortCode: url.shortCode,
      shortUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/url/${url.shortCode}`,
    });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const urls = await prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        shortCode: true,
        title: true,
        createdAt: true,
        clicks: true,
        expiresAt: true,
      },
    });

    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}
