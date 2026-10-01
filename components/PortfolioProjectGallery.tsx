"use client";

import { useState } from "react";
import { ImageReveal } from "@/components/ImageReveal";
import { Lightbox } from "@/components/Lightbox";
import type { Project } from "@/lib/content";

export function PortfolioProjectGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = [project.coverImage, ...project.galleryImages];
  const activeProject = activeIndex === null
    ? null
    : { ...project, coverImage: images[activeIndex] ?? project.coverImage };

  const renderPhoto = (index: number, className: string) => {
    const src = images[index];
    if (!src) return null;

    return (
      <figure className={`project-photo ${className}`} key={src}>
        <button
          type="button"
          className="project-photo-button"
          onClick={() => setActiveIndex(index)}
          aria-label={`Open photo ${index + 1} of ${project.title}`}
          data-cursor-label="VIEW"
        >
          <ImageReveal
            src={src}
            alt={`${project.title}, ${project.shootType.toLowerCase()} photography in ${project.location}, photo ${index + 1}`}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1500px) 25vw, 375px"
            preload={index === 0}
            className="project-detail-image"
          />
        </button>
      </figure>
    );
  };

  return (
    <>
      <section className="project-gallery" aria-label={`${project.title} photo gallery`}>
        {images.slice(0, 7).map((_, index) => renderPhoto(index, `project-photo-${index}`))}
      </section>
      <Lightbox
        item={activeProject}
        close={() => setActiveIndex(null)}
        next={() => setActiveIndex((index) => index === null ? null : (index + 1) % images.length)}
        previous={() => setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length)}
      />
    </>
  );
}
