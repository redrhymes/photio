"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceStory } from "@/lib/services";

type Props = {
  service: ServiceStory;
  active: boolean;
  onActivate: (id: string) => void;
};

export function ServiceListRow({ service, active, onActivate }: Props) {
  return (
    <Link
      href={service.href}
      className={`service-list-row${active ? " is-active" : ""}`}
      data-service-row
      aria-label={`View ${service.title} services`}
      onMouseEnter={() => onActivate(service.id)}
      onFocus={() => onActivate(service.id)}
    >
      <span className="service-list-row-index" aria-hidden="true">{service.number}</span>
      <span className="service-list-row-copy">
        <span className="service-list-row-title">{service.title}</span>
        <span className="service-list-row-description">{service.description}</span>
      </span>
      <ArrowRight className="service-list-row-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
