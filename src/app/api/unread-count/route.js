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
      data: {
        count: threads.reduce((previous, thread) => {
          const lastMessage = thread.messages.at(-1);

          // +! — casting to an int:  not (if the user has seen it)
          return previous + +!lastMessage.seenByIds.includes(user.id);
        }, 0),
      },
    });
  });
}
