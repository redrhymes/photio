"use client";

import Image from "@/components/OptimizedImage";

export type HeroSlideItem = { src: string; alt: string };

export const heroSlides: HeroSlideItem[] = [
  { src: "/images/home/hero1.png", alt: "A sunlit peach courtyard with sculpted arches and garden trees" },
  { src: "/images/home/hero2.webp", alt: "A leafy outdoor wedding set beneath mature trees, dressed with white hanging decorations" },
  { src: "/images/home/hero3.png", alt: "A flower-covered brick arch leading into a warm stone courtyard" },
];

export function HeroSlider({ activeIndex, isPaused, reducedMotion }: { activeIndex: number; isPaused: boolean; reducedMotion: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${isPaused ? "[&_.hero-kenburns]:[animation-play-state:paused]" : ""}`}>
      {heroSlides.map((slide, index) => (
        <div key={slide.src} className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}>
          <Image
            key={`${slide.src}-${activeIndex === index}`}
            src={slide.src}
            alt={activeIndex === index ? slide.alt : ""}
            fill
            priority={index === 0}
            sizes="(max-width: 1920px) 100vw, 1920px"
            quality={80}
            className={`hero-image object-cover ${activeIndex === index && !reducedMotion ? "hero-kenburns" : ""}`}
            style={{ objectPosition: index === 0 ? "center center" : "center 42%" }}
          />
        </div>
      ))}
    </div>
  );
}
