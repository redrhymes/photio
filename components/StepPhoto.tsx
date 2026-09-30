"use client";

import Image from "@/components/OptimizedImage";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ProcessStepData } from "@/components/process";

export function StepPhoto({
  step,
  index,
}: {
  step: ProcessStepData;
  index: number;
}) {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const image = photo.querySelector("img");
    let context: gsap.Context | undefined;
    const reveal = () => {
      const restRotation = [-4, 3, -3, 5][index % 4];
      const fromX = index % 2 === 0 ? -42 : 42;
      context = gsap.context(() => {
        gsap.fromTo(
          photo,
          { x: fromX, opacity: 0, rotation: index % 2 === 0 ? -9 : 10 },
          {
            x: 0,
            opacity: 1,
            rotation: restRotation,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: photo, start: "top 82%", once: true, toggleActions: "play none none none" },
            onComplete: () => gsap.set(photo, { clearProps: "transform" }),
          },
        );
      }, photo);
    };

    if (!image || image.complete) {
      reveal();
      return () => context?.revert();
    }

    image.addEventListener("load", reveal, { once: true });
    image.addEventListener("error", reveal, { once: true });
    return () => {
      image.removeEventListener("load", reveal);
      image.removeEventListener("error", reveal);
      context?.revert();
    };
  }, [index]);

  return (
    <div
      ref={photoRef}
      className={`process-polaroid process-polaroid-${index + 1}`}
      data-process-photo
    >
      <Image
        src={step.image}
        alt={step.alt}
        fill
        sizes="(max-width: 767px) 79vw, (max-width: 1279px) 35vw, 15vw"
        className="process-polaroid-image"
      />
    </div>
  );
}
