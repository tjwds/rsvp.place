"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  DateRangePicker,
  Input,
  Textarea,
} from "@nextui-org/react";
import AccountLayout from "../../../../AccountLayout";

import { now, getLocalTimeZone, parseAbsolute } from "@internationalized/date";
import { useEffect, useState } from "react";

import ConfirmButton from "@/elements/ConfirmButton";
import Map from "@/elements/Map";
import { useError } from "@/hooks/useError";
import { useSession } from "next-auth/react";

function ClubsPage({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [times, setTimes] = useState({
    start: now(getLocalTimeZone()),
    end: now(getLocalTimeZone()),
  });
  const [id, setID] = useState("");
  const [clubName, setClubName] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setError] = useError();

  const cancelEvent = async (cancel) => {
    const res = await fetch(
      `/api/events/${params.club}/${params.eventId}/cancel`,
      {
        // TODO this should probably be a DELETE… maybe…
        method: "POST",
        body: JSON.stringify({ cancel }),
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
    window.location.href = "/events/" + params.club + "/" + params.eventId;
  };

  const create = async () => {
    const startTime = times.start.toAbsoluteString();
    const endTime = times.end.toAbsoluteString();
    if (
      !title ||
      !description ||
      // XXX get this from the actual input (ugh)
      endTime < startTime
    ) {
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/events/update", {
      method: "POST",
      // TODO max number of attendees…
      body: JSON.stringify({
        description,
        title,
        startTime,
        endTime,
        location,
        id,
        slug: params.club,
        lat: lat ? Number(lat) : undefined,
        long: long ? Number(long) : undefined,
        address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setError("Sorry, something went wrong saving that.");
      return;
    }

    const res_1 = await res.json();
    // XXX don't care to figure out why router isn't working right now
    window.location.href = "/events/" + params.club + "/" + res_1.data;
  };

  useEffect(() => {
    fetch(`/api/events/${params.club}/${params.eventId}`)
      .then((data) => data.json())
      .then((res) => {
        const event = res.data;
        setTitle(event.title);
        setDescription(event.description);

        setLocation(event.location);
        setAddress(event.address || "");
        setLat(String(event.latitude || ""));
        setLong(String(event.longitude || ""));

        setTimes({
          start: parseAbsolute(event.startTime),
          end: parseAbsolute(event.endTime),
        });
        setID(event.id);
        setClubName(event.clubName);
        setIsCancelled(event.isCancelled);
        setLoading(false);
      });
  }, [loading]);

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
        <BreadcrumbItem>Edit</BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <Input label="Title" value={title} onValueChange={setTitle} />

          <Input
            label="Location"
            value={location}
            onValueChange={setLocation}
            description="A descriptive name for where the event is taking place."
          />
          <Input
            label="Address"
            value={address}
            onValueChange={setAddress}
            description="Optional:  the street address of this event"
          />
          <div className="flex space-x-4">
            <Input
              label="Latitude"
              value={lat}
              onValueChange={setLat}
              description="Optional latitude for the map."
            />
            <Input
              label="Longitude"
              value={long}
              onValueChange={setLong}
              description="Optional longitude for the map."
            />
          </div>
          {lat && long && (
            <Map center={[lat, long]} className="rounded-large" />
          )}

          <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
            description="You can format this using markdown."
          />
          <DateRangePicker
            label="Event duration"
            visibleMonths={1}
            value={times}
            onChange={setTimes}
          />
          <div className="flex justify-items-end space-x-2">
            <Button color="primary" onPress={create} isLoading={isSubmitting}>
              Update
            </Button>
            <ConfirmButton
              color="danger"
              onPress={() => cancelEvent(!isCancelled)}
            >
              {isCancelled ? "Un-cancel event" : "Cancel event"}
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
