"use client";

import { Button, Link, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function UserActions({ user: originalUser, userId }) {
  const [user, setUser] = useState(originalUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        // TODO 404 if there's no response here!
        setLoading(false);
        setUser(res.data || []);
      });
  }, [loading]);

  const toggleAdmin = async (clubId, makeAdmin, clubSlug) => {
    setLoading(true);
    await fetch(`/api/clubs/${clubId}/admins`, {
      method: "POST",
      body: JSON.stringify({
        user: params.userId,
        makeAdmin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // TODO error handling
    window.location.href = `/clubs/${clubSlug}`;
  };

  const clubsWhereAdminIds = new Set();
  user.clubsWhereAdmin.forEach(({ id }) => clubsWhereAdminIds.add(id));

  return (
    <Skeleton isLoaded={!loading}>
      {user.thisIsYou ? (
        <div className="flex space-x-2 pt-4">
          <Link href={`/user/${userId}/edit`}>
            <Button color="primary">Edit your profile</Button>
          </Link>
        </div>
      ) : user.loggedInUserClubs.length ? (
        <div className="mt-8">
          <p>You can grant admin rights to this user for these clubs:</p>
          <ul>
            {user.loggedInUserClubs.map(({ id, name, slug }, index) => {
              const isAlreadyAdmin = clubsWhereAdminIds.has(id);
              return (
                <li key={index} className="pt-2">
                  {name} 
                  <Button
                    size="sm"
                    onPress={() => toggleAdmin(id, !isAlreadyAdmin, slug)}
                  >
                    {isAlreadyAdmin ? "Remove admin" : "Promote to admin"}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : loading ? (
        <Button className="mt-4">Loading…</Button>
      ) : (
        <></>
      )}
    </Skeleton>
  );
}
