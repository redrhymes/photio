"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";
import { FinalCTASection } from "@/components/FinalCTASection";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import type { ServicePageEntry } from "@/lib/service-page-data";

type Props = { service: ServicePageEntry };

export function ServicePage({ service }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = root.querySelector<HTMLElement>("[data-service-hero-heading]");
    const kicker = root.querySelector<HTMLElement>(".service-detail-kicker");
    const image = root.querySelector<HTMLElement>("[data-service-hero-image]");
    const hero = root.querySelector<HTMLElement>("[data-service-hero]");
    const splits: SplitText[] = [];
    const context = gsap.context(() => {
      if (heading && !reducedMotion) {
        const split = new SplitText(heading, { type: "lines", linesClass: "service-detail-heading-mask" });
        splits.push(split);
        gsap.fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: .12,
          ease: "power4.out",
          scrollTrigger: { trigger: hero, start: "top 72%", once: true },
        });
      }
      if (kicker) {
        gsap.fromTo(kicker, { opacity: 0, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? .3 : .6,
          ease: "power3.out",
          scrollTrigger: { trigger: hero, start: "top 72%", once: true },
        });
      }
      if (image) {
        gsap.fromTo(image, reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }, {
          opacity: 1,
          scale: 1,
          duration: reducedMotion ? .35 : 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: hero, start: "top 75%", once: true },
        });
      }
      root.querySelectorAll<HTMLElement>("[data-service-detail-section]").forEach((section) => {
        const pieces = section.querySelectorAll<HTMLElement>("[data-service-reveal]");
        if (!pieces.length) return;
        gsap.fromTo(pieces, { opacity: 0, y: reducedMotion ? 8 : 20 }, {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? .35 : .7,
          stagger: reducedMotion ? .02 : .1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      });
    }, root);
    return () => {
      context.revert();
      splits.forEach((split) => split.revert());
    };
  }, [service.slug]);

  return (
    <div ref={pageRef} className="service-detail-page">
      <section className="service-detail-hero" data-service-hero>
        <div className="service-detail-hero-image" data-service-hero-image>
          <Image src={service.heroImage} alt="" fill priority sizes="(max-width: 767px) 60vw, 40vw" />
        </div>
        <div className="service-detail-hero-shade" aria-hidden="true" />
        <div className="service-detail-hero-content">
          <nav className="service-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page">{service.breadcrumb}</span>
          </nav>
          <p className="service-detail-kicker" data-service-reveal>Photio / Visual stories</p>
          <h1 className="service-detail-hero-heading display" data-service-hero-heading>
            <span>{service.heroTitle[0]}</span>
            <span>{service.heroTitle[1]}</span>
          </h1>
          <a className="service-detail-scroll" href="#approach">
            <span>Our services</span>
            <span className="service-detail-scroll-icon"><ArrowDown size={15} aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <div id="approach" className="service-detail-approach-anchor">
        <ServiceOfferings service={service} />
      </div>

      <section className="service-detail-trends service-detail-section" data-service-detail-section>
        <div className="service-detail-trends-intro" data-service-reveal>
          <p className="service-detail-eyebrow">A thoughtful perspective</p>
          <h2 className="service-detail-heading display">{service.trendsTitle}</h2>
          <p>{service.trendsDescription}</p>
        </div>
        <div className="service-trend-list">
          {service.trends.map((trend, index) => (
            <article className="service-trend-row" data-service-reveal key={trend.title}>
              <span className="service-trend-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{trend.title}</h3>
              <p>{trend.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail-ideas service-detail-section" data-service-detail-section>
        <div className="service-detail-ideas-heading" data-service-reveal>
          <p className="service-detail-eyebrow">Make it your own</p>
          <h2 className="service-detail-heading display">{service.ideasTitle}</h2>
        </div>
        <div className="service-ideas-grid">
          {service.ideas.map((idea, index) => (
            <article className="service-idea" data-service-reveal key={idea.title}>
              <span className="service-idea-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              {idea.details && (
                <ul>{idea.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              )}
              <span className="service-idea-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}
