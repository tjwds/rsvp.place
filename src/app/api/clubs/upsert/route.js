import { NextResponse } from "next/server";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

export async function POST(req) {
  const { name, description, slug, originalSlug } = (await req.json()) || {};
  if (
    !name ||
    name.length > 70 ||
    !description ||
    description.length > 2000 ||
    !slug ||
    slug.match(/[^a-z0-9-]/) ||
    slug.length > 70
  ) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  const slugExists = await prisma.club.findUnique({
    where: {
      slug,
    },
  });

  if (slugExists && slug !== originalSlug) {
    // TODO actually use this!
    return NextResponse.json({ error: "Slug taken" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    if (originalSlug) {
      const originalGroup = await prisma.club.findUnique({
        where: {
          slug: originalSlug,
          adminUserIds: {
            has: user.id,
          },
        },
      });

      if (!originalGroup) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      }

      const club = await prisma.club.update({
        where: { id: originalGroup.id },
        data: {
          name,
          description,
          slug,
        },
      });

      return NextResponse.json({ message: "ok", data: club });
    }

    const club = await prisma.club.create({
      data: { name, description, slug, adminUserIds: [user.id] },
      // TODO do I need to, like, log who did what or something?  idk.
    });
    return NextResponse.json({ message: "ok", data: club });
  });
}
