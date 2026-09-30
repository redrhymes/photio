"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const notify = () => window.dispatchEvent(new Event("photio:preloader-complete"));
    if (sessionStorage.getItem("photio-seen")) {
      const frame = requestAnimationFrame(notify);
      return () => cancelAnimationFrame(frame);
    }
    setShow(true);
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / 1000) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("photio-seen", "1");
        window.setTimeout(() => {
          setShow(false);
          notify();
        }, 280);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-paper" role="status" aria-label="Loading Photio">
      <div className="display text-5xl tracking-wide">P<span className="italic">.</span></div>
      <div className="mt-10 h-px w-36 bg-white/20"><div className="h-full bg-champagne transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
      <span className="eyebrow mt-3 tabular-nums">{progress}%</span>
      <button className="eyebrow absolute bottom-8 min-h-11 px-5 text-white/70 underline underline-offset-4" onClick={() => { sessionStorage.setItem("photio-seen", "1"); setShow(false); window.dispatchEvent(new Event("photio:preloader-complete")); }}>Skip intro</button>
    </div>
  );
}
