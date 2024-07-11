import { NextResponse } from "next/server";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

export async function GET() {
  return await withAuth(async ({ user }) => {
    const clubs = await prisma.club.findMany({
      where: {
        adminUserIds: {
          has: user.id,
        },
      },
    });

    return NextResponse.json({
      message: "ok",
      data: clubs.map((club) => {
        const { name, description, verified, slug } = club;
        return { name, description, verified, slug };
      }),
    });
  });
}
