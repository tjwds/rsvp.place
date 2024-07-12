"use client";

import {
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Input,
  Textarea,
  Link,
} from "@nextui-org/react";
import AccountLayout from "../../../AccountLayout";

import { useEffect, useState } from "react";

import { useError } from "@/hooks/useError";
import { useSession } from "next-auth/react";

// TODO this url _sucks_ dude.

function EditProfilePage({ params }) {
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [description, setDescription] = useState("");
  const [gravatarUrl, setGravatarUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setError] = useError();

  const create = async () => {
    setIsSubmitting(true);

    const res = await fetch(`/api/user/${params.userId}`, {
      method: "POST",
      body: JSON.stringify({
        description,
        name,
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

    // XXX don't care to figure out why router isn't working right now
    window.location.href = `/user/${params.userId}`;
  };

  useEffect(() => {
    const getClub = async () => {
      const res = await fetch(`/api/user/${params.userId}`);
      // TODO error handing
      const json = await res.json();
      setName(json.data.name);
      setOriginalName(json.data.name);
      setDescription(json.data.bio);
      setGravatarUrl(json.data.gravatar);
      setLoading(false);
    };
    getClub();
    return;
    // TODO there's another thing that uses getClub that _really_ ought to have loading be a dependency……… right?
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
        <BreadcrumbItem href={`/user/${params.userId}`}>
          {originalName || "Anonymous user"}
        </BreadcrumbItem>
        <BreadcrumbItem>Edit</BreadcrumbItem>
      </Breadcrumbs>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <div className="flex flex-column items-center">
            <Avatar showFallback name={name} src={gravatarUrl} />
            <div className="pl-2">
              You can set your avatar on{" "}
              <Link src="https://gravatar.com">gravatar.com</Link>.
            </div>
          </div>
          <Input
            label="Name"
            value={name}
            onValueChange={setName}
            maxLength={70}
          />
          <Textarea
            label="Bio"
            value={description}
            onValueChange={setDescription}
            maxLength={2000}
            description="Tell the world about yourself! You can format this using markdown."
          />
          <div className="flex justify-items-end space-x-2">
            <Button color="primary" onPress={create} isLoading={isSubmitting}>
              Update profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function editProfilePage({ params }) {
  return (
    <AccountLayout>
      <EditProfilePage params={params} />
    </AccountLayout>
  );
}
