"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import type { Work } from "@/lib/works";

export function WorkSlide({
  work,
  index,
  active,
  onMeasure,
}: {
  work: Work;
  index: number;
  active: boolean;
  onMeasure: (element: HTMLAnchorElement | null, index: number) => void;
}) {
  const accessibleName = [work.coupleNames, work.city, work.shootType.toLowerCase()].filter(Boolean).join(", ");
  return (
    <Link
      ref={(element) => onMeasure(element, index)}
      href={`/portfolio/${work.slug}`}
      aria-label={`${accessibleName}, story ${index + 1}`}
      aria-roledescription="slide"
      aria-current={active ? "true" : undefined}
      className={`work-panel group relative block h-full shrink-0 overflow-hidden text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne`}
      data-cursor-label={active ? "VIEW" : "DRAG"}
      draggable={false}
    >
      <Image
        src={work.image}
        alt={work.alt}
        fill
        sizes="(max-width: 767px) 78vw, (max-width: 1023px) 60vw, 34vw"
        quality={85}
        draggable={false}
        className="work-panel-image object-cover"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <span className={`work-caption pointer-events-none absolute bottom-5 left-5 transition-all duration-500 sm:bottom-7 sm:left-7 ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} max-md:translate-y-0 max-md:opacity-100`}>
        {work.coupleNames && <span className="eyebrow block text-[10px] tracking-[.24em] sm:text-xs">{work.coupleNames}</span>}
        {(work.city || work.shootType) && <span className="eyebrow mt-2 block text-[9px] tracking-[.2em] text-white/75 sm:text-[10px]">{[work.city, work.shootType].filter(Boolean).join(" — ")}</span>}
        <span className="mt-4 block h-px w-7 bg-white/80" />
      </span>
    </Link>
  );
}
