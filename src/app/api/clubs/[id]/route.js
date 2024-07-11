import { NextResponse } from "next/server";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

export async function GET({ nextUrl }) {
  const clubId = nextUrl.pathname.split("/").at(-1);
  return await withAuth(async ({ user }) => {
    const club = await prisma.club.findFirst({
      where: {
        slug: clubId,
        adminUserIds: {
          has: user.id,
        },
      },
    });

    if (!club) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    return NextResponse.json({
      message: "ok",
      data: {
        name: club.name,
        description: club.description,
        slug: club.slug,
      },
    });
  });
}
