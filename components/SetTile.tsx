"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef } from "react";
import gsap from "gsap";
import type { CSSProperties, MouseEvent } from "react";
import type { ShootSetTile } from "@/lib/sets";

export function SetTile({
  tile,
  debug,
  onHoverChange,
}: {
  tile: ShootSetTile;
  debug: boolean;
  onHoverChange: (slug: string | null) => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const enter = useCallback(() => {
    onHoverChange(tile.slug);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(linkRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: .7, ease: "power3.out", overwrite: true });
    gsap.to(imageRef.current, { scale: tile.slug === "bali-vibes" ? 1 : 1.2, duration: .8, ease: "power3.out", overwrite: true });
    gsap.to(ruleRef.current, { maxWidth: "100%", duration: .6, ease: "power3.out", overwrite: true });
    gsap.to(arrowRef.current, { x: "0.5cqw", color: "#e8cb94", duration: .35, ease: "power2.out", overwrite: true });
  }, [onHoverChange, tile.slug]);

  const leave = useCallback(() => {
    onHoverChange(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(linkRef.current, { clipPath: tile.polygon, duration: .7, ease: "power3.out", overwrite: true });
    gsap.to(imageRef.current, { scale: tile.slug === "bali-vibes" ? 1 : 1.12, x: 0, y: 0, duration: .8, ease: "power3.out", overwrite: true });
    gsap.to(ruleRef.current, { maxWidth: tile.slug === "floral-arches" ? "4cqw" : "14cqw", duration: .6, ease: "power3.out", overwrite: true });
    gsap.to(arrowRef.current, { x: 0, color: "#f2eee6", duration: .35, ease: "power2.out", overwrite: true });
  }, [onHoverChange, tile.polygon, tile.slug]);

  const moveImage = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * -2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * -2;
    gsap.to(imageRef.current, { x: `${x}cqw`, y: `${y}cqw`, duration: .5, ease: "power2.out", overwrite: true });
  }, []);

  const style = {
    "--tile-left": `${tile.left}cqw`,
    "--tile-top": `${tile.top}cqw`,
    "--tile-width": `${tile.width}cqw`,
    "--tile-height": `${tile.height}cqw`,
    "--tile-clip": tile.polygon,
    "--tile-direction": tile.direction === "bottom" ? "translateY(12%)" : tile.direction === "left" ? "translateX(-12%)" : "translateX(12%)",
    "--tile-order": Number(tile.index),
  } as CSSProperties;

  return (
    <li className="set-tile" data-set-tile data-set-slug={tile.slug} style={style}>
      <Link
        ref={linkRef}
        href={`/shoot-sets/${tile.slug}`}
        className="set-tile-link"
        style={{ clipPath: tile.polygon }}
        aria-label={`${tile.title}, view shoot set`}
        data-cursor-label="VIEW"
        onMouseEnter={() => {
          if (window.matchMedia("(pointer: fine)").matches) enter();
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(pointer: fine)").matches) leave();
        }}
        onFocus={enter}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) leave();
        }}
        onMouseMove={moveImage}
      >
        <span className="set-tile-content">
          <Image
            ref={imageRef}
            src={tile.image}
            alt={tile.alt}
            fill
            sizes={`(max-width: 899px) ${tile.slug === "bali-vibes" || tile.slug === "moroccan-fort" ? "100vw" : "50vw"}, (max-width: 2400px) 43vw, 1037px`}
            quality={75}
            loading="lazy"
            className="set-tile-image"
          />
          <span className="set-tile-gradient" aria-hidden="true" />
        </span>
        <span className="set-tile-caption">
          <span className="set-tile-index">{tile.index} /</span>
          <span className="set-tile-caption-row">
            <span className="set-tile-title">{tile.title}</span>
            <span className="set-tile-rule" ref={ruleRef} />
            <ArrowRight className="set-tile-arrow" ref={arrowRef} aria-hidden="true" />
          </span>
        </span>
        {debug && <span className="set-tile-debug" aria-hidden="true">{tile.index}</span>}
      </Link>
    </li>
  );
}
