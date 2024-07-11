"use client";

import { useError } from "@/hooks/useError";
import { Avatar, Button, Link, Skeleton } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export function RegistrationButton({ event: propEvent, club, eventId }) {
  const [, setError] = useError();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(propEvent);
  const [submitting, setSubmitting] = useState(false);
  const { status, data: session } = useSession();

  useEffect(() => {
    fetch(`/api/events/${club}/${eventId}`)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setEvent(res.data || {});
      });
  }, [loading]);

  const register = async (registering) => {
    // TODO make this … tidier
    setSubmitting(true);
    const res = await fetch(`/api/events/${club}/${eventId}/register`, {
      method: "POST",
      // lol.
      body: JSON.stringify({ registering }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSubmitting(false);
    if (!res.ok) {
      setError("Sorry, something went wrong saving that.");
      return;
    }

    setEvent({
      ...event,
      userIsAttending: registering,
    });
  };

  return (
    <Skeleton isLoaded={!loading && status !== "loading"}>
      {session ? (
        event.userIsAdmin ? (
          <Button
            as={Link}
            color="primary"
            href={`/events/${club}/${eventId}/edit`}
          >
            Edit event
          </Button>
        ) : event.isCancelled ? (
          <></>
        ) : event.userIsAttending ? (
          // TODO the transition here needs to be more confirming or something
          <Button
            color="primary"
            onPress={() => register(false)}
            isLoading={submitting}
          >
            Cancel RSVP
          </Button>
        ) : (
          <Button
            color="primary"
            onPress={() => register(true)}
            isLoading={submitting}
          >
            Register
          </Button>
        )
      ) : (
        <Button as={Link} color="primary" href="#" onPress={() => signIn()}>
          Sign in to register
        </Button>
      )}
      {event.userIsAdmin && (
        <div className="mt-8">
          {event.attendees.length ? (
            <h2 className="pb-2 text-xl font-bold">
              {event.attendees.length} 
              {event.attendees.length === 1 ? "Person" : "People"} attending:
            </h2>
          ) : (
            "0 people are attending."
          )}
          {event.attendees.map(({ name, gravatar, id }, index) => (
            <div key={index} className="pb-4 flex flex-column items-center">
              <Avatar showFallback src={gravatar} size="sm" />
              <Link href={`/user/${id}`} className="pl-2">
                {name}
              </Link>
            </div>
          ))}
          {event.attendees.length ? (
            <Button
              as={Link}
              className="mt-4"
              href={`/events/${club}/${eventId}/notify`}
            >
              Send message to attendees
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}
    </Skeleton>
  );
}
