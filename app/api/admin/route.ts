import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get statistics
    const [userCount, urlCount, textCount, fileCount, users, pendingUsers, recentUrls, recentTexts, recentFiles] = await Promise.all([
      prisma.user.count(),
      prisma.url.count(),
      prisma.text.count(),
      prisma.file.count(),
      prisma.user.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          isApproved: true,
          createdAt: true,
          _count: {
            select: {
              urls: true,
              texts: true,
              files: true,
            },
          },
        },
      }),
      prisma.user.findMany({
        where: { isApproved: false },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          isApproved: true,
          createdAt: true,
        },
      }),
      prisma.url.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          shortCode: true,
          originalUrl: true,
          title: true,
          clicks: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
      prisma.text.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          shortCode: true,
          title: true,
          language: true,
          views: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
      prisma.file.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          shortCode: true,
          originalName: true,
          fileSize: true,
          downloads: true,
          createdAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        userCount,
        urlCount,
        textCount,
        fileCount,
        pendingUsersCount: pendingUsers.length,
      },
      users,
      pendingUsers,
      recentUrls,
      recentTexts,
      recentFiles,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch admin data" },
      { status: 500 }
    );
  }
}
