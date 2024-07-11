import crypto from "crypto";

import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { gravatarUrlForEmail } from "@/app/utils/gravatarUrlForEmail";

export async function GET({ nextUrl }) {
  const slug = nextUrl.pathname.split("/").at(-1);
  const club = await prisma.club.findFirst({
    where: {
      slug,
    },
    include: {
      admins: {
        include: { profile: true },
      },
    },
  });

  if (!club) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  const events = await prisma.event.findMany({
    where: {
      clubId: club.id,
    },
  });

  const adminNames = [];
  const adminGravatars = [];
  const adminIds = [];
  club.admins.forEach(({ email, profile, id }) => {
    adminGravatars.push(gravatarUrlForEmail(email.trim()));
    adminNames.push(profile?.name || "an anonymous user");
    adminIds.push(id);
  });

  return NextResponse.json({
    message: "ok",
    data: {
      events: events.map((event) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          location: event.location,
          startTime: event.startTime,
          endTime: event.endTime,
          isCancelled: event.isCancelled,
        };
      }),
      club: {
        name: club.name,
        description: club.description,
        adminNames,
        adminGravatars,
        adminIds,
      },
    },
  });
}
