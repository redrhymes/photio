"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FeaturedStoryNavProps = {
  index: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function FeaturedStoryNav({ index, total, onPrevious, onNext }: FeaturedStoryNavProps) {
  return (
    <nav className="featured-story-nav" aria-label="Featured story navigation">
      <button type="button" onClick={onPrevious} aria-label="Previous featured story">
        <ChevronLeft size={17} strokeWidth={1} aria-hidden="true" />
      </button>
      <span className="featured-story-nav-divider" aria-hidden="true" />
      <span className="featured-story-counter" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.18 }}
            className="featured-story-current"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span aria-hidden="true"> / {String(total).padStart(2, "0")}</span>
      </span>
      <span className="featured-story-nav-divider" aria-hidden="true" />
      <button type="button" onClick={onNext} aria-label="Next featured story">
        <ChevronRight size={17} strokeWidth={1} aria-hidden="true" />
      </button>
    </nav>
  );
}
