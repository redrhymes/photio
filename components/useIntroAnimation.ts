"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useIntroAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const headline = section.querySelector<HTMLElement>("[data-intro-headline]");
    const note = section.querySelector<HTMLElement>("[data-intro-note]");
    const photo = section.querySelector<HTMLElement>("[data-intro-photo]");
    const photoImage = photo?.querySelector("img");
    const statsLine = section.querySelector<HTMLElement>("[data-intro-stats-line]");
    const dividers = section.querySelectorAll<HTMLElement>("[data-intro-divider]");
    const counters = section.querySelectorAll<HTMLElement>("[data-count-target]");
    const bronzeWords = section.querySelectorAll<HTMLElement>("[data-intro-bronze]");
    if (!headline || !note || !photo || !statsLine) return;

    const finishCounters = () => counters.forEach((counter) => {
      const value = Number(counter.dataset.countTarget ?? 0);
      const padding = Number(counter.dataset.countPad ?? 0);
      counter.textContent = `${String(value).padStart(padding, "0")}${counter.dataset.countSuffix ?? ""}`;
    });

    if (reducedMotion) {
      finishCounters();
      return;
    }

    const split = new SplitText(headline, { type: "lines", linesClass: "intro-line-mask" });
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        onComplete: finishCounters,
      });
      timeline
        .fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .1, ease: "power4.out" })
        .fromTo(bronzeWords, { filter: "grayscale(1)" }, { filter: "grayscale(0)", duration: .65, stagger: .1 }, "-=.45")
        .fromTo(note, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.5")
        .fromTo(note.querySelector("[data-intro-note-rule]"), { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "power2.out" }, "-=.45")
        .fromTo(statsLine, { scaleX: 0 }, { scaleX: 1, duration: .7, ease: "power2.out" }, "-=.3")
        .fromTo(dividers, { scaleY: 0 }, { scaleY: 1, duration: .45, stagger: .12, ease: "power2.out" }, "-=.35");

      counters.forEach((counter) => {
        const target = Number(counter.dataset.countTarget ?? 0);
        const padding = Number(counter.dataset.countPad ?? 0);
        const state = { value: 0 };
        timeline.fromTo(state, { value: 0 }, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = `${String(Math.round(state.value)).padStart(padding, "0")}${counter.dataset.countSuffix ?? ""}`;
          },
        }, "-=.2");
      });

      if (photoImage) {
        gsap.fromTo(photo, { clipPath: "inset(0 0 0 100%)" }, {
          clipPath: "inset(0 0 0 0)",
          duration: 1.25,
          ease: "power3.inOut",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
        gsap.fromTo(photoImage, { scale: 1.08 }, {
          scale: 1,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
        gsap.to(photoImage, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, section);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return sectionRef;
}
