import { NextResponse } from "next/server";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

export async function POST(req) {
  const {
    title,
    description,
    startTime,
    endTime,
    slug,
    location,
    id,
    lat,
    long,
    address,
  } = (await req.json()) || {};
  if (
    !title ||
    !description ||
    isNaN(new Date(startTime).getTime()) ||
    isNaN(new Date(endTime).getTime()) ||
    !slug ||
    !location ||
    // Event ids are MongoDB ObjectIds; anything else would make Prisma throw.
    typeof id !== "string" ||
    !/^[0-9a-f]{24}$/i.test(id)
  ) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    const club = await prisma.club.findUnique({
      where: {
        slug,
      },
    });

    if (!club || !club.adminUserIds.includes(user.id)) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    const originalEvent = await prisma.event.findUnique({
      where: { id },
    });

    // The caller is an admin of `slug`'s club; the event must belong to it.
    if (!originalEvent || originalEvent.clubId !== club.id) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    const event = await prisma.event.update({
      where: { id, clubId: club.id },
      data: {
        title,
        description,
        startTime,
        endTime,
        location,
        latitude: lat ? Number(lat) : undefined,
        longitude: long ? Number(long) : undefined,
        address: address || undefined,
      },
      // TODO do I need to, like, log who did what or something?  idk.
    });
    return NextResponse.json({ message: "ok", data: event.id });
  });
}
