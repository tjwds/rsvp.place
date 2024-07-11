"use client";

import Markdown from "react-markdown";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";

import AccountLayout from "../AccountLayout";

import { useEffect, useState } from "react";

function ClubsPage() {
  // todo redirect if not auth'd
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch(`/api/clubs`)
      .then((data) => data.json())
      .then((res) => {
        setLoading(false);
        setClubs(res.data || []);
      });
  }, [loading]);

  if (loading) {
    return <>loading…</>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
        <h1 className="text-4xl font-bold pb-4">My clubs</h1>
        {clubs.length ? (
          <div className="pb-4 space-y-4">
            {clubs.map((club, id) => (
              <Card key={id}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">
                      <strong>{club.name}</strong>
                    </p>
                    {/* TODO */}
                    <Link href={`/events/${club.slug}`}>
                      <p className="text-small">
                        {process.env.NEXT_PUBLIC_SITE_URL}/events/
                        {club.slug}/
                      </p>
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="whitespace-pre-line">
                    <Markdown>{club.description}</Markdown>
                  </p>
                </CardBody>
                <CardFooter>
                  <div className="flex space-x-2">
                    <Link href={`/events/${club.slug}/new`}>
                      <Button size="sm">Create event</Button>
                    </Link>
                    <Link href={`/clubs/edit?club=${club.slug}`}>
                      <Button size="sm">Edit club</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>You don’t organize any clubs. Why not make a new one?</p>
        )}
        <div className="flex space-x-2">
          <Link href="/clubs/new">
            <Button color="primary">Create a new club</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function clubsPage() {
  return (
    <AccountLayout>
      <ClubsPage />
    </AccountLayout>
  );
}
