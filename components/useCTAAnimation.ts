"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useCTAAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const background = section.querySelector<HTMLElement>("[data-cta-background-image]");
    const label = section.querySelector<HTMLElement>("[data-cta-tagline]");
    const headlineLines = section.querySelectorAll<HTMLElement>("[data-cta-headline-line]");
    const highlight = section.querySelector<HTMLElement>("[data-cta-highlight]");
    const button = section.querySelector<HTMLElement>("[data-cta-button]");
    const secondary = section.querySelector<HTMLElement>("[data-cta-secondary]");
    const underline = section.querySelector<HTMLElement>("[data-cta-underline]");
    if (!background || !label || !headlineLines.length || !highlight || !button || !secondary || !underline) return;

    if (reducedMotion) {
      gsap.fromTo(section, { opacity: 0 }, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });
      return;
    }

    const idleDrift = gsap.to(background, {
      scale: 1.04,
      duration: 14,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
          onToggle: ({ isActive }) => idleDrift.paused(!isActive),
        },
      });
      timeline
        .fromTo(background, { scale: 1.15, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
        })
        .fromTo(headlineLines, { yPercent: 110 }, {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
        }, "-=.8")
        .fromTo(highlight, { filter: "grayscale(1)" }, {
          filter: "grayscale(0)",
          duration: 0.55,
          ease: "power2.out",
        }, "-=.2")
        .fromTo(label, { opacity: 0, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=.45")
        .fromTo(button, { opacity: 0, scale: 0.85 }, {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.4)",
        }, "+=.15")
        .fromTo(secondary, { opacity: 0, y: 10 }, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }, "-=.1")
        .fromTo(underline, { scaleX: 0 }, {
          scaleX: 1,
          duration: 0.45,
          ease: "power2.out",
        }, "<");

      gsap.to(section.querySelector(".cta-background-layer"), {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      idleDrift.kill();
      context.revert();
    };
  }, []);

  return sectionRef;
}
