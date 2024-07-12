import { NextResponse } from "next/server";

import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import EmailProvider from "next-auth/providers/email";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
// This is _absurd_.
import clientPromise from "./mongoClient";
import { prisma } from "./db";

const config = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session && !session.userId) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        session.userId = user.id;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      return token;
    },
  },
};

export const handler = NextAuth(config);

export function auth() {
  return getServerSession(config);
}

export async function withAuth(callback, include) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include,
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const userNotification = await prisma.userNotification.findUnique({
    where: {
      forUserId: user.id,
    },
  });

  if (!userNotification) {
    await prisma.userNotification.create({
      data: {
        forUserId: user.id,
        lastSawUser: new Date(),
      },
    });
  } else {
    await prisma.userNotification.update({
      where: {
        forUserId: user.id,
      },
      data: {
        lastSawUser: new Date(),
      },
    });
  }

  return await callback({ user });
}
