import Markdown from "react-markdown";

import AccountLayout from "@/app/AccountLayout";
import { humanReadableDateRange } from "@/app/utils/humanReadableDateRange";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

import Map from "@/elements/Map";
import { RegistrationButton } from "./RegistrationButton";
import EventClientBreadcrumbs from "./EventClientBreadcrumbs";

async function getEvent(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${params.club}/${params.eventId}`,
    { cache: "no-store" }
  );
  const { data } = await res.json();

  return data || {};
}

async function ClubsPage({ params }) {
  const event = await getEvent(params);

  return (
    <>
      <EventClientBreadcrumbs
        slug={params.club}
        clubName={event.clubName}
        title={event.title}
      />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col space-y-4 pb-4">
          <>
            {event.isCancelled && (
              <Card className="bg-danger-600 text-danger-50 px-4 py-2 mb-4">
                <CardBody>
                  <p>
                    <FontAwesomeIcon
                      icon={faCalendarXmark}
                      width="1em"
                      className="inline"
                      style={{ marginTop: "-5px" }}
                    />
                    <strong className="pl-2 font-semibold">
                      This event has been cancelled.
                    </strong>
                  </p>
                </CardBody>
              </Card>
            )}
          </>
          <h1 className="text-4xl font-bold pb-4">{event.title}</h1>
          <p className="pb-4 font-extralight italic">
            {humanReadableDateRange(
              new Date(event.startTime),
              new Date(event.endTime)
            )}
          </p>
          <div className="pb-8">
            {/* TODO lat and long can be 0, check for defined */}
            {event.latitude && event.longitude ? (
              <Card className="py-4">
                <CardBody className="py-2">
                  <Map
                    center={[event.latitude, event.longitude]}
                    className="rounded-large"
                  />
                </CardBody>
                <CardFooter className="pb-2 pt-2 px-4 flex-col items-start">
                  <p className="font-bold">{event.location}</p>
                  <small className="text-default-500">{event.address}</small>
                </CardFooter>
              </Card>
            ) : (
              <>
                <p className="font-bold">{event.location}</p>
                <small className="text-default-500">{event.address}</small>
              </>
            )}
          </div>
          <Markdown className="pb-4 space-y-4">{event.description}</Markdown>
          <div className="flex justify-items-end space-x-2">
            <RegistrationButton
              event={event}
              club={params.club}
              eventId={params.eventId}
            />
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
