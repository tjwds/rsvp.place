import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { withAuth } from "@/auth";
import { prisma } from "@/db";

const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
const formatDateForIcs = (date) => {
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
};

export async function POST(req) {
  const { registering } = (await req.json()) || {};
  const [, , , clubId, eventId] = req.nextUrl.pathname.split("/");

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    // TODO input validation
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  return await withAuth(async ({ user }) => {
    const payload = {
      userId: user.id,
      eventId,
    };
    const existingRSVP = await prisma.rSVP.findFirst({
      where: payload,
    });
    if (registering) {
      // uh… do nothing if we've already registered, I guess…
      if (!existingRSVP) {
        const rsvp = await prisma.rSVP.create({
          data: payload,
        });

        transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: `Your RSVP for ${event.title}`,
          // TODO make this prettier
          text: "See you there!",
          icalEvent: {
            filename: "invite.ics",
            method: "request",
            content: `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//rsvp.place//nodemailer//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${rsvp.id}
DTSTAMP:${formatDateForIcs(new Date())}
DTSTART:${formatDateForIcs(event.startTime)}
DTEND:${formatDateForIcs(event.endTime)}
SUMMARY:${event.title}
DESCRIPTION:${process.env.NEXT_PUBLIC_SITE_URL}/events/${clubId}/${event.id}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`,
          },
        });
      }
    } else if (existingRSVP) {
      const rsvp = await prisma.rSVP.delete({
        where: { id: existingRSVP.id },
      });
    }

    // TODO error handling
    return NextResponse.json({
      message: "ok",
      data: {},
    });
  });
}
