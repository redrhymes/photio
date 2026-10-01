"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FAQItem } from "@/components/FAQItem";
import { useFAQAccordion } from "@/components/useFAQAccordion";
import { faqEntries } from "@/lib/faq";

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openId, toggle } = useFAQAccordion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eyebrow = section.querySelector<HTMLElement>("[data-faq-eyebrow]");
    const eyebrowLine = section.querySelector<HTMLElement>("[data-faq-eyebrow-line]");
    const heading = section.querySelector<HTMLElement>("[data-faq-heading]");
    const description = section.querySelector<HTMLElement>("[data-faq-description]");
    const rows = section.querySelectorAll<HTMLElement>("[data-faq-row]");
    if (!eyebrow || !eyebrowLine || !heading || !description) return;

    let split: SplitText | undefined;
    const context = gsap.context(() => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      if (reducedMotion) {
        intro
          .fromTo([eyebrow, heading, description], { opacity: 0 }, {
            opacity: 1,
            duration: .35,
            stagger: .05,
            ease: "power1.out",
          })
          .fromTo(rows, { opacity: 0 }, {
            opacity: 1,
            duration: .3,
            stagger: .04,
            ease: "power1.out",
          }, "-=.1");
        return;
      }

      split = new SplitText(heading, {
        type: "lines",
        linesClass: "faq-heading-mask",
      });
      intro
        .fromTo(eyebrowLine, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "power2.out" })
        .fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5 }, "-=.2")
        .fromTo(split.lines, { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: .12,
          ease: "power4.out",
        }, "-=.05")
        .fromTo(description, { opacity: 0, y: 16 }, {
          opacity: 1,
          y: 0,
          duration: .55,
          ease: "power3.out",
        }, "-=.2")
        .fromTo(rows, { opacity: 0, y: 16 }, {
          opacity: 1,
          y: 0,
          duration: .5,
          stagger: .06,
          ease: "power3.out",
        }, "-=.15");
    }, section);

    return () => {
      context.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-theme="dark"
      className="faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="faq-layout">
        <div className="faq-intro">
          <p className="faq-eyebrow">
            <span className="faq-eyebrow-line" data-faq-eyebrow-line aria-hidden="true" />
            <span data-faq-eyebrow>Questions</span>
          </p>
          <h2 id="faq-heading" className="faq-heading display" data-faq-heading>
            <span>Before we make</span>
            <span><i>something beautiful.</i></span>
          </h2>
          <p className="faq-description" data-faq-description>
            Here are a few things people often ask us before we work together.
          </p>
        </div>
        <div className="faq-list" aria-label="Frequently asked questions">
          {faqEntries.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
