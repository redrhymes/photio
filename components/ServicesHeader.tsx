"use client";

import Image from "@/components/OptimizedImage";
import { useServicesHeaderAnimation } from "@/components/useServicesHeaderAnimation";

export function ServicesHeader() {
  const sectionRef = useServicesHeaderAnimation();

  return (
    <section
      ref={sectionRef}
      id="services-header"
      data-theme="dark"
      className="services-page-header"
    >
      <div className="services-page-copy">
        <p className="services-page-eyebrow">
          <span className="services-page-eyebrow-line" data-services-eyebrow-line />
          <span data-services-eyebrow>What we do</span>
        </p>
        <h1 className="services-page-heading display" data-services-heading>
          <span>Stories worth</span>
          <span><i data-services-highlight>remembering.</i></span>
        </h1>
        <p className="services-page-description" data-services-description>
          From intimate pre-weddings to full-scale celebrations, we capture the people, places and moments that make your story yours.
        </p>
      </div>

      <div className="services-page-visual">
        <div className="services-page-image" data-services-background>
          <Image
            src="/images/services.png"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 56vw"
            preload
            className="services-page-image-element"
          />
        </div>
        <span className="services-page-image-gradient" aria-hidden="true" />
      </div>
    </section>
  );
}
