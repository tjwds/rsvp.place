"use client";

import { useEffect, useState } from "react";

import AccountLayout from "../AccountLayout";
import { Card, CardBody, Chip, Link } from "@nextui-org/react";
import { humanReadableDateRange } from "../utils/humanReadableDateRange";
import Loader from "@/elements/Loader";

function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`/api/notifications`)
      .then((data) => data.json())
      .then((res) => {
        setNotifications(res.data || []);
        setLoading(false);
      });
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
        <h1 className="text-4xl font-bold pb-4">Notifications</h1>
        <div>
          {notifications.map(
            ({ lastActivity, senderName, preview, read, id }, index) => (
              <Card key={index} as={Link} href={`/notifications/${id}`}>
                <CardBody>
                  <p className="pb-2">
                    <div className="flex">
                      {!read && (
                        <Chip size="sm" color="primary">
                          New
                        </Chip>
                      )}
                       <strong>{senderName}</strong>
                    </div>
                    {humanReadableDateRange(
                      new Date(lastActivity),
                      new Date(lastActivity) // lol
                    )}
                  </p>
                  <p>{preview}</p>
                </CardBody>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function notificationsPage() {
  return (
    <AccountLayout>
      <NotificationsPage />
    </AccountLayout>
  );
}
