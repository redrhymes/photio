"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQEntry } from "@/lib/faq";

type Props = {
  item: FAQEntry;
  open: boolean;
  onToggle: (id: string) => void;
};

export function FAQItem({ item, open, onToggle }: Props) {
  const reducedMotion = useReducedMotion();
  const questionId = `faq-question-${item.id}`;
  const answerId = `faq-answer-${item.id}`;

  return (
    <div className={`faq-item${open ? " is-open" : ""}`} data-faq-row>
      <button
        id={questionId}
        type="button"
        className="faq-question"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => onToggle(item.id)}
      >
        <span className="faq-number">{item.number}</span>
        <span className="faq-question-text">{item.question}</span>
        <Plus className="faq-toggle-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reducedMotion
              ? { height: { duration: .01 }, opacity: { duration: .12 } }
              : { height: { duration: .4, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: .22 } }}
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
