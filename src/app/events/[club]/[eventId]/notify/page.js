"use client";

import { Breadcrumbs, BreadcrumbItem, Textarea } from "@nextui-org/react";
import AccountLayout from "../../../../AccountLayout";

import { useEffect, useState } from "react";

import ConfirmButton from "@/elements/ConfirmButton";
import { useError } from "@/hooks/useError";
import { useSession } from "next-auth/react";

function ClubsPage({ params }) {
  const [loading, setLoading] = useState(true);
  // TODO this is probably wrong everywhere
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clubName, setClubName] = useState("");
  const [title, setTitle] = useState("");

  const [, setError] = useError();

  const [message, setMessage] = useState("");

  // So absurd to be doing all of this just for the club name and event title.
  useEffect(() => {
    fetch(`/api/events/${params.club}/${params.eventId}`)
      .then((data) => data.json())
      .then((res) => {
        const event = res.data;
        setTitle(event.title);
        setClubName(event.clubName);
        setLoading(false);
      });
  }, [loading]);

  const notifyParticipants = async () => {
    if (!message) {
      return;
    }

    const res = await fetch(
      `/api/events/${params.club}/${params.eventId}/notify`,
      {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      setError("Sorry, something went wrong saving that.");
      return;
    }

    setLoading(true);
    window.location.href = "/notifications/";
  };

  const { status, data: session } = useSession();

  if (status !== "loading" && !session) {
    window.location.href = "/api/auth/signin";
    return <>loading…</>;
  }

  if (loading) {
    return <>loading…</>;
  }

  return (
    <>
      <Breadcrumbs className="mb-3">
        <BreadcrumbItem href={`/events/${params.club}`}>
          {clubName}
        </BreadcrumbItem>
        <BreadcrumbItem href={`/events/${params.club}/${params.eventId}`}>
          {title}
        </BreadcrumbItem>
        <BreadcrumbItem>Send notification</BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <Textarea
            label="Message"
            value={message}
            onValueChange={setMessage}
            description="The message to send to all participants. You can format this using markdown."
            isRequired
          />
          <div className="flex justify-items-end space-x-2">
            <ConfirmButton
              color="primary"
              onPress={notifyParticipants}
              isLoading={isSubmitting}
            >
              Send message
            </ConfirmButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default function clubsPage({ params }) {
  return (
    <AccountLayout>
      <ClubsPage params={params} />
    </AccountLayout>
  );
}
