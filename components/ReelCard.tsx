"use client";

import Image from "@/components/OptimizedImage";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useState } from "react";
import type { Reel } from "@/components/reels";

export function ReelCard({ reel, decorative = false }: { reel: Reel; decorative?: boolean }) {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const reelUrl = reel.url.split("?")[0].replace(/\/$/, "");

  return (
    <a
      className="reel-card"
      href={reel.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${reel.alt}, ${reel.duration}`}
      data-cursor-label="VIEW"
      tabIndex={decorative ? -1 : 0}
      data-embed-loaded={embedLoaded ? "true" : "false"}
    >
      <Image
        src={reel.posterImage}
        alt={decorative ? "" : reel.alt}
        fill
        sizes="(max-width: 767px) 46vw, (max-width: 1279px) 22vw, 14.5vw"
        className="reel-card-image"
        style={{ objectPosition: reel.objectPosition ?? "center" }}
      />
      <iframe
        className="reel-card-embed"
        src={`${reelUrl}/embed/?autoplay=1&muted=1`}
        title={reel.alt}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
        aria-hidden="true"
        onLoad={() => setEmbedLoaded(true)}
      />
      <span className="reel-card-account" aria-hidden="true">
        <Instagram size={15} strokeWidth={1.7} />
        <span>@PHOTIO</span>
      </span>
      <span className="reel-card-action" aria-hidden="true">
        <span>VIEW REEL</span>
        <ArrowUpRight size={14} strokeWidth={1.6} />
      </span>
    </a>
  );
}
