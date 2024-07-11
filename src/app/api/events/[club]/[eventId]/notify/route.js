import { withAuth } from "@/auth";

import { NextResponse } from "next/server";

export async function POST(req) {
  const eventId = req.nextUrl.pathname.split("/").at(-2).trim();
  const { message } = (await req.json()) || {};

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
      RSVPs: true,
    },
  });

  if (!event || !message) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    if (!event.club.adminUserIds.includes(user.id)) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    const recipientIds = new Set();
    event.RSVPs.forEach(({ userId }) => recipientIds.add(userId));
    event.club.adminUserIds.forEach((id) => recipientIds.add(id));

    recipientIds.forEach(async (recipientId) => {
      const thread = await prisma.notificationThread.create({
        data: {
          participatingUserIds: [recipientId],
        },
      });

      const createdMessage = await prisma.notificationMessage.create({
        data: {
          sentByUserId: user.id,
          sentForClubId: event.club.id,

          content: message,

          notificationThreadId: thread.id,
        },
      });
    });

    return NextResponse.json({ message: "ok", data: {} });
  });
}
