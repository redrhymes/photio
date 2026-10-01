"use client";

import Image from "@/components/OptimizedImage";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { useCTAAnimation } from "@/components/useCTAAnimation";

export function FinalCTASection() {
  const sectionRef = useCTAAnimation();

  return (
    <section
      ref={sectionRef}
      id="cta"
      data-theme="dark"
      aria-label="Start a project with Photio"
      className="final-cta-section"
    >
      <div className="cta-background-layer" aria-hidden="true">
        <div className="cta-background-image" data-cta-background-image>
          <Image
            src="/images/portfolio/Event.jpg"
            alt=""
            fill
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="cta-background-photo"
          />
        </div>
      </div>
      <div className="cta-overlay" aria-hidden="true" />
      <div className="cta-content">
        <h2 className="cta-heading">
          <span className="cta-heading-mask">
            <span data-cta-headline-line>Have a story</span>
          </span>
          <span className="cta-heading-mask">
            <span data-cta-headline-line>
              worth <i data-cta-highlight>telling?</i>
            </span>
          </span>
        </h2>
        <p className="cta-tagline" data-cta-tagline>PHOTOGRAPHY &amp; FILM, MADE WITH INTENTION.</p>
        <div className="cta-primary-wrap">
          <MagneticButton
            href="/contact"
            variant="champagne"
            className="cta-primary"
            arrow={false}
          >
            <span>START A PROJECT</span>
            <ArrowRight size={16} aria-hidden="true" />
          </MagneticButton>
        </div>
        <a href="/portfolio" className="cta-secondary" data-cta-secondary>
          <span>OR VIEW OUR WORK</span>
          <span className="cta-secondary-underline" data-cta-underline aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
