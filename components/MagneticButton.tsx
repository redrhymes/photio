"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/Button";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "outline" | "champagne";
  className?: string;
  arrowDirection?: "right" | "up-right";
  arrow?: boolean;
};

export function MagneticButton(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isFullWidth = props.className?.includes("w-full") ?? false;
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - box.left - box.width / 2) * 0.12;
    let y = (event.clientY - box.top - box.height / 2) * 0.16;
    const distance = Math.hypot(x, y);
    if (distance > 8) {
      x = (x / distance) * 8;
      y = (y / distance) * 8;
    }
    event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0, 0)"; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={reset} className={`inline-flex transition-transform duration-300 ${isFullWidth ? "w-full" : ""}`}>
      <Button {...props} />
    </div>
  );
}
