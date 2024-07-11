import { withAuth } from "@/auth";

import { NextResponse } from "next/server";

export async function POST(req) {
  const eventId = req.nextUrl.pathname.split("/").at(-2).trim();
  const { cancel } = (await req.json()) || {};

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      club: {
        include: {
          admins: true,
        },
      },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    if (!event.club.adminUserIds.includes(user.id)) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    await prisma.event.update({
      where: {
        id: event.id,
      },
      data: {
        isCancelled: !!cancel,
      },
    });

    return NextResponse.json({ message: "ok", data: {} });
  });
}
