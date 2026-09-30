"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SetTile } from "@/components/SetTile";
import { useTileParallax } from "@/components/useTileParallax";
import { useTileReveal } from "@/components/useTileReveal";
import { shootSetTiles } from "@/lib/sets";

export function ShootSetsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [debug, setDebug] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setDebug(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  useTileReveal(sectionRef, shootSetTiles);
  useTileParallax(sectionRef);

  const onHoverChange = useCallback((slug: string | null) => setHovered(slug), []);

  return (
    <section
      ref={sectionRef}
      id="shoot-sets"
      data-theme="dark"
      data-hovered={hovered ?? ""}
      className="shoot-sets-section"
      aria-label="Photio shoot sets"
    >
      <div className="shoot-sets-stage">
        <header className="shoot-sets-header">
          <p className="shoot-sets-eyebrow" data-set-eyebrow>
            <span className="shoot-sets-eyebrow-line" data-set-eyebrow-line />
            <span><b>04 /</b> SHOOT SETS</span>
          </p>
          <h2 className="display shoot-sets-heading" data-set-heading>
            <span>A world of <i>places,</i></span>
            <span>without leaving the city.</span>
          </h2>
          <p className="shoot-sets-sublabel" data-set-sublabel>BLANK SPOTS</p>
        </header>

        <ul className={`shoot-sets-grid${debug ? " shoot-sets-grid--debug" : ""}`} aria-label="Themed shoot sets">
          {shootSetTiles.map((tile) => (
            <SetTile
              key={tile.slug}
              tile={tile}
              debug={debug}
              onHoverChange={onHoverChange}
            />
          ))}
        </ul>

        <Link href="/shoot-sets" className="set-cta">
          <span>Explore all shoot sets</span>
          <span className="set-cta-underline" />
          <ArrowRight className="set-cta-arrow" size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
