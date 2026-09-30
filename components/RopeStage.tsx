"use client";

import Image from "@/components/OptimizedImage";
import { Clothespin } from "@/components/Clothespin";
import type { ServiceCard } from "@/lib/services";

export function RopeStage({ cards }: { cards: ServiceCard[] }) {
  return (
    <>
      <div className="services-rope-reveal" aria-hidden="true">
        <Image src="/images/rope-transparent.webp" alt="" fill sizes="(max-width: 899px) 100vw, (max-width: 2400px) 100vw, 2400px" className="services-rope-image" />
      </div>
      {cards.map((card) => (
        <span
          key={card.id}
          className="services-pin-front"
          aria-hidden="true"
          style={{
            left: `calc(${card.pinX}cqw - 1.9cqw)`,
            top: `${card.pinY - 3.6}cqw`,
          }}
        ><Clothespin /></span>
      ))}
    </>
  );
}
