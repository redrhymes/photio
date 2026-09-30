"use client";

import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { MobileMenu } from "@/components/MobileMenu";

const links = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Shoot Sets", "/shoot-sets"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
    window.setTimeout(() => menuButtonRef.current?.focus(), delay);
  }, []);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - previous;
      if (current <= 48 || delta <= -8) {
        setVisible(true);
      } else if (delta >= 8) {
        setVisible(false);
      }
      if (Math.abs(delta) >= 8) previous = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setTheme("dark");
    const lightSections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main #approach[data-theme='light'], main #process[data-theme='light'], main #testimonials[data-theme='light']",
      ),
    );
    if (!lightSections.length) return;
    const updateTheme = () => {
      const viewportCenter = window.innerHeight / 2;
      const isOverLightSection = lightSections.some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter;
      });
      setTheme(isOverLightSection ? "light" : "dark");
    };
    const observer = new IntersectionObserver(updateTheme, { rootMargin: "-49% 0px -49% 0px" });
    lightSections.forEach((section) => observer.observe(section));
    updateTheme();
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        data-nav-theme={theme}
        className={`fixed inset-x-0 top-0 z-[70] border-b border-white/[.08] bg-[rgba(10,10,10,.55)] text-text shadow-sm backdrop-blur-2xl transition-all duration-500 ${visible || menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto flex h-[68px] items-center justify-between px-4 sm:h-20 sm:px-10 xl:px-[88px]">
          <Link href="/" className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center sm:h-20 sm:w-20 sm:translate-y-1" aria-label="Photio home">
            <Image
              src={theme === "light" ? "/images/black.webp" : "/images/white.webp"}
              alt="Photio"
              width={88}
              height={88}
              sizes="(max-width: 639px) 72px, 88px"
              className="h-auto w-[72px] object-contain sm:w-[88px]"
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex min-[1440px]:gap-12" aria-label="Primary">
            {links.map(([label, href]) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link relative whitespace-nowrap py-3 text-[10px] font-normal uppercase tracking-[.14em] transition-colors duration-300 min-[1440px]:text-[13px] ${active ? "text-current" : "text-current/80 hover:text-current"}`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="photio-nav-active"
                      className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-[3px]"
                      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
                      aria-hidden="true"
                    >
                      <span className="h-px w-[14px] bg-current" />
                      <span className="h-1 w-1 rounded-full bg-current" />
                      <span className="h-px w-[14px] bg-current" />
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton
              href="/contact"
              variant="dark"
              arrowDirection="right"
              className="nav-book h-[46px] min-h-[46px] gap-2 px-7 text-[11px] tracking-[.14em] hover:bg-champagne hover:text-ink"
            >
              Book a shoot
            </MagneticButton>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex min-h-11 items-center gap-3 px-2 text-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "photio-mobile-menu" : undefined}
          >
            <span className="text-[11px] uppercase tracking-[.18em]">Menu</span>
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="ml-auto h-px w-3/4 bg-current" />
            </span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && <MobileMenu id="photio-mobile-menu" onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}
