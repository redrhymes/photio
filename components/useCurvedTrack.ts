"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import gsap from "gsap";
import type { Work } from "@/lib/works";

type SnapPoint = { x: number };
type PanelGeometry = { left: number; width: number };

export function useCurvedTrack(works: Work[]) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const panelGeometryRef = useRef<PanelGeometry[]>([]);
  const xRef = useRef(0);
  const maxScrollRef = useRef(0);
  const snapPointsRef = useRef<SnapPoint[]>([]);
  const snapForIndexRef = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const pointerRef = useRef({ id: -1, startX: 0, startTrackX: 0, dragging: false });
  const skipClickRef = useRef(false);
  const wheelTimerRef = useRef<number | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const measurePanel = useCallback((element: HTMLAnchorElement | null, index: number) => {
    panelsRef.current[index] = element;
  }, []);

  const setTrackX = useCallback((x: number) => {
    xRef.current = x;
    if (trackRef.current) gsap.set(trackRef.current, { x });
  }, []);

  const measureLayout = useCallback(() => {
    const gallery = galleryRef.current;
    const track = trackRef.current;
    if (!gallery || !track) return;

    const trackStyle = getComputedStyle(track);
    const gutter = Number.parseFloat(trackStyle.paddingLeft) || 0;
    const gap = Number.parseFloat(trackStyle.columnGap) || 0;
    maxScrollRef.current = Math.max(0, track.getBoundingClientRect().width - gallery.clientWidth);

    // Start/end snaps align the track's inner edges with the headline gutter.
    let panelLeft = gutter;
    const points: SnapPoint[] = [];
    panelGeometryRef.current = panelsRef.current.flatMap((panel, index) => {
      if (!panel) return [];
      const width = Number.parseFloat(getComputedStyle(panel).width) || panel.offsetWidth;
      points.push({ x: Math.max(0, Math.min(maxScrollRef.current, panelLeft - gutter)) });
      const geometry = { left: panelLeft, width };
      panelLeft += width + (index < panelsRef.current.length - 1 ? gap : 0);
      return [geometry];
    });
    snapPointsRef.current = points.filter((point, index) =>
      index === 0 || Math.abs(point.x - points[index - 1].x) > 1,
    );
    snapForIndexRef.current = points.map(({ x }) =>
      snapPointsRef.current.reduce((nearest, point) =>
        Math.abs(point.x - x) < Math.abs(nearest.x - x) ? point : nearest,
      ).x,
    );
  }, []);

  const updateActive = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || !panelsRef.current.length) return;
    const maxScroll = maxScrollRef.current;
    const x = xRef.current;
    let next = 0;
    if (maxScroll > 0 && x <= -maxScroll + 1) {
      next = works.length - 1;
    } else if (x < -1) {
      const progress = maxScroll ? Math.min(1, Math.max(0, -x / maxScroll)) : 0;
      const focusX = gallery.clientWidth * (0.28 + progress * 0.44);
      let closest = Number.POSITIVE_INFINITY;
      panelGeometryRef.current.forEach(({ left, width }, index) => {
        const panel = panelsRef.current[index];
        if (!panel) return;
        const center = left + width / 2 + x;
        const distance = Math.abs(center - focusX);
        if (distance < closest) {
          closest = distance;
          next = index;
        }
      });
    }
    if (gsap.isTweening(trackRef.current)) return;
    if (activeIndexRef.current !== next) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  }, [works.length]);

  const goTo = useCallback((index: number, animate = true) => {
    const next = Math.max(0, Math.min(works.length - 1, index));
    const snapX = snapForIndexRef.current[next];
    if (snapX === undefined) return;
    activeIndexRef.current = next;
    setActiveIndex(next);
    const target = -snapX;
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.killTweensOf(trackRef.current);
      setTrackX(target);
      return;
    }
    gsap.to(trackRef.current, {
      x: target,
      duration: 0.9,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => {
        if (trackRef.current) xRef.current = Number(gsap.getProperty(trackRef.current, "x"));
      },
    });
  }, [setTrackX, works.length]);

  const goToAdjacent = useCallback((direction: -1 | 1) => {
    const points = snapPointsRef.current;
    if (!points.length) return;
    const currentScroll = Math.max(0, Math.min(maxScrollRef.current, -xRef.current));
    const nearestPosition = points.reduce((bestIndex, point, index) =>
      Math.abs(point.x - currentScroll) < Math.abs(points[bestIndex].x - currentScroll) ? index : bestIndex,
    0);
    const nextPosition = Math.max(0, Math.min(points.length - 1, nearestPosition + direction));
    const targetX = points[nextPosition].x;
    if (targetX <= 1) {
      goTo(0);
      return;
    }
    if (targetX >= maxScrollRef.current - 1) {
      goTo(works.length - 1);
      return;
    }
    const nextIndex = snapForIndexRef.current.findIndex((snapX) => Math.abs(snapX - targetX) < 1);
    goTo(nextIndex < 0 ? 0 : nextIndex);
  }, [goTo, works.length]);

  const snapNearest = useCallback(() => {
    const points = snapPointsRef.current;
    if (!points.length) return;
    const currentScroll = -xRef.current;
    const nearest = points.reduce((best, point) =>
      Math.abs(point.x - currentScroll) < Math.abs(best.x - currentScroll) ? point : best,
    );
    if (nearest.x <= 1) {
      goTo(0);
      return;
    }
    if (nearest.x >= maxScrollRef.current - 1) {
      goTo(works.length - 1);
      return;
    }
    const nearestIndex = snapForIndexRef.current.findIndex((x) => Math.abs(x - nearest.x) < 1);
    goTo(nearestIndex < 0 ? 0 : nearestIndex);
  }, [goTo, works.length]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    pointerRef.current = { id: event.pointerId, startX: event.clientX, startTrackX: xRef.current, dragging: false };
    skipClickRef.current = false;
    gsap.killTweensOf(trackRef.current);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    const pointer = pointerRef.current;
    if (!gallery) return;
    if (pointer.id !== event.pointerId) return;
    const delta = event.clientX - pointer.startX;
    if (Math.abs(delta) > 6) {
      if (!pointer.dragging) gallery.setPointerCapture(event.pointerId);
      pointer.dragging = true;
      skipClickRef.current = true;
    }
    if (!pointer.dragging) return;
    event.preventDefault();

    // Bounded rubber-band resistance keeps overscroll under 60px before snapping home.
    const raw = pointer.startTrackX + delta;
    const maxScroll = maxScrollRef.current;
    const bounded = raw > 0
      ? Math.min(60, raw * 0.35)
      : raw < -maxScroll
        ? -maxScroll - Math.min(60, (-maxScroll - raw) * 0.35)
        : raw;
    setTrackX(bounded);
  }, [setTrackX]);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (pointer.id !== event.pointerId) return;
    const wasDragging = pointer.dragging;
    pointerRef.current.id = -1;
    if (wasDragging) snapNearest();
    window.setTimeout(() => { skipClickRef.current = false; }, 0);
  }, [snapNearest]);

  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!skipClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const onWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY) && !event.shiftKey) return;
    event.preventDefault();
    gsap.killTweensOf(trackRef.current);
    const delta = event.shiftKey ? event.deltaY : event.deltaX;
    const next = Math.max(-maxScrollRef.current, Math.min(0, xRef.current - delta));
    setTrackX(next);
    window.clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = window.setTimeout(snapNearest, 100);
  }, [setTrackX, snapNearest]);

  const onKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(activeIndexRef.current + (event.key === "ArrowRight" ? 1 : -1));
  }, [goTo]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const track = trackRef.current;
    if (!gallery || !track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updatePanels = () => {
      const viewportWidth = gallery.clientWidth;
      const maxScroll = maxScrollRef.current;
      const progress = maxScroll ? Math.min(1, Math.max(0, -xRef.current / maxScroll)) : 0;
      const focusX = viewportWidth * (0.28 + progress * 0.44);
      panelGeometryRef.current.forEach(({ left, width }, index) => {
        const panel = panelsRef.current[index];
        if (!panel) return;
        const centerX = left + width / 2 + xRef.current;
        const s = Math.max(-1, Math.min(1, (centerX - focusX) / (viewportWidth / 2)));
        let clipPath = "none";
        if (!reducedMotion) {
          // Four-point trapezoids give each panel the curved-film-strip silhouette.
          const isMobile = window.matchMedia("(max-width: 767px)").matches;
          const inset = isMobile
            ? Math.min(3, 1.5 + Math.abs(s) * 1.5)
            : 1.5 + Math.abs(s) * 9;
          clipPath = s > 0
            ? `polygon(0 ${inset}%, 100% 0, 100% 100%, 0 ${100 - inset}%)`
            : `polygon(0 0, 100% ${inset}%, 100% ${100 - inset}%, 0 100%)`;
        }
        gsap.set(panel, {
          y: reducedMotion ? 0 : s * 6,
          rotateY: reducedMotion ? 0 : s * -6,
          clipPath,
          transformOrigin: "center center",
        });
      });
      updateActive();
    };

    const updateLayout = () => {
      measureLayout();
      const clamped = Math.max(-maxScrollRef.current, Math.min(0, xRef.current));
      setTrackX(clamped);
      updatePanels();
    };

    measureLayout();
    setTrackX(0);
    updatePanels();
    gsap.ticker.add(updatePanels);
    window.addEventListener("resize", updateLayout);
    return () => {
      gsap.ticker.remove(updatePanels);
      window.removeEventListener("resize", updateLayout);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [measureLayout, setTrackX, updateActive]);

  return {
    galleryRef,
    trackRef,
    activeIndex,
    goTo,
    goToAdjacent,
    measurePanel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    onClickCapture,
    onKeyDown,
  };
}
