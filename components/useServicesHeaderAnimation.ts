"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useServicesHeaderAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const image = section.querySelector<HTMLElement>("[data-services-background]");
    const imageElement = image?.querySelector("img");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-services-eyebrow-line]");
    const eyebrow = section.querySelector<HTMLElement>("[data-services-eyebrow]");
    const heading = section.querySelector<HTMLElement>("[data-services-heading]");
    const highlight = section.querySelector<HTMLElement>("[data-services-highlight]");
    const description = section.querySelector<HTMLElement>("[data-services-description]");

    if (!image || !eyebrowLine || !eyebrow || !heading || !highlight || !description) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.fromTo(
        [image, eyebrow, heading, description],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.05, ease: "power1.out" },
      );
      return;
    }

    const split = new SplitText(heading, { type: "lines", linesClass: "services-headline-mask" });
    const kenBurns = gsap.to(image, {
      scale: 1.03,
      duration: 15,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });

    const context = gsap.context(() => {
      gsap.timeline()
        .fromTo(image, { scale: 1.12, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
        })
        .fromTo(eyebrowLine, { scaleX: 0 }, {
          scaleX: 1,
          duration: 0.55,
          ease: "power2.out",
        }, "-=.7")
        .fromTo(eyebrow, { opacity: 0, y: 10 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        }, "-=.05")
        .fromTo(highlight, { filter: "grayscale(1)" }, {
          filter: "grayscale(0)",
          duration: 0.6,
          ease: "power2.out",
        }, "-=.3")
        .fromTo(description, { opacity: 0, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=.25");

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => kenBurns.paused(!isActive),
      });

      gsap.to(image, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    if (imageElement && !imageElement.complete) {
      gsap.set(image, { opacity: 0 });
      const showImage = () => {
        if (section.isConnected) gsap.to(image, { opacity: 1, duration: 0.35 });
      };
      imageElement.addEventListener("load", showImage, { once: true });
      imageElement.addEventListener("error", showImage, { once: true });
    }

    return () => {
      kenBurns.kill();
      context.revert();
      split.revert();
    };
  }, []);

  return sectionRef;
}
