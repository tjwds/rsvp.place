"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, CardHeader, Link, Switch } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import { humanReadableDateRange } from "@/app/utils/humanReadableDateRange";

export default function ClubToggles({ slug, events: originalEvents }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(originalEvents);
  const [club, setClub] = useState({});
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((data) => data.json())
      .then((res) => {
        setEvents(res.data.events || []);
        setClub(res.data.club);
        setLoading(false);
      });
  }, [loading]);

  const userIsAdmin = session && club?.adminIds?.includes(session.userId);
  const now = new Date();

  return (
    <>
      <div
        className={
          "flex items-center mb-4 " +
          (userIsAdmin ? "place-content-between" : "place-content-end")
        }
      >
        {userIsAdmin && (
          <div className="space-y-2">
            <Link href={`/events/${slug}/new`} className="pr-2">
              <Button size="sm">Create event</Button>
            </Link>
            <Link href={`/clubs/edit?club=${slug}`}>
              <Button size="sm">Edit club</Button>
            </Link>
          </div>
        )}
        <Switch
          isSelected={showPast}
          onValueChange={setShowPast}
          className="space-y-2"
        >
          Show past events
        </Switch>
      </div>
      <div className="">
        {events.map((event, id) => {
          const start = new Date(event.startTime);
          const inThePast = +start < +now;

          // always show it if it's in the past and we're showPast
          // always show it if userIsAdmin and event is cancelled
          // otherwise, don't show it
          if (
            (inThePast && showPast) ||
            (userIsAdmin && event.isCancelled && !inThePast)
          ) {
            return (
              <Card key={id} className="mb-4">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md pb-2">
                      <strong>{event.title}</strong>
                    </p>
                    {event.isCancelled && (
                      <p className="pb-2 text-danger-700">
                        <FontAwesomeIcon icon={faCalendarXmark} />
                         You cancelled this event.
                      </p>
                    )}
                    <p className="text-small">
                      {humanReadableDateRange(start, new Date(event.endTime))}
                      {inThePast ? " (…that's in the past!)" : ""}
                    </p>
                    <p className="text-small">{event.location}</p>
                    <Link href={`/events/${slug}/${event.id}`}>
                      <p className="text-small">
                        {process.env.NEXT_PUBLIC_SITE_URL}/events/{slug}/
                        {event.id}
                      </p>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            );
          }

          return <div key={id}></div>;
        })}
      </div>
    </>
  );
}
