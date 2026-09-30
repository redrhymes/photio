"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReelCard } from "@/components/ReelCard";
import { instagramUrl, reels } from "@/components/reels";

export function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<gsap.core.Tween | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startProgress: number; dragged: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const label = section.querySelector<HTMLElement>("[data-reels-label]");
    const labelLine = section.querySelector<HTMLElement>("[data-reels-label-line]");
    const heading = section.querySelector<HTMLElement>("[data-reels-heading]");
    const descriptor = section.querySelectorAll<HTMLElement>("[data-reels-descriptor]");
    const descriptorRule = section.querySelector<HTMLElement>("[data-reels-descriptor-rule]");
    const cards = section.querySelectorAll<HTMLElement>("[data-reel-card]");
    const footer = section.querySelector<HTMLElement>("[data-reels-footer]");
    const footerRule = section.querySelector<HTMLElement>("[data-reels-footer-rule]");
    if (!label || !labelLine || !heading || !footer || !footerRule || !descriptorRule) return;

    const headingWords = heading.querySelectorAll<HTMLElement>("[data-reels-heading-word]");
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.fromTo(section, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });
      timeline
        .fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" })
        .fromTo(label, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, "-=.2")
        .fromTo(headingWords, { yPercent: 110 }, {
          yPercent: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
        }, "-=.1")
        .fromTo(descriptorRule, { scaleY: 0 }, { scaleY: 1, duration: 0.45 }, "-=.45")
        .fromTo(descriptor, { opacity: 0, y: 8 }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
        }, "-=.25")
        .fromTo(cards, {
          clipPath: "inset(0 0 0 100%)",
          scale: 1.08,
        }, {
          clipPath: "inset(0 0 0 0)",
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        }, "-=.1")
        .fromTo(footerRule, { scaleX: 0 }, { scaleX: 1, duration: 0.55 }, "-=.2")
        .fromTo(footer, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=.2");

    }, section);

    if (!reducedMotion) {
      motionRef.current = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 48,
          ease: "none",
          repeat: -1,
          paused,
        },
      );
    }

    return () => {
      motionRef.current?.kill();
      motionRef.current = null;
      context.revert();
    };
  }, []);

  useEffect(() => {
    motionRef.current?.paused(paused);
  }, [paused]);

  const cards = (decorative: boolean) => (
    <div className="reels-track-group" aria-hidden={decorative}>
      {reels.map((reel) => (
        <div className="reel-track-item" key={reel.id} data-reel-card>
          <ReelCard reel={reel} decorative={decorative} />
        </div>
      ))}
    </div>
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const tween = motionRef.current;
    if (!tween) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startProgress: tween.progress(),
      dragged: false,
    };
    tween.pause();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const tween = motionRef.current;
    const track = trackRef.current;
    const group = track?.querySelector<HTMLElement>(".reels-track-group");
    if (!drag || !tween || !group || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.dragged = true;
    if (!drag.dragged) return;
    const loopWidth = group.getBoundingClientRect().width;
    if (loopWidth <= 0) return;
    const progress = ((drag.startProgress - delta / loopWidth) % 1 + 1) % 1;
    tween.progress(progress);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    suppressClickRef.current = drag.dragged;
    dragRef.current = null;
    if (!paused) motionRef.current?.paused(false);
  };

  return (
    <section
      ref={sectionRef}
      id="reels"
      data-theme="dark"
      aria-labelledby="reels-heading"
      className="reels-section"
    >
      <div className="reels-grain" aria-hidden="true" />
      <div className="reels-header">
        <div className="reels-heading-block">
          <p className="reels-label" data-reels-label>
            <span className="reels-label-line" data-reels-label-line aria-hidden="true" />
            <span>07 / &nbsp;FROM THE FRAME</span>
          </p>
          <h2 id="reels-heading" className="reels-heading" data-reels-heading>
            <span className="reels-heading-mask"><span data-reels-heading-word>Follow the</span></span>{" "}
            <span className="reels-heading-mask"><i data-reels-heading-word>stories.</i></span>
          </h2>
        </div>
        <div className="reels-descriptor">
          <span className="reels-descriptor-rule" data-reels-descriptor-rule aria-hidden="true" />
          <p>
            <span data-reels-descriptor>REAL PEOPLE.</span>
            <span data-reels-descriptor>REAL MOMENTS.</span>
            <span data-reels-descriptor>BEYOND THE ALBUM.</span>
          </p>
        </div>
      </div>

      <div
        className="reels-track-viewport"
        data-cursor-label="DRAG"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
      >
        <div ref={trackRef} className="reels-track">
          {cards(false)}
          {cards(true)}
        </div>
      </div>

      <div className="reels-footer" data-reels-footer>
        <span className="reels-footer-rule" data-reels-footer-rule aria-hidden="true" />
        <a className="reels-handle" href={instagramUrl} target="_blank" rel="noreferrer">
          <Instagram size={20} strokeWidth={1.6} aria-hidden="true" />
          <span>@PHOTIO</span>
        </a>
        <a className="reels-follow" href={instagramUrl} target="_blank" rel="noreferrer">
          <span>FOLLOW ON INSTAGRAM</span>
          <span className="reels-follow-arrow"><ArrowRight size={17} strokeWidth={1.3} /></span>
        </a>
      </div>
    </section>
  );
}
