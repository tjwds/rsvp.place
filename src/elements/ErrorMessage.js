"use client";

import { useError } from "@/hooks/useError";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody } from "@nextui-org/react";

export function ErrorMessage() {
  // Absurd, but allow SSR:
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error] = useError();

  if (!error) {
    return <></>;
  }

  return (
    <div className="fixed bottom-0 left-2 z-50">
      <Card className="bg-danger-600 text-danger-50 px-4 py-2 mb-4">
        <CardBody>
          <p>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <strong className="pl-2 font-semibold">{error}</strong>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
