"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useApproachAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = section.querySelector<HTMLElement>("[data-approach-heading]");
    const label = section.querySelector<HTMLElement>("[data-approach-label]");
    const labelLine = section.querySelector<HTMLElement>("[data-approach-label-line]");
    const note = section.querySelector<HTMLElement>("[data-approach-note]");
    const back = section.querySelector<HTMLElement>("[data-approach-back]");
    const front = section.querySelector<HTMLElement>("[data-approach-front]");
    const arc = section.querySelector<SVGPathElement>("[data-approach-arc]");
    const script = section.querySelector<HTMLElement>(".approach-photo-script");
    const feeling = section.querySelector<HTMLElement>("[data-approach-feeling]");
    const dividers = section.querySelectorAll<HTMLElement>("[data-approach-divider]");
    const counters = section.querySelectorAll<HTMLElement>("[data-count-target]");
    if (!heading || !label || !labelLine || !back || !front || !arc || !script || !feeling) return;

    const finishCounters = () => counters.forEach((counter) => {
      const value = Number(counter.dataset.countTarget ?? 0);
      const padding = Number(counter.dataset.countPad ?? 0);
      counter.textContent = String(value).padStart(padding, "0");
    });

    if (reducedMotion) {
      finishCounters();
      gsap.set([label, labelLine, note, back, front, script, ...dividers], { clearProps: "all" });
      arc.style.strokeDashoffset = "0";
      return;
    }

    const split = new SplitText(heading, { type: "lines", linesClass: "approach-line-mask" });
    const arcLength = arc.getTotalLength();
    gsap.set(arc, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
    const photoImages = [back, front]
      .map((photo) => photo.querySelector("img"))
      .filter((image): image is HTMLImageElement => image !== null);
    let photoSectionEntered = false;
    let photoImagesReady = photoImages.every((image) => image.complete);
    let onPhotoImageStatus: EventListener | undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true, toggleActions: "play none none none" },
      });

      timeline
        .fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "power2.out" })
        .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, ease: "power3.out" }, "-=.25")
        .fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .1, ease: "power4.out" }, "-=.1")
        .fromTo(feeling, { filter: "grayscale(1)" }, { filter: "grayscale(0)", duration: .7, ease: "power2.out" }, "-=.35");

      if (note) {
        timeline.fromTo(note, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6, ease: "power3.out" }, "-=.75");
      }

      timeline
        .fromTo(dividers, { scaleY: 0 }, { scaleY: 1, duration: .5, stagger: .1, ease: "power2.out" });

      const photoTimeline = gsap.timeline({ paused: true });
      photoTimeline
        .fromTo(back, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .8, ease: "power3.out" })
        .fromTo(front, { opacity: 0, scale: 1.06, rotation: 0 }, { opacity: 1, scale: 1, rotation: 3, duration: .9, ease: "power3.out" }, "-=.55")
        .to(arc, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" }, "<")
        .fromTo(script, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" }, "-=.25");

      const startPhotoReveal = () => {
        if (photoSectionEntered && photoImagesReady) photoTimeline.play();
      };
      const handlePhotoImageStatus: EventListener = () => {
        photoImagesReady = photoImages.every((image) => image.complete);
        if (photoImagesReady) {
          photoImages.forEach((image) => {
            image.removeEventListener("load", handlePhotoImageStatus);
            image.removeEventListener("error", handlePhotoImageStatus);
          });
          startPhotoReveal();
        }
      };
      onPhotoImageStatus = handlePhotoImageStatus;
      if (!photoImagesReady) {
        photoImages.forEach((image) => {
          image.addEventListener("load", handlePhotoImageStatus);
          image.addEventListener("error", handlePhotoImageStatus);
        });
      }
      ScrollTrigger.create({
        trigger: back,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
        onEnter: () => {
          photoSectionEntered = true;
          startPhotoReveal();
        },
      });

      counters.forEach((counter) => {
        const target = Number(counter.dataset.countTarget ?? 0);
        const padding = Number(counter.dataset.countPad ?? 0);
        const state = { value: 0 };
        timeline.fromTo(state, { value: 0 }, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = String(Math.round(state.value)).padStart(padding, "0");
          },
        }, "-=.25");
      });

      gsap.to([back, front], {
        y: 4,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(arc, { rotation: 360, transformOrigin: "50% 50%", duration: 60, repeat: -1, ease: "none" });
      gsap.to(section.querySelector(".approach-photo-stack"), {
        yPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, section);

    return () => {
      const imageStatusListener = onPhotoImageStatus;
      if (imageStatusListener) {
        photoImages.forEach((image) => {
          image.removeEventListener("load", imageStatusListener);
          image.removeEventListener("error", imageStatusListener);
        });
      }
      context.revert();
      split.revert();
    };
  }, []);

  return sectionRef;
}
