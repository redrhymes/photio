"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, UIEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clothespin } from "@/components/Clothespin";
import { PolaroidCard } from "@/components/PolaroidCard";
import { RopeStage } from "@/components/RopeStage";
import { useSway } from "@/components/useSway";
import { serviceCards } from "@/lib/services";

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`services-sprig ${className}`} viewBox="0 0 76 112" aria-hidden="true">
      <path d="M8 106C26 80 38 54 65 8" fill="none" stroke="#a88748" strokeWidth="1.5" />
      <path d="M22 83C7 79 4 71 5 63c11 1 18 7 17 20Zm13-23c-1-13 5-19 14-23 4 10-1 18-14 23Zm13-24c-1-12 5-18 14-21 4 9-2 16-14 21Z" fill="#cbb78b" />
      <circle cx="65" cy="8" r="3" fill="#e8d8b2" />
      <circle cx="59" cy="14" r="2.4" fill="#d1b98a" />
    </svg>
  );
}

export function ServicesSection() {
  const { sectionRef, setPaused } = useSway(serviceCards);
  const [debug, setDebug] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
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

  const updateMobileIndex = useCallback((event: UIEvent<HTMLUListElement>) => {
    const row = event.currentTarget;
    const center = row.scrollLeft + row.clientWidth / 2;
    const cards = Array.from(row.querySelectorAll<HTMLElement>("[data-service-card]"));
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setMobileIndex(closestIndex);
  }, []);

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
        <Sprig className="services-desktop-sprig services-sprig-one" />
        <Sprig className="services-desktop-sprig services-sprig-two" />
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
          <Sprig className="services-mobile-sprig services-mobile-sprig-start" />
          <Sprig className="services-mobile-sprig services-mobile-sprig-end" />
          <ul className="services-card-list services-mobile-list" aria-label="Photography services" onScroll={updateMobileIndex}>
            <li className="services-mobile-rope-item" aria-hidden="true">
              <svg className="services-mobile-rope" viewBox="0 0 1600 180" preserveAspectRatio="none">
                <path d="M0 42 C280 42 320 148 610 148 S900 34 1200 34 S1400 120 1600 40" fill="none" stroke="#C9975E" strokeWidth="5" />
                <path d="M0 44 C280 44 320 150 610 150 S900 36 1200 36 S1400 122 1600 42" fill="none" stroke="#704c2e" strokeWidth="1.5" strokeDasharray="2 7" />
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
        <p className="services-mobile-counter" aria-live="polite">{String(mobileIndex + 1).padStart(2, "0")} / {String(serviceCards.length).padStart(2, "0")}</p>
      </div>
    </section>
  );
}
