"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { ShootSetTile } from "@/lib/sets";

export function useTileReveal(sectionRef: RefObject<HTMLElement | null>, tiles: ShootSetTile[]) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = section.querySelector<HTMLElement>("[data-set-heading]");
    const line = section.querySelector<HTMLElement>("[data-set-eyebrow-line]");
    const label = section.querySelector<HTMLElement>("[data-set-eyebrow]");
    const sublabel = section.querySelector<HTMLElement>("[data-set-sublabel]");
    const elements = Array.from(section.querySelectorAll<HTMLElement>("[data-set-tile]"));
    const images = elements
      .map((element) => element.querySelector<HTMLImageElement>(".set-tile-image"))
      .filter((image): image is HTMLImageElement => image !== null);

    if (reducedMotion) {
      gsap.set([line, label, sublabel, ...elements], { clearProps: "all" });
      elements.forEach((element) => {
        const link = element.querySelector<HTMLElement>(".set-tile-link");
        const image = element.querySelector<HTMLImageElement>(".set-tile-image");
        const caption = element.querySelector<HTMLElement>(".set-tile-caption");
        if (link) link.style.clipPath = element.style.getPropertyValue("--tile-clip");
        gsap.set([image, caption], { clearProps: "all" });
      });
      return;
    }

    const split = heading ? new SplitText(heading, { type: "lines", linesClass: "set-heading-line" }) : null;
    let tileSectionEntered = false;
    let tileImagesReady = images.every((image) => image.complete);
    let imageStatusListener: EventListener | undefined;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true });
      timeline
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: .5, ease: "power2.out" })
        .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, ease: "power3.out" }, "-=.12");
      if (split) {
        timeline.fromTo(split.lines, { yPercent: 110 }, {
          yPercent: 0,
          duration: 1.1,
          stagger: .12,
          ease: "power4.out",
        }, "-=.1");
      }
      timeline
        .fromTo(sublabel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" }, "-=.25")
        .fromTo(section.querySelector(".set-cta-underline"), { scaleX: 0 }, {
          scaleX: 1,
          duration: .6,
          ease: "power2.out",
        }, "-=.2");

      const tileTimeline = gsap.timeline({ paused: true });
      tileTimeline
        .fromTo(elements, {
          x: (index) => tiles[index].direction === "left" ? -90 : tiles[index].direction === "right" ? 90 : 0,
          y: (index) => tiles[index].direction === "bottom" ? 90 : 0,
          opacity: 0,
          clipPath: (index) => tiles[index].direction === "left"
            ? "inset(0 100% 0 0)"
            : tiles[index].direction === "right"
              ? "inset(0 0 0 100%)"
              : "inset(100% 0 0 0)",
        }, {
          x: 0,
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
          duration: 1.2,
          stagger: .12,
          ease: "power3.inOut",
          onComplete: () => elements.forEach((element, index) => {
            const link = element.querySelector<HTMLElement>(".set-tile-link");
            if (link) link.style.clipPath = tiles[index].polygon;
          }),
        })
        .fromTo(images,
          { scale: (index) => tiles[index].slug === "bali-vibes" ? 1 : 1.3 },
          { scale: (index) => tiles[index].slug === "bali-vibes" ? 1 : 1.12, duration: 1.2, stagger: .12, ease: "power3.out" },
          "<",
        )
        .fromTo(section.querySelectorAll(".set-tile-caption"), { opacity: 0, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: .45,
          stagger: .12,
          ease: "power2.out",
        }, "-=.25");

      const startTileReveal = () => {
        if (tileSectionEntered && tileImagesReady) tileTimeline.play();
      };
      const handleImageStatus: EventListener = () => {
        tileImagesReady = images.every((image) => image.complete);
        if (tileImagesReady) {
          images.forEach((image) => {
            image.removeEventListener("load", handleImageStatus);
            image.removeEventListener("error", handleImageStatus);
          });
          startTileReveal();
        }
      };
      imageStatusListener = handleImageStatus;
      if (!tileImagesReady) {
        images.forEach((image) => {
          image.addEventListener("load", handleImageStatus);
          image.addEventListener("error", handleImageStatus);
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
        onEnter: () => {
          tileSectionEntered = true;
          images.forEach((image) => { image.loading = "eager"; });
          timeline.play();
          startTileReveal();
        },
      });
    }, section);

    return () => {
      const listener = imageStatusListener;
      if (listener) {
        images.forEach((image) => {
          image.removeEventListener("load", listener);
          image.removeEventListener("error", listener);
        });
      }
      context.revert();
      split?.revert();
    };
  }, [sectionRef, tiles]);
}
