"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceCard } from "@/lib/services";

export function useBreeze(sectionRef: RefObject<HTMLElement | null>, cards: ServiceCard[]) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let lastBreeze = 0;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.max(-6, Math.min(6, self.getVelocity() / 900));
        if (Math.abs(velocity - lastBreeze) < .25) return;
        lastBreeze = velocity;
        section.querySelectorAll<HTMLElement>(".services-stage [data-service-card]").forEach((card, index) => {
          if (section.dataset.hovered === String(index)) {
            gsap.killTweensOf(card, "rotation");
            return;
          }
          const rotation = cards[index].rotation + velocity * (index % 2 ? -1 : 1);
          gsap.to(card, { rotation, duration: .22, ease: "power2.out", overwrite: true, onComplete: () => {
            gsap.to(card, { rotation: cards[index].rotation, duration: .9, ease: "elastic.out(1, 0.4)", overwrite: true });
          } });
        });
      },
    });
    return () => trigger.kill();
  }, [cards, sectionRef]);
}
