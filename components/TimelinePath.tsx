"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { processSteps } from "@/components/process";

export function TimelinePath() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = svg?.querySelector<SVGPathElement>("[data-timeline-line]");
    if (!svg || !path) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const length = path.getTotalLength();
    const rawPath = MotionPathPlugin.getRawPath(path);
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const markers = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-timeline-dot]"));
    markers.forEach((marker, index) => {
      const progress = (index + 0.5) / processSteps.length;
      const point = MotionPathPlugin.getPositionOnPath(rawPath, progress);
      marker.setAttribute("cx", `${point.x}`);
      marker.setAttribute("cy", `${point.y}`);
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      path.style.strokeDashoffset = "0";
      gsap.set(markers, { scale: 1, transformOrigin: "center" });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: svg.parentElement,
          start: "top 80%",
          end: "bottom 75%",
          scrub: 0.7,
        },
      });
      timeline.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      markers.forEach((marker, index) => {
        gsap.set(marker, { scale: 0, transformOrigin: "center" });
        timeline.to(marker, { scale: 1, ease: "back.out(2.5)", duration: 0.08 }, (index + 0.5) / processSteps.length);
      });
    }, svg);
    return () => context.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="process-timeline-path"
      viewBox="0 0 180 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        data-timeline-line
        d="M90 0 C148 75 145 95 112 150 S58 255 91 315 S139 362 82 405 S61 520 101 565 S143 618 107 660 S66 780 84 845 S125 938 90 1000"
        fill="none"
      />
      {processSteps.map((step) => (
        <circle key={step.number} data-timeline-dot r="5" cx="90" cy="0" />
      ))}
    </svg>
  );
}
