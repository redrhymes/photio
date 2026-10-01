"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceStory } from "@/lib/services";

type Props = {
  services: ServiceStory[];
  activeId: string;
  onActivate: (id: string) => void;
};

export function ServiceCardStack({ services, activeId, onActivate }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = Math.max(services.findIndex((service) => service.id === activeId), 0);

  return (
    <>
      <div className="service-card-stack" role="group" aria-label="Selected service photography">
        {services.map((service, index) => {
          const depth = (index - activeIndex + services.length) % services.length;
          const isActive = depth === 0;
          const layout = [
            { left: "2%", rotate: -1, scale: 1 },
            { left: "14.5%", rotate: 1.5, scale: 1 },
            { left: "27%", rotate: -1.5, scale: 1 },
            { left: "39.5%", rotate: 2.5, scale: 1 },
          ][depth]!;

          const cardContent = (
            <span className="service-stack-card-media" data-service-stack-entrance>
              <Image
                src={service.image}
                alt={`${service.title} photography`}
                fill
                sizes="(max-width: 1279px) 38vw, 28vw"
                loading="lazy"
                className="service-stack-image"
              />
            </span>
          );

          return (
            <motion.div
              key={service.id}
              className={`service-stack-card${isActive ? " is-active" : ""}`}
              data-service-stack-card
              data-stack-depth={depth}
              initial={false}
              animate={{
                left: layout.left,
                width: "59%",
                rotate: layout.rotate,
                scale: layout.scale,
                zIndex: services.length - depth,
                opacity: 1,
              }}
              transition={{
                duration: prefersReducedMotion ? .2 : .55,
                ease: prefersReducedMotion ? "easeOut" : [0.65, 0, 0.35, 1],
              }}
              style={{ aspectRatio: "0.78" }}
            >
              {isActive ? (
                <Link
                  href={service.href}
                  className="service-stack-card-link"
                  aria-label={`View ${service.title} services`}
                  onClick={() => onActivate(service.id)}
                >
                  {cardContent}
                </Link>
              ) : (
                <button
                  type="button"
                  className="service-stack-card-link"
                  aria-label={`Select ${service.title}`}
                  onClick={() => onActivate(service.id)}
                >
                  {cardContent}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="service-mobile-cards">
        {services.map((service) => (
          <article className="service-mobile-card" key={service.id}>
            <Link
              href={service.href}
              className="service-mobile-card-image"
              aria-label={`View ${service.title} services`}
            >
              <Image
                src={service.image}
                alt={`${service.title} photography`}
                fill
                sizes="(max-width: 767px) 100vw, 1px"
                loading="lazy"
                className="service-stack-image"
              />
              <span className="service-mobile-card-number">{service.number} / 04</span>
            </Link>
            <div className="service-mobile-card-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href={service.href} aria-label={`Explore ${service.title} services`}>
                Explore service
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
