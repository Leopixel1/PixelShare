import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTheme } from "@/lib/themes";

export async function GET(req: NextRequest) {
  try {
    // Get settings or create default if not exists
    let settings = await prisma.settings.findFirst();
    
    if (!settings) {
      settings = await prisma.settings.create({
        data: {},
      });
    }

    const theme = getTheme(settings.theme);

    return NextResponse.json({
      success: true,
      theme,
    });
  } catch (error) {
    console.error("Get theme error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}
