"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FramingPhotos } from "@/components/FramingPhotos";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { AvatarCarousel } from "@/components/AvatarCarousel";
import { googleReviewsUrl, testimonials } from "@/components/testimonials";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeTestimonial = testimonials[activeIndex];

  const selectTestimonial = useCallback((index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
    setInteracted(true);
  }, []);
  const previous = useCallback(() => selectTestimonial(activeIndex - 1), [activeIndex, selectTestimonial]);
  const next = useCallback(() => selectTestimonial(activeIndex + 1), [activeIndex, selectTestimonial]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const label = section.querySelector<HTMLElement>("[data-testimonial-label]");
    const rule = section.querySelector<HTMLElement>("[data-testimonial-label-rule]");
    const frames = section.querySelectorAll<HTMLElement>("[data-testimonial-frame]");
    const quoteMark = section.querySelector<HTMLElement>("[data-testimonial-mark]");
    const quoteLines = section.querySelectorAll<HTMLElement>("[data-testimonial-quote-line]");
    const quoteEmphasis = section.querySelector<HTMLElement>(".testimonial-quote-emphasis");
    const attribution = section.querySelector<HTMLElement>("[data-testimonial-attribution]");
    const avatars = section.querySelectorAll<HTMLElement>("[data-testimonial-avatar]");
    const trust = section.querySelector<HTMLElement>("[data-testimonial-trust]");
    if (!label || !rule || !quoteMark || !trust || !quoteEmphasis || !attribution) return;

    if (reducedMotion) {
      gsap.fromTo(section, { opacity: 0 }, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: { trigger: section, start: "top 80%", once: true, toggleActions: "play none none none" },
      });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true, toggleActions: "play none none none" },
      });
      timeline
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.out" })
        .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=.25")
        .fromTo(frames, (index: number) => ({
          x: index === 0 ? -80 : 80,
          opacity: 0,
          rotation: index === 0 ? -13 : 11,
        }), (index: number) => ({
          x: 0,
          opacity: 1,
          rotation: index === 0 ? -8 : 6,
          duration: 1.1,
          ease: "power3.out",
        }), "-=.1")
        .fromTo(quoteMark, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=.55")
        .fromTo(quoteLines, { scaleX: 0 }, {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=.3")
        .fromTo(quoteEmphasis, { filter: "grayscale(1)" }, {
          filter: "grayscale(0)",
          duration: 0.55,
          ease: "power2.out",
        }, "-=.1")
        .fromTo(attribution, { opacity: 0, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }, "-=.2")
        .fromTo(avatars, { opacity: 0, y: 10 }, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        }, "-=.15")
        .fromTo(trust, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, "-=.15");

      gsap.to(frames, {
        y: (index: number) => index === 0 ? -4 : 4,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.3,
      });

      const stars = section.querySelectorAll<HTMLElement>("[data-testimonial-star]");
      gsap.fromTo(stars, { scale: 0.7 }, {
        scale: 1,
        duration: 0.35,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: { trigger: trust, start: "top 90%", once: true, toggleActions: "play none none none" },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hovered || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(next, interacted ? 9000 : 7000);
    return () => window.clearTimeout(timer);
  }, [inView, hovered, paused, interacted, activeIndex, next]);

  useEffect(() => {
    if (!interacted) return;
    const timer = window.setTimeout(() => setInteracted(false), 9000);
    return () => window.clearTimeout(timer);
  }, [interacted, activeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-theme="light"
      aria-label="Customer testimonials"
      className="testimonials-section"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="testimonials-grain" aria-hidden="true" />
      <FramingPhotos />
      <p className="testimonials-label" data-testimonial-label>
        <span className="testimonials-label-rule" data-testimonial-label-rule aria-hidden="true" />
        <span>06 / &nbsp;KIND WORDS</span>
      </p>

      <div
        className="testimonials-content"
        onKeyDown={handleKeyDown}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          if (start !== null && end !== undefined && Math.abs(end - start) > 45) {
            if (end < start) next();
            else previous();
          }
          touchStartX.current = null;
        }}
      >
        <div className="testimonial-quote-mark" data-testimonial-mark aria-hidden="true">
          <span className="testimonial-quote-line-side" data-testimonial-quote-line />
          <span>“</span>
          <span className="testimonial-quote-line-side" data-testimonial-quote-line />
        </div>
        <TestimonialQuote testimonial={activeTestimonial} active />
        <AvatarCarousel
          items={testimonials}
          activeIndex={activeIndex}
          onSelect={selectTestimonial}
          onPrevious={previous}
          onNext={next}
        />
      </div>

      <div
        className="testimonials-trust"
        data-testimonial-trust
      >
        <div className="testimonial-trust-rule" aria-hidden="true" />
        <div className="testimonial-trust-row">
          <div className="testimonial-rating" role="img" aria-label="Rated 5 out of 5 stars on Google">
            <div className="testimonial-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} data-testimonial-star fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>RATED 5 STARS ON GOOGLE</span>
          </div>
          <span className="testimonial-trust-divider" aria-hidden="true" />
          <a
            className="testimonial-reviews-link"
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>READ OUR REVIEWS</span>
            <span className="testimonial-reviews-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
