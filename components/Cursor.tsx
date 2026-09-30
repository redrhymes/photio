"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnabled(true);
    const cursor = document.querySelector<HTMLElement>(".cursor-orb");
    if (!cursor) return;
    const setLightTheme = (light: boolean) => cursor.classList.toggle("cursor-orb-light", light);
    const move = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");
      setLightTheme(Boolean(document.elementFromPoint(event.clientX, event.clientY)?.closest("#approach[data-theme='light']")));
    };
    const enter = (event: Event) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button, [data-cursor-label]") : null;
      cursor.classList.toggle("is-active", Boolean(target));
      cursor.textContent = target?.dataset.cursorLabel ?? "";
    };
    const leave = () => { cursor.classList.remove("is-visible", "is-active"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    const approach = document.querySelector<HTMLElement>("main #approach[data-theme='light']");
    const observer = approach ? new IntersectionObserver(() => {
      const viewportCenter = window.innerHeight / 2;
      const bounds = approach.getBoundingClientRect();
      setLightTheme(bounds.top <= viewportCenter && bounds.bottom >= viewportCenter);
    }, { rootMargin: "-49% 0px -49% 0px" }) : null;
    if (approach) observer?.observe(approach);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      observer?.disconnect();
    };
  }, []);
  return enabled ? <div className="cursor-orb" aria-hidden="true" /> : null;
}
