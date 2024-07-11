import { withAuth } from "@/auth";

import { NextResponse } from "next/server";

export async function GET({ nextUrl }) {
  const threadId = nextUrl.pathname.split("/").at(-1);
  return await withAuth(async ({ user }) => {
    const thread = await prisma.notificationThread.findFirst({
      where: {
        id: threadId,
      },
      orderBy: [{ lastActivity: "asc" }],
      include: {
        messages: {
          include: {
            sentBy: { include: { profile: true } },
            sentForClub: true,
          },
        },
      },
    });

    if (!thread || !thread.participatingUserIds.includes(user.id)) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    const data = [];

    for (let i = 0; i < thread.messages.length; i++) {
      const message = thread.messages[i];

      let senderName = "Anonymous user";

      if (message.sentForClub) {
        senderName = message.sentForClub.name;
      } else if (message.sentBy.profile?.name) {
        senderName = message.sentBy.profile.name;
      }

      const seen = message.seenByIds.includes(user.id);

      if (!seen) {
        await prisma.notificationMessage.update({
          where: {
            id: message.id,
          },
          data: {
            seenByIds: [...message.seenByIds, user.id],
          },
        });
      }

      data.push({
        id: message.id,
        sentAt: message.sentAt,
        content: message.content,
        senderName,
        seen,
      });
    }

    return NextResponse.json({
      message: "ok",
      data,
    });
  });
}
