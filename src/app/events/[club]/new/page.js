"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  DateRangePicker,
  Input,
  Textarea,
} from "@nextui-org/react";
import AccountLayout from "../../../AccountLayout";
import { now, getLocalTimeZone } from "@internationalized/date";

import Map from "@/elements/Map";
import { useError } from "@/hooks/useError";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/elements/Loader";

function ClubsPage({ params }) {
  // TODO update from edit page
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
  const [club, setClub] = useState({});

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setError] = useError();

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

    const res = await fetch("/api/events/new", {
      method: "POST",
      body: JSON.stringify({
        description,
        title,
        startTime,
        endTime,
        location,
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
    // todo error handling
    // XXX don't care to figure out why router isn't working right now
    window.location.href = "/events/" + params.club + "/" + res_1.data;

    // TODO
  };

  useEffect(() => {
    fetch(`/api/clubs/${params.club}`)
      .then((data) => data.json())
      .then((res) => {
        setClub(res.data);
        setLoading(false);
      });
  }, [loading]);

  const { status, data: session } = useSession();

  if (status !== "loading" && !session) {
    window.location.href = "/api/auth/signin";
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs className="mb-3">
        <BreadcrumbItem href={`/events/${params.club}`}>
          {club.name}
        </BreadcrumbItem>
        <BreadcrumbItem>New event</BreadcrumbItem>
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
          />
          <DateRangePicker
            label="Event duration"
            visibleMonths={1}
            value={times}
            onChange={setTimes}
          />
          <div className="flex justify-items-end space-x-2">
            <Button color="primary" onPress={create} isLoading={isSubmitting}>
              Create
            </Button>
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
