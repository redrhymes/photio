"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clothespin } from "@/components/Clothespin";
import { PolaroidCard } from "@/components/PolaroidCard";
import { RopeStage } from "@/components/RopeStage";
import { useSway } from "@/components/useSway";
import { serviceCards } from "@/lib/services";

export function ServicesSection() {
  const { sectionRef, setPaused } = useSway(serviceCards);
  const [debug, setDebug] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDebug(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = section.querySelector<HTMLElement>("[data-services-rule]");
    const label = section.querySelector<HTMLElement>("[data-services-label]");
    const rope = section.querySelector<HTMLElement>(".services-rope-reveal");
    const words = section.querySelectorAll<HTMLElement>(".services-heading-word");
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".services-stage [data-service-card]"));
    const pins = section.querySelectorAll<HTMLElement>(".services-pin-front");

    if (reducedMotion) {
      gsap.set([line, label, rope, ...cards, ...pins], { clearProps: "all" });
      cards.forEach((card, index) => gsap.set(card, { rotation: serviceCards[index].rotation, opacity: 1, y: 0 }));
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
          onEnter: () => {
            cards.forEach((card) => {
              const image = card.querySelector<HTMLImageElement>("img");
              if (image) image.loading = "eager";
            });
          },
        },
      });
      timeline
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: .45, ease: "power2.out" }, 0)
        .fromTo(label, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .45, ease: "power3.out" }, .08)
        .fromTo(words, { yPercent: 110 }, {
          yPercent: 0,
          duration: .8,
          stagger: .05,
          ease: "power4.out",
        }, .12)
        .fromTo(rope, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0 0 0)",
          duration: .95,
          ease: "power2.inOut",
        }, .15);
      const stageWidth = stage.getBoundingClientRect().width;
      timeline.fromTo(cards, {
        y: -stageWidth * .1,
        rotation: (index) => serviceCards[index].rotation + (index % 2 === 0 ? 16 : -16),
      }, {
        y: 0,
        rotation: (index) => serviceCards[index].rotation,
        duration: 1.05,
        stagger: .1,
        ease: "power3.out",
      }, .35);
      timeline.fromTo(pins, { opacity: 0 }, {
        opacity: 1,
        duration: .3,
        stagger: .06,
      }, .55);
    }, section);

    return () => {
      context.revert();
    };
  }, [sectionRef]);

  useEffect(() => {
    const mobile = mobileRef.current;
    if (!mobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        mobile.classList.add("services-mobile--entered");
        observer.disconnect();
      }
    }, { threshold: .15 });
    observer.observe(mobile);
    return () => observer.disconnect();
  }, []);

  const onHoverChange = useCallback((index: number, active: boolean) => {
    setHovered((previous) => active ? index : previous === index ? null : previous);
    setPaused(index, active);
  }, [setPaused]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="dark"
      aria-label="Photio photography services"
      className={`services-section relative overflow-hidden bg-bg py-[8vh] text-text ${hovered !== null ? "services-hovering" : ""}`}
      data-hovered={hovered ?? ""}
    >
      <div ref={stageRef} className="services-stage mx-auto hidden">
        <div className="services-stage-heading">
          <span className="services-heading-rule" data-services-rule />
          <p className="services-stage-label" data-services-label>03 / WHAT WE DO</p>
          <h2 id="services-heading" data-services-heading className="display services-heading">
            <span className="services-heading-word">Stories</span><i className="services-heading-word">worth</i><span className="services-heading-word">remembering.</span>
          </h2>
        </div>
        <RopeStage cards={serviceCards} />
        <ul className="services-card-list" aria-label="Photography services">
          {serviceCards.map((service, index) => (
            <PolaroidCard key={service.id} service={service} index={index} onHoverChange={onHoverChange} />
          ))}
        </ul>
        {debug && serviceCards.flatMap((service) => [
          <span key={`debug-${service.id}-pin`} className="services-debug-cross" style={{ left: `${service.pinX}cqw`, top: `${service.pinY}cqw` }} aria-hidden="true">
            <span>{service.id} pin</span>
          </span>,
          <span key={`debug-${service.id}-pivot`} className="services-debug-cross" style={{ left: `${service.pinX}cqw`, top: `${service.pinY + 2.6}cqw` }} aria-hidden="true">
            <span>{service.id} pivot</span>
          </span>,
        ])}
      </div>

      <div ref={mobileRef} className="services-mobile">
        <div className="services-mobile-heading">
          <span className="services-heading-rule" />
          <p className="services-stage-label">03 / WHAT WE DO</p>
          <h2 className="display services-heading"><span className="services-heading-word">Stories</span><i className="services-heading-word">worth</i><span className="services-heading-word">remembering.</span></h2>
        </div>
        <div className="services-mobile-row-wrap">
          <ul className="services-card-list services-mobile-list" aria-label="Photography services">
            <li className="services-mobile-rope-item" aria-hidden="true">
              <svg className="services-mobile-rope" viewBox="0 0 400 1800" preserveAspectRatio="none">
                <path d="M210 0 C210 115 120 155 110 250 S285 365 280 470 S105 590 115 700 S285 815 280 925 S105 1040 115 1150 S285 1265 280 1375 S130 1510 205 1620 L205 1800" fill="none" stroke="#C9975E" strokeWidth="5" vectorEffect="non-scaling-stroke" />
                <path d="M210 0 C210 115 120 155 110 250 S285 365 280 470 S105 590 115 700 S285 815 280 925 S105 1040 115 1150 S285 1265 280 1375 S130 1510 205 1620 L205 1800" fill="none" stroke="#704c2e" strokeWidth="1.5" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
              </svg>
            </li>
            {serviceCards.map((service, index) => (
              <li
                key={service.id}
                className="services-mobile-item"
                data-service-card
                style={{ "--mobile-angle": `${[-6, 4, -3, 6][index]}deg` } as CSSProperties}
              >
                <div className="services-mobile-sway">
                  <Clothespin />
                  <Link href={`/services#${service.id}`} className="polaroid-paper group" aria-label={`${service.title.toLowerCase()}, view service`} data-cursor-label="VIEW">
                    <span className="polaroid-photo-window">
                      <Image src={service.image} alt={service.alt} fill sizes="60vw" quality={75} className="polaroid-photo object-cover" />
                      <span className="polaroid-photo-vignette" aria-hidden="true" />
                    </span>
                    <span className="polaroid-caption">
                      <span className="polaroid-index">{service.number}</span>
                      <span className="polaroid-caption-rule" />
                      <span className="polaroid-title">{service.titleLines.map((line) => <span key={line}>{line}</span>)}</span>
                      <svg className="polaroid-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
