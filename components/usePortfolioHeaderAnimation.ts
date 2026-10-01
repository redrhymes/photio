"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function usePortfolioHeaderAnimation(total: number) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const background = section.querySelector<HTMLElement>("[data-portfolio-background]");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-portfolio-eyebrow-line]");
    const eyebrow = section.querySelector<HTMLElement>("[data-portfolio-eyebrow]");
    const heading = section.querySelector<HTMLElement>("[data-portfolio-heading]");
    const highlight = section.querySelector<HTMLElement>("[data-portfolio-highlight]");
    const subcopy = section.querySelector<HTMLElement>("[data-portfolio-subcopy]");
    const stat = section.querySelector<HTMLElement>("[data-portfolio-stat]");
    const divider = section.querySelector<HTMLElement>("[data-portfolio-stat-divider]");
    const count = section.querySelector<HTMLElement>("[data-portfolio-count]");
    const scrollCue = section.querySelector<HTMLElement>(".portfolio-header-scroll");
    const scrollArrow = section.querySelector<HTMLElement>("[data-portfolio-scroll-arrow]");
    const backgroundImage = background?.querySelector("img");

    if (!background || !eyebrowLine || !eyebrow || !heading || !highlight || !subcopy || !stat || !divider || !count || !scrollCue || !scrollArrow) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.fromTo(
        [background, eyebrow, heading, subcopy, stat, scrollCue],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.06, ease: "power1.out" },
      );
      return;
    }

    const split = new SplitText(heading, { type: "lines", linesClass: "portfolio-headline-mask" });
    const countState = { value: 0 };
    const kenBurns = gsap.to(background, {
      scale: 1.03,
      duration: 16,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });

    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .fromTo(background, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" })
        .fromTo(eyebrowLine, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.out" }, "-=0.65")
        .fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        }, "-=0.1")
        .fromTo(highlight, { filter: "grayscale(1)" }, { filter: "grayscale(0)", duration: 0.6, ease: "power2.out" }, "-=0.25")
        .fromTo(subcopy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, ">+=0.15")
        .fromTo(stat, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.4")
        .fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(count, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<")
        .to(countState, {
          value: total,
          duration: 1.2,
          ease: "power2.out",
          onStart: () => { count.textContent = "0"; },
          onUpdate: () => { count.textContent = String(Math.round(countState.value)); },
          onComplete: () => { count.textContent = String(total); },
        }, "<");

      timeline.fromTo(scrollCue, { opacity: 0, y: 10 }, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      }, ">+=0.1");
      timeline.eventCallback("onComplete", () => {
        count.textContent = String(total);
      });

      gsap.to(scrollArrow, {
        y: 5,
        duration: 0.75,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.2,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => kenBurns.paused(!isActive),
      });

      gsap.to(background, {
        yPercent: -70,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    if (backgroundImage && !backgroundImage.complete) {
      gsap.set(background, { opacity: 0 });
      backgroundImage.addEventListener("load", () => {
        if (section.isConnected) gsap.to(background, { opacity: 1, duration: 0.3 });
      }, { once: true });
      backgroundImage.addEventListener("error", () => {
        if (section.isConnected) gsap.to(background, { opacity: 1, duration: 0.3 });
      }, { once: true });
    }

    return () => {
      kenBurns.kill();
      context.revert();
      split.revert();
    };
  }, []);

  return sectionRef;
}
