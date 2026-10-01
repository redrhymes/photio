"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ServiceListRow } from "@/components/ServiceListRow";
import { ServiceCardStack } from "@/components/ServiceCardStack";
import { useCardStackTransition } from "@/components/useCardStackTransition";
import { serviceStories } from "@/lib/services";

export function ServicesListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeId, activate } = useCardStackTransition(serviceStories);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eyebrow = section.querySelector<HTMLElement>("[data-service-eyebrow]");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-service-eyebrow-line]");
    const heading = section.querySelector<HTMLElement>("[data-service-heading]");
    const rows = section.querySelectorAll<HTMLElement>("[data-service-row]");
    const cards = section.querySelectorAll<HTMLElement>("[data-service-stack-entrance]");
    if (!eyebrow || !eyebrowLine || !heading) return;

    if (reducedMotion) {
      gsap.fromTo(
        [eyebrow, heading, ...rows, ...cards],
        { opacity: 0 },
        { opacity: 1, duration: .35, stagger: .04, ease: "power1.out" },
      );
      return;
    }

    const split = new SplitText(heading, { type: "lines", linesClass: "service-list-headline-mask" });
    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
          toggleActions: "play none none none",
        },
      })
        .fromTo(eyebrowLine, { scaleX: 0 }, {
          scaleX: 1,
          duration: .55,
          ease: "power2.out",
        })
        .fromTo(eyebrow, { opacity: 0, y: 10 }, {
          opacity: 1,
          y: 0,
          duration: .5,
          ease: "power3.out",
        }, "-=.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: .12,
          ease: "power4.out",
        }, "-=.05")
        .fromTo(rows, { opacity: 0, y: 16 }, {
          opacity: 1,
          y: 0,
          duration: .55,
          stagger: .08,
          ease: "power3.out",
        }, "-=.25")
        .fromTo(cards, { opacity: 0, scale: .9 }, {
          opacity: 1,
          scale: 1,
          duration: .65,
          stagger: .1,
          ease: "power3.out",
          clearProps: "transform",
        }, "-=.65");
    }, section);

    return () => {
      context.revert();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-list"
      data-theme="light"
      className="services-list-section"
      aria-labelledby="services-list-heading"
    >
      <div className="services-list-layout">
        <div className="services-list-copy">
          <p className="services-list-eyebrow">
            <span className="services-list-eyebrow-line" data-service-eyebrow-line />
            <span data-service-eyebrow>Our services</span>
          </p>
          <h2 id="services-list-heading" className="services-list-heading display" data-service-heading>
            <span>Four ways to tell</span>
            <span><i>your story.</i></span>
          </h2>
          <div className="services-list-rows" role="group" aria-label="Choose a service to preview">
            {serviceStories.map((service) => (
              <ServiceListRow
                key={service.id}
                service={service}
                active={activeId === service.id}
                onActivate={activate}
              />
            ))}
          </div>
        </div>
        <ServiceCardStack
          services={serviceStories}
          activeId={activeId}
          onActivate={activate}
        />
      </div>
    </section>
  );
}
