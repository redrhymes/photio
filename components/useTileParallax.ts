"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useTileParallax(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      section.querySelectorAll<HTMLElement>("[data-set-tile]").forEach((tile, index) => {
        const content = tile.querySelector<HTMLElement>(".set-tile-content");
        const image = tile.querySelector<HTMLElement>(".set-tile-image");
        if (content) gsap.to(content, {
          y: () => window.innerHeight * (0.02 + (index % 3) * 0.02),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        if (image) {
          gsap.fromTo(image, { yPercent: -6 + index * 2 }, {
            yPercent: 6 - index * 2,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, section);
    return () => context.revert();
  }, [sectionRef]);
}
