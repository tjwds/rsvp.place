import { NextResponse } from "next/server";

import { auth, withAuth } from "@/auth";
import { prisma } from "@/db";
import { gravatarUrlForEmail } from "@/app/utils/gravatarUrlForEmail";

export async function GET({ nextUrl }) {
  const session = await auth();

  let userId = nextUrl.pathname.split("/").at(-1).trim();
  const userRecord = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { profile: true },
  });

  if (!userRecord) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  const { name, bio } = userRecord?.profile || {};

  const loggedInUserRecord =
    (session?.user?.email &&
      (await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      }))) ||
    null;
  const loggedInUserClubs = loggedInUserRecord
    ? await prisma.club.findMany({
        where: {
          adminUserIds: {
            has: loggedInUserRecord.id,
          },
        },
      })
    : null;

  const clubsWhereAdmin =
    (await prisma.club.findMany({
      where: {
        adminUserIds: {
          has: userRecord.id,
        },
      },
    })) || [];

  return NextResponse.json({
    message: "ok",
    data: {
      name,
      bio,
      gravatar: gravatarUrlForEmail(userRecord.email),
      thisIsYou: session?.user?.email === userRecord.email,
      clubsWhereAdmin: clubsWhereAdmin.map(({ id, name, slug }) => ({
        name,
        slug,
        id,
      })),
      loggedInUserClubs:
        loggedInUserClubs?.map(({ id, name, slug }) => ({ id, name, slug })) ||
        [],
    },
  });
}

export async function POST(req) {
  const { name, description } = (await req.json()) || {};
  return await withAuth(async ({ user }) => {
    await prisma.profile.upsert({
      where: {
        userId: user.id,
      },
      create: {
        name,
        bio: description,
        userId: user.id,
      },
      update: {
        name,
        bio: description,
      },
    });

    return NextResponse.json({ message: "ok", data: {} });
  });
}
