import { NextResponse } from "next/server";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

export async function POST(req) {
  const clubId = req.nextUrl.pathname.split("/").at(-2);
  const { user: userId, makeAdmin } = (await req.json()) || {};
  if (!userId) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    // is the logged-in user allowed to make this change?
    const club = await prisma.club.findFirst({ where: { id: clubId } });

    if (!club.adminUserIds.includes(user.id)) {
      console.log(2, club.adminUserIds, user.id);
      // TODO use the right one here
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    let newAdminUserIds = club.adminUserIds;

    if (makeAdmin) {
      if (!newAdminUserIds.includes(userId)) {
        newAdminUserIds.push(userId);
      }
    } else if (newAdminUserIds.length !== 1) {
      newAdminUserIds = newAdminUserIds.filter((id) => id !== userId);
    }

    await prisma.club.update({
      where: {
        id: club.id,
      },
      data: {
        adminUserIds: newAdminUserIds,
      },
    });

    return NextResponse.json({ message: "ok", data: {} });
  });
}
