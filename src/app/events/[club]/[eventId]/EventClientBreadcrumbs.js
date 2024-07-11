"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function EventClientBreadcrumbs({ slug, clubName, title }) {
  return (
    <Breadcrumbs className="mb-3">
      <BreadcrumbItem href={`/events/${slug}`}>{clubName}</BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
