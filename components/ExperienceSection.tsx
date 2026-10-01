"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ExperienceStep } from "@/components/ExperienceStep";
import { TimelineLine } from "@/components/TimelineLine";
import { experienceSteps } from "@/lib/experience";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eyebrow = section.querySelector<HTMLElement>("[data-experience-eyebrow]");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-experience-eyebrow-line]");
    const heading = section.querySelector<HTMLElement>("[data-experience-heading]");
    const description = section.querySelector<HTMLElement>("[data-experience-intro-description]");
    const timeline = section.querySelector<HTMLElement>("[data-experience-timeline]");
    const line = section.querySelector<SVGPathElement>("[data-experience-timeline-path]");
    if (!eyebrow || !eyebrowLine || !heading || !description || !timeline || !line) return;

    let split: SplitText | undefined;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(line, { strokeDasharray: "1000", strokeDashoffset: "0" });
        gsap.fromTo(
          [eyebrow, heading, description],
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: .4,
            stagger: .08,
            ease: "power1.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          },
        );
        gsap.fromTo(
          section.querySelectorAll<HTMLElement>("[data-experience-step-copy], [data-experience-number]"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: .4,
            stagger: .08,
            ease: "power1.out",
            scrollTrigger: { trigger: timeline, start: "top 75%", once: true },
          },
        );
        return;
      }

      split = new SplitText(heading, {
        type: "lines",
        linesClass: "experience-heading-mask",
      });
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
          toggleActions: "play none none none",
        },
      });
      intro
        .fromTo(eyebrowLine, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "power2.out" })
        .fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5 }, "-=.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: .12,
          ease: "power4.out",
        }, "-=.05")
        .fromTo(description, { opacity: 0, y: 16 }, {
          opacity: 1,
          y: 0,
          duration: .6,
          ease: "power3.out",
        }, "-=.25");

      gsap.set(line, { strokeDasharray: "1000", strokeDashoffset: "1000" });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      });

      const steps = section.querySelectorAll<HTMLElement>("[data-experience-step]");
      steps.forEach((step) => {
        const marker = step.querySelector<HTMLElement>(".experience-step-marker");
        const content = step.querySelectorAll<HTMLElement>(
          "[data-experience-number], [data-experience-title], [data-experience-description]",
        );
        const stepTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            once: true,
            toggleActions: "play none none none",
          },
        });
        if (marker) {
          stepTimeline.fromTo(marker, { scale: 0, opacity: 0 }, {
            scale: 1,
            opacity: 1,
            duration: .45,
            ease: "back.out(1.6)",
          });
        }
        stepTimeline.fromTo(content, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: .55,
          stagger: .08,
          ease: "power3.out",
        }, marker ? "-=.2" : 0);
      });
    }, section);

    return () => {
      context.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-theme="light"
      className="experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="experience-layout">
        <div className="experience-intro">
          <p className="experience-eyebrow">
            <span className="experience-eyebrow-line" data-experience-eyebrow-line aria-hidden="true" />
            <span data-experience-eyebrow>The experience</span>
          </p>
          <h2 id="experience-heading" className="experience-heading display" data-experience-heading>
            <span>From first idea</span>
            <span>to <i>final frame.</i></span>
          </h2>
          <p className="experience-intro-description" data-experience-intro-description>
            A simple, collaborative process designed to make your experience effortless and meaningful.
          </p>
        </div>
        <div className="experience-timeline" data-experience-timeline>
          <TimelineLine />
          <ol className="experience-steps">
            {experienceSteps.map((step) => <ExperienceStep key={step.number} step={step} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
