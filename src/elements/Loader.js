"use client";

import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="w-full h-full flex place-content-center place-items-center">
      <Spinner size="lg" />
    </div>
  );
}
