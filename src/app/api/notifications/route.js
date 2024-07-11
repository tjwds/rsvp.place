import { withAuth } from "@/auth";

import { NextResponse } from "next/server";

export async function GET(req) {
  return await withAuth(async ({ user }) => {
    const threads = await prisma.notificationThread.findMany({
      where: {
        participatingUserIds: { has: user.id },
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

    return NextResponse.json({
      message: "ok",
      data: threads.map((thread) => {
        const lastMessage = thread.messages.at(-1);

        let senderName = "Anonymous user";

        if (lastMessage.sentForClub) {
          senderName = lastMessage.sentForClub.name;
        } else if (lastMessage.sentBy.profile?.name) {
          senderName = lastMessage.sentBy.profile.name;
        }

        return {
          id: thread.id,
          lastActivity: thread.lastActivity,
          senderName,
          preview: lastMessage.content.slice(0, 100),
          read: lastMessage.seenByIds.includes(user.id),
        };
      }),
    });
  });
}
