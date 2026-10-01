"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { works } from "@/lib/works";
import { WorkSlide } from "@/components/WorkSlide";
import { useCurvedTrack } from "@/components/useCurvedTrack";

export function WorkSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const slider = useCurvedTrack(works);
  const active = slider.activeIndex;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const heading = section.querySelector<HTMLElement>("[data-work-heading]");
    const controls = section.querySelectorAll<HTMLElement>("[data-work-control]");
    const panels = Array.from(section.querySelectorAll<HTMLElement>(".work-panel"));
    const gallery = section.querySelector<HTMLElement>(".work-gallery");
    const split = heading ? new SplitText(heading, { type: "lines", linesClass: "work-heading-line" }) : null;
    let panelImages: HTMLImageElement[] = [];
    let onPanelImageStatus: EventListener | undefined;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true });
      if (split) timeline.fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .12, ease: "power4.out" });
      timeline
        .fromTo(controls, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: .55, stagger: .08, ease: "power3.out" }, "-=.55")
        .fromTo(section.querySelectorAll("[data-work-progress]"), { scaleX: 0 }, {
          scaleX: 1,
          duration: .55,
          stagger: .08,
          ease: "power2.out",
          onComplete: () => gsap.set(section.querySelectorAll("[data-work-progress]"), { clearProps: "transform" }),
        }, "-=.65");

      const panelTimeline = gsap.timeline({ paused: true });
      panelTimeline.fromTo(panels, { x: 120, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: .1,
        ease: "power3.out",
        onComplete: () => gsap.set(panels, { clearProps: "opacity,x" }),
      });

      const handlePanelImageStatus: EventListener = () => {
        if (panelImages.every((image) => image.complete)) {
          panelImages.forEach((image) => {
            image.removeEventListener("load", handlePanelImageStatus);
            image.removeEventListener("error", handlePanelImageStatus);
          });
          panelTimeline.play();
        }
      };
      onPanelImageStatus = handlePanelImageStatus;
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
        onEnter: () => {
          timeline.play();
          if (!gallery) {
            panelImages = panels
              .slice(0, 1)
              .map((panel) => panel.querySelector("img"))
              .filter((image): image is HTMLImageElement => image !== null);
          } else {
            const bounds = gallery.getBoundingClientRect();
            panelImages = panels
              .filter((panel) => {
                const panelBounds = panel.getBoundingClientRect();
                return panelBounds.left < bounds.right && panelBounds.right > bounds.left;
              })
              .map((panel) => panel.querySelector("img"))
              .filter((image): image is HTMLImageElement => image !== null);
          }
          panelImages.forEach((image) => { image.loading = "eager"; });
          if (panelImages.every((image) => image.complete)) {
            panelTimeline.play();
          } else {
            panelImages.forEach((image) => {
              image.addEventListener("load", handlePanelImageStatus);
              image.addEventListener("error", handlePanelImageStatus);
            });
          }
        },
      });
    }, section);
    return () => {
      const listener = onPanelImageStatus;
      if (listener) {
        panelImages.forEach((image) => {
          image.removeEventListener("load", listener);
          image.removeEventListener("error", listener);
        });
      }
      context.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="selected-work-heading"
      className="selected-work relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0a] pb-7 pt-24 text-text sm:pb-9 sm:pt-28 lg:h-[100svh] lg:min-h-[760px]"
    >
      <div className="work-heading-row mx-auto flex w-full flex-col items-start justify-between gap-5 px-6 sm:px-10 md:flex-row md:items-end md:gap-8 lg:px-[90px]">
        <div className="work-title-group">
          <p className="work-kicker eyebrow">02 / Selected work</p>
          <h2 id="selected-work-heading" data-work-heading className="display text-[clamp(2.25rem,5vw,5.1rem)] leading-[.98] tracking-[-.025em]">
            Stories we&apos;ve<br />had the privilege to tell.
          </h2>
        </div>
        <aside className="work-heading-aside">
          <p>A selection of photographs and films created across weddings, brands, events and music.</p>
          <div className="work-story-count" aria-label={`Story ${active + 1} of ${works.length}`} aria-live="polite">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span className="work-story-count-total">/ {String(works.length).padStart(2, "0")} stories</span>
          </div>
        </aside>
      </div>

      <div
        ref={slider.galleryRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected photography and film stories"
        tabIndex={0}
        className="work-gallery relative mt-5 h-[48svh] min-h-[300px] max-h-[600px] w-full select-none sm:mt-8 sm:h-[52svh] lg:mt-5"
        onPointerDown={slider.onPointerDown}
        onPointerMove={slider.onPointerMove}
        onPointerUp={slider.onPointerUp}
        onPointerCancel={slider.onPointerUp}
        onWheel={slider.onWheel}
        onKeyDown={slider.onKeyDown}
        onClickCapture={slider.onClickCapture}
      >
        <div ref={slider.trackRef} className="work-track absolute inset-y-0 left-0 flex items-stretch gap-3 sm:gap-6">
          {works.map((work, index) => (
            <WorkSlide key={work.slug} work={work} index={index} active={active === index} onMeasure={slider.measurePanel} />
          ))}
        </div>
        <button type="button" onClick={() => slider.goToAdjacent(-1)} disabled={active === 0} aria-label="Previous story" className="work-gallery-arrow work-gallery-arrow-left" data-work-control><ArrowLeft size={19} /></button>
        <button type="button" onClick={() => slider.goToAdjacent(1)} disabled={active === works.length - 1} aria-label="Next story" className="work-gallery-arrow work-gallery-arrow-right" data-work-control><ArrowRight size={19} /></button>
      </div>

      <div className="mx-auto mt-auto flex w-full flex-col items-center justify-between gap-5 px-6 pt-5 sm:px-10 md:flex-row lg:px-[90px]">
        <div className="flex items-center justify-center gap-3" aria-label="Choose a story">
          {works.map((work, index) => (
            <button key={work.slug} type="button" onClick={() => slider.goTo(index)} aria-label={`Go to story ${index + 1}`} aria-current={active === index ? "true" : undefined} className="work-progress relative h-[2px] w-12 overflow-hidden bg-white/25 sm:w-16 md:w-20">
              <span data-work-progress className={`absolute inset-y-0 left-0 block origin-left bg-champagne transition-transform duration-500 ${active === index ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
        <Link href="/portfolio" className="work-all-link eyebrow relative flex min-h-11 items-center gap-3 text-[10px] tracking-[.2em] text-white sm:text-xs">
          View all stories <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
