"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProcessStepData } from "@/components/process";
import { StepPhoto } from "@/components/StepPhoto";

export function ProcessStep({
  step,
  index,
}: {
  step: ProcessStepData;
  index: number;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = textRef.current;
    if (!block) return;
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = block.querySelectorAll<HTMLElement>("[data-step-part]");
    const context = gsap.context(() => {
      gsap.fromTo(
        parts,
        { y: reducedMotion ? 8 : 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reducedMotion ? 0.45 : 0.65,
          stagger: reducedMotion ? 0.05 : 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 82%", once: true, toggleActions: "play none none none" },
        },
      );
    }, block);
    return () => context.revert();
  }, []);

  return (
    <li className={`process-step process-step-${index + 1}`}>
      <div className="process-step-photo">
        <StepPhoto step={step} index={index} />
      </div>
      <div ref={textRef} className="process-step-copy">
        <div className="process-step-main">
          <span
            className={`process-step-number${index % 2 === 0 ? " is-bronze" : ""}`}
            data-step-part
            aria-hidden="true"
          >
            {step.number}
          </span>
          <h3 className="process-step-title" data-step-part>{step.title}</h3>
          <p className="process-step-body" data-step-part>{step.body}</p>
        </div>
      </div>
    </li>
  );
}
