"use client";

import type { KeyboardEvent, TouchEvent } from "react";
import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredStories } from "@/lib/featuredStories";
import { FeaturedStoryNav } from "@/components/FeaturedStoryNav";
import { useFeaturedStoryTransition } from "@/components/useFeaturedStoryTransition";

export function FeaturedStorySection() {
  const prefersReducedMotion = useReducedMotion();
  const {
    sectionRef,
    copyRef,
    imageStageRef,
    index,
    onPrevious,
    onNext,
  } = useFeaturedStoryTransition(featuredStories.length);
  const story = featuredStories[index];
  const touchStartX = useRef(0);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - touchEndX;
    if (Math.abs(delta) > 45) (delta > 0 ? onNext : onPrevious)();
  };

  if (!story) return null;

  return (
    <section
      ref={sectionRef}
      id="featured-story"
      data-theme="dark"
      className="featured-story-section"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="featured-story-copy" ref={copyRef}>
        <p className="featured-story-eyebrow">
          <span className="featured-story-eyebrow-line" data-featured-eyebrow-line />
          <span data-featured-eyebrow>Featured story</span>
        </p>

        <h2 className="featured-story-heading display" data-featured-heading>
          <span>{story.coupleNames[0]}</span>
          <span><i data-featured-highlight>{story.coupleNames[1]}</i></span>
        </h2>

        <p className="featured-story-location" data-featured-detail>
          {story.location} — {story.shootType}
        </p>
        <span className="featured-story-rule" data-featured-detail aria-hidden="true" />
        <p className="featured-story-description" data-featured-detail>{story.description}</p>
      </div>

      <div className="featured-story-image-stage" ref={imageStageRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={story.slug}
            className="featured-story-image-layer"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: prefersReducedMotion ? 0.25 : 0.6, ease: "easeInOut" }}
          >
            <Image
              src={story.heroImage}
              alt={`${story.couple}, ${story.shootType.toLowerCase()} in ${story.location}. ${story.description}`}
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 72vw"
              className="featured-story-image"
            />
            <div className="featured-story-image-shade" aria-hidden="true" />
            <div className="featured-story-image-caption">
              <div>
                <p>{story.location}</p>
                <span>{story.shootType}</span>
              </div>
              <Link href={`/portfolio/${story.slug}`} aria-label={`View full story: ${story.couple}`}>
                View full story <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="featured-story-navigation" data-featured-navigation>
        <FeaturedStoryNav
          index={index}
          total={featuredStories.length}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </section>
  );
}
