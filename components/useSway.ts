"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import type { ServiceCard } from "@/lib/services";

export function useSway(cards: ServiceCard[]) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelinesRef = useRef<gsap.core.Tween[]>([]);
  const pausedRef = useRef(new Set<number>());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(section.querySelectorAll<HTMLElement>(".services-card-sway"));
    timelinesRef.current = elements.map((element, index) =>
      gsap.to(element, {
        rotation: index % 2 ? 1.2 : -1.2,
        duration: 3.5 + index * .45,
        delay: index * .22,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      }),
    );
    const observer = new IntersectionObserver(([entry]) => {
      timelinesRef.current.forEach((timeline, index) => {
        if (!entry.isIntersecting || pausedRef.current.has(index)) timeline.pause();
        else timeline.resume();
      });
    }, { threshold: .08 });
    observer.observe(section);
    return () => {
      observer.disconnect();
      timelinesRef.current.forEach((timeline) => timeline.kill());
      timelinesRef.current = [];
    };
  }, [cards.length]);

  const setPaused = useCallback((index: number, paused: boolean) => {
    const timeline = timelinesRef.current[index];
    if (paused) {
      pausedRef.current.add(index);
      timeline?.pause();
    } else {
      pausedRef.current.delete(index);
      if (sectionRef.current && sectionRef.current.getBoundingClientRect().bottom > 0 && sectionRef.current.getBoundingClientRect().top < window.innerHeight) {
        timeline?.resume();
      }
    }
  }, []);

  return { sectionRef, setPaused };
}
