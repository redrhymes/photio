"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { FilterBar } from "@/components/FilterBar";

export function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(() => projects.filter((project) => filter === "All" || project.category === filter), [filter]);
  return (
      <div id="portfolio-grid-anchor" data-theme="dark" className="portfolio-gallery-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <FilterBar selected={filter} onSelect={setFilter} />
          </motion.div>
          <motion.div layout className="portfolio-gallery-grid">
            <AnimatePresence mode="popLayout">
              {shown.map((project, index) => {
                const title = project.title.startsWith("[")
                  ? `Wedding story ${String(index + 1).padStart(2, "0")}`
                  : project.title;
                const location = project.location.startsWith("[") ? "Across India" : project.location;

                return (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    exit={{ opacity: 0, scale: .97 }}
                    transition={{ duration: .6, delay: index * .06, ease: "easeOut" }}
                    className={`portfolio-gallery-item portfolio-gallery-item-${index % 9}`}
                  >
                    <Link href={`/portfolio/${project.slug}`} className="portfolio-gallery-card group" aria-label={`View ${title} story`} data-cursor-label="View">
                      <Image src={project.coverImage} alt={`${title}, ${project.shootType} photography in ${location}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="portfolio-gallery-image" />
                      <span className="portfolio-gallery-shade" />
                      <span className="portfolio-gallery-view">View</span>
                      <span className="portfolio-gallery-caption">
                        <span className="portfolio-gallery-meta">{location} — {project.shootType}</span>
                        <span className="portfolio-gallery-title">{title}</span>
                      </span>
                    </Link>
                    <Link href={`/portfolio/${project.slug}`} className="portfolio-gallery-story-link" aria-label={`Read ${title}'s story`}>
                      View story <ArrowUpRight size={13} />
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
  );
}
