"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { featuredStories } from "@/lib/featuredStories";

export function useFeaturedStoryTransition(total: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const preloadedImagesRef = useRef(new Map<string, HTMLImageElement>());
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || featuredStories.length < 2) return;

    const preloadAdjacentImages = () => {
      const adjacentIndexes = [
        (index + 1) % featuredStories.length,
        (index - 1 + featuredStories.length) % featuredStories.length,
      ];
      adjacentIndexes.forEach((adjacentIndex) => {
        const src = featuredStories[adjacentIndex]?.heroImage;
        if (!src || preloadedImagesRef.current.has(src)) return;
        const image = new window.Image();
        image.decoding = "async";
        image.fetchPriority = "low";
        image.src = src;
        preloadedImagesRef.current.set(src, image);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        preloadAdjacentImages();
        observer.disconnect();
      }
    }, { rootMargin: "1000px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const imageStage = imageStageRef.current;
    if (!section || !copy || !imageStage) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const eyebrow = section.querySelector<HTMLElement>("[data-featured-eyebrow]");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-featured-eyebrow-line]");
    const heading = section.querySelector<HTMLElement>("[data-featured-heading]");
    const highlight = section.querySelector<HTMLElement>("[data-featured-highlight]");
    const details = section.querySelectorAll<HTMLElement>("[data-featured-detail]");
    if (!eyebrow || !eyebrowLine || !heading || !highlight) return;

    const split = new SplitText(heading, { type: "lines", linesClass: "featured-story-line-mask" });
    splitRef.current = split;
    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
      })
        .fromTo(eyebrowLine, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.out" })
        .fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        }, "-=.05")
        .fromTo(highlight, { filter: "grayscale(1)" }, { filter: "grayscale(0)", duration: 0.6         }, "-=.3")
        .fromTo(details, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power3.out" }, "-=.25")
        .fromTo(imageStage, { clipPath: "inset(0 0 0 100%)", scale: 1.12 }, {
          clipPath: "inset(0 0 0 0)",
          scale: 1,
          duration: 1.3,
          ease: "power3.inOut",
        }, "-=1.3");
    }, section);

    return () => {
      context.revert();
      split.revert();
      splitRef.current = null;
    };
  }, []);

  const transition = useCallback((direction: number) => {
    if (total < 1 || isTransitioningRef.current) return;
    const nextIndex = (currentIndexRef.current + direction + total) % total;
    if (nextIndex === currentIndexRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const copy = copyRef.current;
    if (reducedMotion || !copy) {
      currentIndexRef.current = nextIndex;
      setIndex(nextIndex);
      return;
    }

    isTransitioningRef.current = true;
    gsap.to(copy, {
      opacity: 0,
      y: -8,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        splitRef.current?.revert();
        splitRef.current = null;
        currentIndexRef.current = nextIndex;
        setIndex(nextIndex);
        gsap.fromTo(copy, { opacity: 0, y: 8 }, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.12,
          ease: "power3.out",
          onComplete: () => { isTransitioningRef.current = false; },
        });
      },
    });
  }, [total]);

  const onPrevious = useCallback(() => transition(-1), [transition]);
  const onNext = useCallback(() => transition(1), [transition]);

  return {
    sectionRef,
    copyRef,
    imageStageRef,
    index,
    onPrevious,
    onNext,
  };
}
