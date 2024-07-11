"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function PageBreadcrumbs({ title }) {
  return (
    <Breadcrumbs className="mb-3">
      <BreadcrumbItem href="/pages">Pages</BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
