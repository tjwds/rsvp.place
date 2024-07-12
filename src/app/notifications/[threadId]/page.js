"use client";

import { useEffect, useState } from "react";

import AccountLayout from "../../AccountLayout";
import { Card, CardBody, Chip, Link } from "@nextui-org/react";
import { humanReadableDateRange } from "../../utils/humanReadableDateRange";
import Markdown from "react-markdown";
import Loader from "@/elements/Loader";

function NotificationsPage({ params }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/api/notifications/${params.threadId}`)
      .then((data) => data.json())
      .then((res) => {
        setMessages(res.data || []);
        setLoading(false);
      });
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
        <h1 className="text-4xl font-bold pb-4">Thread</h1>
        <div>
          {messages.map(({ sentAt, senderName, content, seen }, index) => (
            <Card key={index}>
              <CardBody>
                <p className="pb-2">
                  <div className="flex">
                    {!seen && (
                      <Chip size="sm" color="primary">
                        New
                      </Chip>
                    )}
                     <strong>{senderName}</strong>
                  </div>
                  {humanReadableDateRange(
                    new Date(sentAt),
                    new Date(sentAt) // lol
                  )}
                </p>
                <Markdown>{content}</Markdown>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function notificationsPage({ params }) {
  return (
    <AccountLayout>
      <NotificationsPage params={params} />
    </AccountLayout>
  );
}
