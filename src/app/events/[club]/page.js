import { Avatar, AvatarGroup, Card, CardHeader, Link } from "@nextui-org/react";

import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

import AccountLayout from "@/app/AccountLayout";
import { humanReadableDateRange } from "@/app/utils/humanReadableDateRange";
import ClubToggles from "./ClubToggles";

const now = new Date();

async function getClub(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${slug}`,
    { cache: "no-store" }
  );
  const { data } = await res.json();

  return data || {};
}

async function ClubsPage({ params }) {
  const { club, events } = await getClub(params.club);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col pb-4">
        <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
        <div className="pb-4 flex flex-column items-center mb-4">
          {club.adminGravatars.length === 1 ? (
            <Avatar showFallback src={club.adminGravatars[0]} />
          ) : (
            <AvatarGroup>
              {club.adminGravatars.map((gravatar, index) => (
                <Link href={`/user/${club.adminIds[index]}`} key={index}>
                  <Avatar showFallback src={gravatar} key={index} />
                </Link>
              ))}
            </AvatarGroup>
          )}
          <div className="pl-2">
            Organized by{" "}
            {club.adminNames.map((name, index) => (
              <span key={index}>
                <Link href={`/user/${club.adminIds[index]}`} key={index}>
                  {name}
                </Link>
                {index !== club.adminNames.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
        </div>
        <Markdown className="pb-4 space-y-4">{club.description}</Markdown>
        <ClubToggles slug={params.club} events={events} />
        <div className="pb-4">
          {events.map((event, id) => {
            const start = new Date(event.startTime);
            const inThePast = +start < +now;
            if (inThePast || event.isCancelled) {
              return <div key={id}></div>;
            }

            return (
              <Card key={id} className="mb-4">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md pb-2">
                      <strong>{event.title}</strong>
                    </p>
                    {event.isCancelled && (
                      <p className="pb-2 text-danger-700">
                        <FontAwesomeIcon icon={faCalendarXmark} />
                         You cancelled this event.
                      </p>
                    )}
                    <p className="text-small">
                      {humanReadableDateRange(start, new Date(event.endTime))}
                      {inThePast ? " (…that's in the past!)" : ""}
                    </p>
                    <p className="text-small">{event.location}</p>
                    <Link href={`/events/${params.club}/${event.id}`}>
                      <p className="text-small">
                        {process.env.NEXT_PUBLIC_SITE_URL}/events/
                        {params.club}/{event.id}
                      </p>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function clubsPage({ params }) {
  return (
    <AccountLayout>
      <ClubsPage params={params} />
    </AccountLayout>
  );
}
