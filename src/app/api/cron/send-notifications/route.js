import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { prisma } from "@/db";

const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

export async function GET(req) {
  // Get the list of people we need to notify
  const unnotifiedMessages = await prisma.notificationMessage.findMany({
    where: {
      notifiedForExternally: false,
    },
    include: {
      thread: {
        include: {
          participatingUsers: { include: { userNotification: true } },
        },
      },
    },
  });

  let notifiedUsers = new Set();
  let idToUser = {};

  for (let i = 0; i < unnotifiedMessages.length; i++) {
    const unnotifiedMessage = unnotifiedMessages[i];
    console.log("check", unnotifiedMessage);
    const checkMessage = await prisma.notificationMessage.findFirst({
      where: { id: unnotifiedMessage.id },
    });
    if (checkMessage.notifiedForExternally) {
      continue;
    }

    const participatingUsers = unnotifiedMessage.thread.participatingUsers;

    for (let j = 0; j < participatingUsers.length; j++) {
      const participatingUser = participatingUsers[j];

      if (unnotifiedMessage.sentByUserId === participatingUser.id) {
        // You don't care about this one, you sent it!
        // TODO: if we implement DMs, will we have that issue there, too?  Hmm.
        continue;
      }

      await prisma.notificationMessage.update({
        where: {
          id: unnotifiedMessage.id,
        },
        data: {
          notifiedForExternally: true,
        },
      });

      if (notifiedUsers.has(participatingUser.id)) {
        continue;
      }
      notifiedUsers.add(participatingUser.id);
      idToUser[participatingUser.id] = participatingUser;

      // this should approximately never happen.
      if (!participatingUser.userNotification) {
        continue;
      }

      if (
        participatingUser.userNotification.lastNotification >
        participatingUser.userNotification.lastSawUser
      ) {
        continue;
      }

      transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: participatingUser.email,
        subject: `[rsvp.place] You have an unread notification`,
        // TODO make this prettier
        html: `Hi,\n\nYou have a new notification on rsvp.place.  Head on over to <a href="https://rsvp.place/notifications">your notifications page</a> to check it out!`,
      });
      console.log("emailed", participatingUser.email);

      await prisma.userNotification.update({
        where: {
          forUserId: participatingUser.id,
        },
        data: {
          lastNotification: new Date(),
        },
      });
    }
  }

  // ok
  return NextResponse.json({
    message: "ok",
    data: {},
  });
}
