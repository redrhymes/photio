"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { Testimonial } from "@/components/testimonials";

export function TestimonialQuote({
  testimonial,
  active,
}: {
  testimonial: Testimonial;
  active: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const quoteTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const quoteText = quoteTextRef.current;
    if (!quoteText || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const split = new SplitText(quoteText, {
      type: "lines",
      linesClass: "testimonial-quote-line",
    });
    gsap.set(split.lines, { yPercent: 110 });
    const tween = gsap.to(split.lines, {
      yPercent: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: quoteText,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reducedMotion]);

  return (
    <div className="testimonial-quote-stage" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        {active && (
          <motion.div
            key={testimonial.id}
            className="testimonial-quote-content"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: "easeOut" }}
          >
            <blockquote className="testimonial-blockquote">
              <p ref={quoteTextRef} className="testimonial-quote-text">
                “{testimonial.quote.plain}{" "}
                <i className="testimonial-quote-emphasis">{testimonial.quote.emphasis}</i>”
              </p>
              <footer className="testimonial-attribution" data-testimonial-attribution>
                <cite className="testimonial-couple">{testimonial.coupleNames}</cite>
                <span className="testimonial-location">
                  {testimonial.location} — {testimonial.shootType}
                </span>
                <span className="testimonial-attribution-rule" aria-hidden="true" />
              </footer>
            </blockquote>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
