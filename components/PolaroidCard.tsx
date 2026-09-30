"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef } from "react";
import gsap from "gsap";
import type { ServiceCard } from "@/lib/services";

export function PolaroidCard({
  service,
  index,
  onHoverChange,
}: {
  service: ServiceCard;
  index: number;
  onHoverChange: (index: number, active: boolean) => void;
}) {
  const baseRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  const enter = useCallback(() => {
    onHoverChange(index, true);
    gsap.to(photoRef.current, { scale: 1.06, duration: 1, ease: "power2.out", overwrite: true });
    gsap.to(arrowRef.current, { x: "0.5cqw", duration: .35, ease: "power2.out", overwrite: true });
    gsap.to(ruleRef.current, { width: "48px", duration: .35, ease: "power2.out", overwrite: true });
  }, [index, onHoverChange]);

  const leave = useCallback(() => {
    onHoverChange(index, false);
    gsap.to(photoRef.current, { scale: 1, duration: 1, ease: "power2.out", overwrite: true });
    gsap.to(arrowRef.current, { x: 0, duration: .35, ease: "power2.out", overwrite: true });
    gsap.to(ruleRef.current, { width: "28px", duration: .35, ease: "power2.out", overwrite: true });
  }, [index, onHoverChange]);

  return (
    <li
      className="services-card-base"
      data-service-card
      style={{
        "--pin-x": `${service.pinX}cqw`,
        "--pin-y": `${service.pinY}cqw`,
        "--card-width": `${service.width}cqw`,
        "--card-left": `${service.pinX - service.width / 2}cqw`,
        "--rest-angle": `${service.rotation}deg`,
        "--mobile-angle": `${[-6, 4, -3, 6][index]}deg`,
      } as React.CSSProperties}
      ref={baseRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) leave();
      }}
    >
      <div className="services-card-sway">
        <Link href={`/services#${service.id}`} className="polaroid-paper group" aria-label={`${service.title.toLowerCase()}, view service`} data-cursor-label="VIEW">
          <span className="polaroid-photo-window">
            <Image
              ref={photoRef}
              src={service.image}
              alt={service.alt}
              fill
              sizes="(max-width: 899px) 60vw, (max-width: 2400px) 19vw, 456px"
              quality={82}
              className="polaroid-photo object-cover"
            />
            <span className="polaroid-photo-vignette" aria-hidden="true" />
          </span>
          <span className="polaroid-caption">
            <span className="polaroid-index">{service.number}</span>
            <span className="polaroid-caption-rule" ref={ruleRef} />
            <span className="polaroid-title">{service.titleLines.map((line) => <span key={line}>{line}</span>)}</span>
            <ArrowRight ref={arrowRef} size={20} strokeWidth={1.35} className="polaroid-arrow" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </li>
  );
}
