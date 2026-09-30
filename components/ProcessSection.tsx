"use client";

import Image from "@/components/OptimizedImage";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ProcessStep } from "@/components/ProcessStep";
import { TimelinePath } from "@/components/TimelinePath";
import { processSteps } from "@/components/process";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const label = section.querySelector<HTMLElement>("[data-process-label]");
    const labelLine = section.querySelector<HTMLElement>("[data-process-label-line]");
    const heading = section.querySelector<HTMLElement>("[data-process-heading]");
    const highlight = section.querySelector<HTMLElement>("[data-process-highlight]");
    const copy = section.querySelector<HTMLElement>("[data-process-subcopy]");
    const hero = section.querySelector<HTMLElement>("[data-process-hero]");
    if (!label || !labelLine || !heading || !copy || !hero) return;

    const split = reducedMotion
      ? null
      : new SplitText(heading, { type: "lines", linesClass: "process-heading-line" });
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.fromTo([label, copy], { opacity: 0 }, {
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          scrollTrigger: { trigger: section, start: "top 65%", once: true },
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 65%", once: true },
      });
      timeline
        .fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.out" })
        .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=.25")
        .fromTo(split?.lines ?? [], { yPercent: 110 }, {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        }, "-=.1")
        .fromTo(highlight, { filter: "grayscale(1)" }, {
          filter: "grayscale(0)",
          duration: 0.7,
          ease: "power2.out",
        }, "-=.35")
        .fromTo(copy, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, "-=.5")
        .fromTo(hero, {
          clipPath: "inset(100% 0 0 0)",
          scale: 1.1,
        }, {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        }, "-=.3");
    }, section);

    return () => {
      context.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      data-theme="light"
      aria-labelledby="process-heading"
      className="process-section"
    >
      <div className="process-leaf-shadow" aria-hidden="true" />
      <div className="process-layout">
        <div className="process-intro">
          <p className="process-label" data-process-label>
            <span className="process-label-line" data-process-label-line aria-hidden="true" />
            <span>05 / &nbsp;THE PROCESS</span>
          </p>
          <h2 id="process-heading" className="process-heading" data-process-heading>
            <span>From first idea</span>
            <span>to <i data-process-highlight>final frame.</i></span>
          </h2>
          <p className="process-subcopy" data-process-subcopy>
            A SIMPLE, COLLABORATIVE PROCESS DESIGNED TO MAKE YOUR EXPERIENCE EFFORTLESS AND MEANINGFUL.
          </p>
          <div className="process-hero-wrap">
            <div className="process-hero-image" data-process-hero>
              <Image
                src="/images/portfolio/FB_IMG_1738550506030.jpg"
                alt="A couple walking away together up palace steps"
                fill
                sizes="(max-width: 767px) 74vw, (max-width: 1279px) 40vw, 25vw"
                className="process-hero-photo"
              />
            </div>
          </div>
        </div>

        <div className="process-steps-wrap">
          <TimelinePath />
          <ol className="process-steps">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
