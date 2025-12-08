import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { z } from "zod";

const textSchema = z.object({
  content: z.string(),
  title: z.string().optional(),
  customSlug: z.string().optional(),
  language: z.string().default("plaintext"),
  password: z.string().optional(),
  expiresAt: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, title, customSlug, language, password, expiresAt } = textSchema.parse(body);

    // Use custom slug if provided, otherwise generate random code
    const shortCode = customSlug || nanoid(8);
    
    // Check if custom slug already exists
    if (customSlug) {
      const existing = await prisma.text.findUnique({
        where: { shortCode: customSlug },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "Custom link already exists" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const text = await prisma.text.create({
      data: {
        shortCode,
        content,
        title,
        language,
        password: hashedPassword,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json({
      success: true,
      shortCode: text.shortCode,
      shortUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/text/${text.shortCode}`,
    });
  } catch (error) {
    console.error("Error creating text:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create text snippet" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const texts = await prisma.text.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        shortCode: true,
        title: true,
        language: true,
        createdAt: true,
        views: true,
        expiresAt: true,
      },
    });

    return NextResponse.json({ success: true, texts });
  } catch (error) {
    console.error("Error fetching texts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch texts" },
      { status: 500 }
    );
  }
}
