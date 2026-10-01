"use client";

import type { MouseEvent } from "react";
import Image from "@/components/OptimizedImage";
import { projects } from "@/lib/content";
import { usePortfolioHeaderAnimation } from "@/components/usePortfolioHeaderAnimation";

export function PortfolioHeader() {
  const sectionRef = usePortfolioHeaderAnimation(projects.length);

  const scrollToGrid = (event: MouseEvent<HTMLAnchorElement>) => {
    const grid = document.getElementById("portfolio-grid-anchor");
    if (!grid) return;
    event.preventDefault();
    grid.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio-header"
      data-theme="dark"
      className="portfolio-header"
      aria-labelledby="portfolio-heading"
    >
      <div className="portfolio-header-background" data-portfolio-background>
        <Image
          src="/images/home/portfolio.png"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="portfolio-header-image"
        />
      </div>
      <div className="portfolio-header-overlay" aria-hidden="true" />

      <div className="portfolio-header-content">
        <div className="portfolio-header-copy">
          <p className="portfolio-header-eyebrow">
            <span className="portfolio-header-eyebrow-line" data-portfolio-eyebrow-line />
            <span data-portfolio-eyebrow>Photography &amp; Film</span>
          </p>
          <h1 id="portfolio-heading" className="portfolio-header-heading" data-portfolio-heading>
            <span>Every story,</span>
            <span><i data-portfolio-highlight>told differently.</i></span>
          </h1>
          <p className="portfolio-header-subcopy" data-portfolio-subcopy>
            Selected photographs and films from weddings, brand projects, live events and music — each shaped around its own people, place and purpose.
          </p>
          <div className="portfolio-header-stat" data-portfolio-stat>
            <span className="portfolio-header-stat-divider" data-portfolio-stat-divider aria-hidden="true" />
            <div>
              <span className="portfolio-header-stat-count" data-portfolio-count>{projects.length}</span>
              <span className="portfolio-header-stat-label">Selected projects</span>
            </div>
          </div>
        </div>
      </div>

      <a
        className="portfolio-header-scroll"
        href="#portfolio-grid-anchor"
        aria-label="Scroll to portfolio grid"
        onClick={scrollToGrid}
      >
        <span>Scroll to explore</span>
        <span className="portfolio-header-scroll-arrow" data-portfolio-scroll-arrow aria-hidden="true">
          <svg viewBox="0 0 16 44" fill="none">
            <path d="M8 0v41m0 0 6-7m-6 7-6-7" />
          </svg>
        </span>
      </a>
    </section>
  );
}
