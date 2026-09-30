"use client";

import Image from "@/components/OptimizedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/components/testimonials";

export function AvatarCarousel({
  items,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
}: {
  items: Testimonial[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="testimonial-carousel" aria-label="Choose a testimonial">
      <button
        type="button"
        className="testimonial-carousel-arrow"
        onClick={onPrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={17} strokeWidth={1.4} aria-hidden="true" />
      </button>
      <div className="testimonial-avatar-viewport">
        <div className="testimonial-avatar-row">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                layout
                layoutId={`testimonial-avatar-${item.id}`}
                transition={reducedMotion
                  ? { duration: 0.01 }
                  : { layout: { duration: 0.5, ease: "easeInOut" } }}
                className={`testimonial-avatar${isActive ? " is-active" : ""}`}
                data-testimonial-avatar
                style={{
                  order: (index - activeIndex + Math.floor(items.length / 2) + items.length) % items.length,
                }}
                onClick={() => onSelect(index)}
                aria-label={`View testimonial from ${item.coupleNames}`}
                aria-pressed={isActive}
              >
                <Image
                  src={item.avatarImage}
                  alt=""
                  fill
                  sizes={isActive ? "90px" : "64px"}
                  className="testimonial-avatar-image"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="testimonial-carousel-arrow"
        onClick={onNext}
        aria-label="Next testimonial"
      >
        <ChevronRight size={17} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </div>
  );
}
