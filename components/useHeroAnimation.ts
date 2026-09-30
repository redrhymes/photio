"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useHeroAnimation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (reduceMotion) {
        root.querySelector<HTMLElement>("[data-hero-bg]")?.style.setProperty("opacity", "1");
        root.querySelectorAll<HTMLElement>("[data-hero-eyebrow], [data-hero-tagline], [data-hero-button], [data-hero-detail]")
          .forEach((element) => element.style.setProperty("opacity", "1"));
        root.querySelector<HTMLElement>("[data-hero-gold]")?.style.setProperty("color", "#E8CB94");
        return;
      }

      gsap.registerPlugin(ScrollTrigger, SplitText);
      const headline = root.querySelector<HTMLElement>("[data-hero-headline]");
      const bg = root.querySelector<HTMLElement>("[data-hero-bg]");
      const eyebrow = root.querySelector<HTMLElement>("[data-hero-eyebrow]");
      const tagline = root.querySelector<HTMLElement>("[data-hero-tagline]");
      const heroCopy = root.querySelector<HTMLElement>(".hero-copy");
      const buttons = root.querySelectorAll<HTMLElement>("[data-hero-button]");
      const goldWord = root.querySelector<HTMLElement>("[data-hero-gold]");
      if (!headline || !bg || !eyebrow || !tagline || !heroCopy) return;
      const split = new SplitText(headline, { type: "lines", linesClass: "hero-title-line" });
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" })
        .fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 0.72, y: 0, duration: 0.7 }, "-=1.05")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, "-=0.25")
        .fromTo(tagline, { opacity: 0, y: 14 }, { opacity: 0.78, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo(buttons, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.55, stagger: 0.1 }, "-=0.2")
        .fromTo(root.querySelectorAll("[data-hero-detail]"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.1");
      if (goldWord) timeline.fromTo(goldWord, { color: "#ffffff" }, { color: "#E8CB94", duration: 0.7 }, "-=0.5");

      const parallax = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      parallax
        .to(bg, { yPercent: 12, ease: "none" }, 0)
        .to(heroCopy, { y: -24, opacity: 0.25, ease: "none" }, 0);

      return () => {
        timeline.kill();
        parallax.scrollTrigger?.kill();
        split.revert();
      };
    };

    let cleanup: (() => void) | undefined;
    let fallback: number | undefined;
    const onPreloaderDone = () => {
      if (fallback !== undefined) window.clearTimeout(fallback);
      cleanup = run();
    };
    if (sessionStorage.getItem("photio-seen") === "1") {
      const frame = requestAnimationFrame(() => { cleanup = run(); });
      return () => { cancelAnimationFrame(frame); cleanup?.(); };
    }
    window.addEventListener("photio:preloader-complete", onPreloaderDone, { once: true });
    fallback = window.setTimeout(() => {
      window.removeEventListener("photio:preloader-complete", onPreloaderDone);
      cleanup = run();
    }, 2600);
    return () => {
      if (fallback !== undefined) window.clearTimeout(fallback);
      window.removeEventListener("photio:preloader-complete", onPreloaderDone);
      cleanup?.();
    };
  }, []);

  return rootRef;
}
