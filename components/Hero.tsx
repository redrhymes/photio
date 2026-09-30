"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { HeroSlider, heroSlides } from "@/components/HeroSlider";
import { useHeroAnimation } from "@/components/useHeroAnimation";

const SLIDE_DURATION = 6000;

export function Hero() {
  const heroRef = useHeroAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = window.setTimeout(() => setActiveIndex((current) => (current + 1) % heroSlides.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, reducedMotion]);

  const goToNextSection = () => document.getElementById("approach")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  const slideNumber = String(activeIndex + 1).padStart(2, "0");

  return (
    <section
      ref={heroRef}
      data-theme="dark"
      className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink text-white md:min-h-[650px] sm:items-center"
      aria-label="Photio wedding and pre-wedding photography"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsPaused(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setIsPaused(false); }}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div data-hero-bg className="absolute inset-0 opacity-0">
        <HeroSlider activeIndex={activeIndex} isPaused={isPaused || reducedMotion} reducedMotion={reducedMotion} />
      </div>
      <div className="hero-overlay absolute inset-0 z-[1]" />

      <div className="hero-copy container relative z-10 px-6 pb-24 pt-28 sm:pb-16 sm:pt-24 md:px-12 xl:px-[88px]">
        <div className="pl-0 md:pl-12 xl:pl-0">
          <p data-hero-eyebrow className="eyebrow mb-7 flex items-center gap-5 text-white opacity-0 sm:mb-8 sm:gap-6 sm:text-[12px] sm:tracking-[.3em]">
            <span className="h-px w-[50px] shrink-0 bg-white/70" />
            <span>Photio — Wedding &amp; Pre-wedding Photography</span>
          </p>
          <h1 data-hero-headline className="display max-w-[1150px] text-[clamp(2.55rem,10vw,3.5rem)] leading-[1.02] tracking-[-.02em] sm:text-[clamp(3.25rem,5.5vw,5.5rem)]">
            <span className="md:whitespace-nowrap">Capturing <i data-hero-gold className="text-white">Love,</i></span>
            <br />
            <span className="md:whitespace-nowrap">Creating Memories.</span>
          </h1>
          <p data-hero-tagline className="mt-6 text-[13px] font-light tracking-[.22em] text-white/80 opacity-0 sm:mt-6 sm:text-[18px] sm:tracking-[.35em]">
            That click, wow!
          </p>
          <div className="mt-7 flex max-w-[620px] flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <div data-hero-button className="opacity-0">
              <MagneticButton href="/portfolio" variant="champagne" arrowDirection="right" className="hero-button h-[56px] min-h-[56px] w-full justify-between px-7 text-[11px] tracking-[.14em] sm:h-[60px] sm:min-h-[60px] sm:w-auto sm:gap-4 sm:px-10 sm:text-[13px]">
                View our work
              </MagneticButton>
            </div>
            <div data-hero-button className="opacity-0">
              <MagneticButton href="/contact" arrowDirection="right" className="hero-button hero-button-secondary h-[56px] min-h-[56px] w-full justify-between border-white/70 px-7 text-[11px] tracking-[.14em] text-white hover:bg-white hover:text-ink sm:h-[60px] sm:min-h-[60px] sm:w-auto sm:gap-4 sm:px-10 sm:text-[13px]">
                Book a shoot
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div data-hero-detail className="absolute bottom-7 left-6 z-10 opacity-0 sm:bottom-10 sm:left-[88px]">
        <div className="flex items-center gap-6">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show hero slide ${String(index + 1).padStart(2, "0")}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`eyebrow min-h-11 min-w-4 text-[10px] tracking-[.2em] transition-opacity ${index === activeIndex ? "text-white" : "text-white/40 hover:text-white/75"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="h-px w-[180px] bg-white/25">
          <span key={activeIndex} className={`hero-progress-fill block h-full origin-left bg-white ${isPaused || reducedMotion ? "[animation-play-state:paused]" : ""}`} style={{ animationDuration: `${SLIDE_DURATION}ms` }} />
        </div>
      </div>

      <button
        type="button"
        data-hero-detail
        onClick={goToNextSection}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center text-white/85 opacity-0 sm:flex"
        aria-label="Scroll to explore"
      >
        <span className="eyebrow mt-3 whitespace-nowrap text-[10px] tracking-[.25em]">Scroll to explore</span>
        <ChevronDown className="hero-chevron mt-2" size={15} strokeWidth={1} />
      </button>

      <button type="button" onClick={goToNextSection} className="absolute bottom-7 right-6 z-10 flex min-h-11 items-center gap-2 text-white/75 sm:hidden" aria-label="Scroll to explore">
        <span className="eyebrow text-[9px] tracking-[.16em]">Scroll</span><ArrowDown size={14} />
      </button>
    </section>
  );
}
