"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import AccountLayout from "../../AccountLayout";

import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import { useSession } from "next-auth/react";

function ClubsPage({ params }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [originalSlug, setOriginalSlug] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setError] = useError();

  const create = async () => {
    if (!name || !description || !slug) {
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/clubs/upsert", {
      method: "POST",
      body: JSON.stringify({
        description,
        name,
        slug,
        originalSlug,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSubmitting(false);
    if (!res.ok) {
      setError("Sorry, something went wrong saving that.");
      return;
    }

    window.location.href = "/clubs";
  };

  useEffect(() => {
    if (params.action === "edit") {
      const club = window.location.search.match(/club=([^&]+)/)?.[1];
      if (!club) {
        window.location.href = "/clubs";
      }
      // get the club
      const getClub = async () => {
        const res = await fetch("/api/clubs/" + club);
        // TODO error handing
        const json = await res.json();
        setName(json.data.name);
        setDescription(json.data.description);
        setSlug(json.data.slug);
        setOriginalSlug(json.data.slug);
        setLoading(false);
      };
      getClub();
      return;
      // update the state
      // set loading false
    }
    if (params.action === "new") {
      setLoading(false);
      return;
    }

    window.location.href = "/clubs";
  }, []);

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
        <BreadcrumbItem href="/clubs">Clubs</BreadcrumbItem>
        <BreadcrumbItem>
          {params.action === "new" ? "New" : "Edit"}
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <Input
            label="Name"
            value={name}
            onValueChange={setName}
            maxLength={70}
            isRequired={true}
          />
          <Input
            label="URL slug"
            value={slug}
            onValueChange={setSlug}
            description={`This will be the URL for your group:  https://rsvp.place/clubs/${
              slug || "your-group-here"
            }`}
            maxLength={70}
            pattern="[a-z-]+"
            isRequired={true}
            // TODO make this always lowercase, etc. etc.
          />
          <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
            maxLength={2000}
            description="You can format this using markdown."
            isRequired={true}
          />
          <div className="flex justify-items-end space-x-2">
            <Button color="primary" onPress={create} isLoading={isSubmitting}>
              {originalSlug ? "Update" : "Create"}
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
