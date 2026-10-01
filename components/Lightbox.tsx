"use client";

import Image from "@/components/OptimizedImage";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Project } from "@/lib/content";

export function Lightbox({ item, close, next, previous }: { item: Project | null; close: () => void; next: () => void; previous: () => void }) {
  const touchStartX = useRef<number | null>(null);
  const onKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  }, [close, next, previous]);
  useEffect(() => {
    if (!item) return;
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [item, onKey]);
  return (
    <AnimatePresence>
      {item && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 text-paper sm:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${item.title} portfolio image`}>
        <button onClick={close} aria-label="Close image viewer" className="absolute right-5 top-5 z-10 flex min-h-11 min-w-11 items-center justify-center"><X /></button>
        <button onClick={previous} aria-label="Previous image" className="absolute left-3 z-10 flex min-h-12 min-w-12 items-center justify-center sm:left-8"><ArrowLeft /></button>
        <motion.div
          key={`${item.slug}-${item.coverImage}`}
          className="relative h-[70vh] w-full max-w-5xl"
          initial={{ opacity: 0, scale: .97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: .99 }}
          onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (startX === null || endX === undefined) return;
            const delta = startX - endX;
            if (Math.abs(delta) > 50) (delta > 0 ? next : previous)();
          }}
        >
          <Image src={item.coverImage} alt={`${item.title} in ${item.location}`} fill sizes="(max-width: 767px) 90vw, 80vw" className="object-contain" />
          <div className="absolute -bottom-12 left-0"><p className="display text-3xl">{item.title}</p><p className="eyebrow mt-1 text-white/60">{item.location} · {item.shootType}</p></div>
        </motion.div>
        <button onClick={next} aria-label="Next image" className="absolute right-3 z-10 flex min-h-12 min-w-12 items-center justify-center sm:right-8"><ArrowRight /></button>
      </motion.div>}
    </AnimatePresence>
  );
}
