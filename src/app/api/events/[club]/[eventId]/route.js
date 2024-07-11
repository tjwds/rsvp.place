import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { auth } from "@/auth";
import { gravatarUrlForEmail } from "@/app/utils/gravatarUrlForEmail";

export async function GET({ nextUrl }) {
  const eventId = nextUrl.pathname.split("/").at(-1);
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      club: true,
      RSVPs: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  const session = await auth();
  const user =
    session &&
    (await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clubsWhereAdmin: true },
    }));

  const userIsAdmin = user && event.club.adminUserIds.includes(user.id);
  const userIsAttending =
    user && !userIsAdmin && event.RSVPs.some((RSVP) => RSVP.userId === user.id);

  const {
    title,
    description,
    location,
    address,
    latitude,
    longitude,
    startTime,
    endTime,
    id,
    isCancelled,
  } = event;

  const attendees = [];
  if (userIsAdmin) {
    event.RSVPs.forEach(({ user }) => {
      attendees.push({
        name: user.profile?.name || "Anonymous user",
        gravatar: gravatarUrlForEmail(user.email),
        id: user.id,
      });
    });
  }

  return NextResponse.json({
    message: "ok",
    data: {
      id,
      title,
      description,
      location,
      address,
      latitude,
      longitude,
      startTime,
      endTime,
      userIsAdmin,
      userIsAttending,
      clubName: event.club.name,
      attendees,
      isCancelled,
    },
  });
}
