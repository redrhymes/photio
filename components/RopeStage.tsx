"use client";

import Image from "@/components/OptimizedImage";
import type { ServiceCard } from "@/lib/services";

export function RopeStage({ cards }: { cards: ServiceCard[] }) {
  return (
    <>
      <div className="services-rope-reveal" aria-hidden="true">
        <Image src="/images/rope-transparent.webp" alt="" fill sizes="(max-width: 899px) 100vw, (max-width: 2400px) 100vw, 2400px" className="services-rope-image" />
      </div>
    </>
  );
}
