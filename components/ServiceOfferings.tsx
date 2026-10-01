"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ServicePageEntry } from "@/lib/service-page-data";

type Props = {
  service: ServicePageEntry;
};

export function ServiceOfferings({ service }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <section className="service-detail-offerings service-detail-section" data-service-detail-section>
      <div className="service-detail-two-column">
        <div className="service-detail-intro">
          <p className="service-detail-eyebrow" data-service-reveal>Our approach</p>
          <h2 className="service-detail-heading display" data-service-reveal>{service.introTitle}</h2>
          <p data-service-reveal>{service.introDescription}</p>
          <p data-service-reveal>{service.introAdditional}</p>
        </div>
        <div className="service-offering-list">
          <h3 className="service-offering-list-heading" data-service-reveal>{service.offeringsTitle}</h3>
          {service.offerings.map((offering, index) => {
            const open = openIndex === index;
            const buttonId = `offering-${service.slug}-${index}`;
            const answerId = `${buttonId}-answer`;
            return (
              <div className={`service-offering${open ? " is-open" : ""}`} key={offering.title}>
                <button
                  className="service-offering-toggle"
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{offering.title}</span>
                  <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={answerId}
                      className="service-offering-answer"
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reducedMotion
                        ? { height: { duration: .01 }, opacity: { duration: .12 } }
                        : { height: { duration: .38, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: .2 } }}
                    >
                      <p>{offering.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
