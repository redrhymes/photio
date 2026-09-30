"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Instagram, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { MagneticButton } from "@/components/MagneticButton";

const links = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Shoot Sets", "/shoot-sets"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function MobileMenu({ id, onClose }: { id: string; onClose: () => void }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !menuRef.current) return;
    const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <motion.div
      ref={menuRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[80] flex min-h-[100svh] flex-col overflow-y-auto bg-ink px-6 pb-7 pt-6 text-paper sm:px-10"
      onKeyDown={trapFocus}
      initial={{ y: reducedMotion ? 0 : "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: reducedMotion ? 0 : "-100%" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex h-20 items-center justify-between">
        <Link href="/" onClick={onClose} className="flex h-20 w-20 items-center justify-center" aria-label="Photio home">
          <Image src="/images/white.webp" alt="Photio" width={88} height={88} sizes="80px" className="h-auto w-[88px] object-contain" />
        </Link>
        <button type="button" onClick={onClose} className="flex min-h-11 items-center gap-3 px-2 text-paper focus-visible:outline-2 focus-visible:outline-champagne" aria-label="Close menu">
          <span className="eyebrow">Close</span><X size={21} />
        </button>
      </div>

      <nav className="my-auto flex flex-col py-12" aria-label="Mobile primary">
        {links.map(([label, href], index) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.06 }}
              className="overflow-hidden border-b border-white/15"
            >
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`display flex min-h-[68px] items-center py-2 text-[clamp(2.5rem,9vw,3.5rem)] leading-none ${active ? "text-champagne" : "text-paper"}`}
              >
                <span className="mr-4 font-sans text-[10px] text-white/45">{`0${index + 1}`}</span>{label}
              </Link>
            </motion.div>
          );
        })}
        <MagneticButton href="/contact" variant="champagne" arrowDirection="right" className="mt-7 min-h-[54px] w-full justify-between px-6 text-xs tracking-[.15em]">
          Book a shoot
        </MagneticButton>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/20 pt-5">
        <div className="eyebrow flex flex-wrap gap-x-6 gap-y-2 text-white/70">
          <a className="flex min-h-11 items-center gap-2 hover:text-champagne" href="[INSTAGRAM_URL]" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram</a>
          <a className="flex min-h-11 items-center gap-2 hover:text-champagne" href="https://wa.me/[PHONE]" target="_blank" rel="noreferrer">WhatsApp <ArrowRight size={13} /></a>
        </div>
        <a className="eyebrow min-h-11 content-center text-white/70 hover:text-champagne" href="tel:[PHONE]">[PHONE]</a>
      </div>
    </motion.div>
  );
}
