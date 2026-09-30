"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const splits: SplitText[] = [];
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((element) => {
      const split = new SplitText(element, { type: "lines", linesClass: "split-line" });
      splits.push(split);
      gsap.fromTo(split.lines, { yPercent: 105, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    });
    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
      gsap.to(element, { yPercent: -8, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } });
    });

    const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
