"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { FilterBar } from "@/components/FilterBar";
import { Lightbox } from "@/components/Lightbox";

export function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<string | null>(null);
  const shown = useMemo(() => projects.filter((project) => filter === "All" || project.category === filter), [filter]);
  const currentIndex = shown.findIndex((project) => project.slug === active);
  const activeProject = currentIndex >= 0 ? shown[currentIndex] : null;
  const move = (direction: number) => {
    if (shown.length === 0 || currentIndex < 0) return;
    setActive(shown[(currentIndex + direction + shown.length) % shown.length].slug);
  };
  return (
    <>
      <div data-theme="light" className="section-pad bg-paper pt-10">
        <div className="container">
          <FilterBar selected={filter} onSelect={setFilter} />
          <motion.div layout className="mt-9 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((project, index) => <motion.article key={project.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .35, delay: index * .025 }} className={index % 5 === 1 ? "sm:mt-16" : ""}>
                <button onClick={() => setActive(project.slug)} className="group relative block aspect-[.84] w-full overflow-hidden bg-fog text-left" aria-label={`View ${project.couple} photo`} data-cursor-label="View">
                  <Image src={project.image} alt={`${project.couple}, ${project.type} photography in ${project.location}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="image-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
                  <div className="absolute bottom-5 left-5 text-white"><p className="eyebrow text-white/70">{project.location}</p><h2 className="display mt-1 text-3xl">{project.couple}</h2></div>
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={17} /></span>
                </button>
                <div className="mt-3 flex justify-between text-xs text-ash"><span>{project.type}</span><Link href={`/portfolio/${project.slug}`} className="flex min-h-11 items-center gap-1 text-ink">Story <ArrowUpRight size={12} /></Link></div>
              </motion.article>)}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Lightbox item={activeProject} close={() => setActive(null)} next={() => move(1)} previous={() => move(-1)} />
    </>
  );
}
