import { useId } from "react";

export function Clothespin() {
  const gradientId = `pin-wood-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 44 92" aria-hidden="true" className="clothespin">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c79a62" />
          <stop offset="1" stopColor="#a87a48" />
        </linearGradient>
      </defs>
      <path d="M8 4h12l4 34-3 44-8 7-7-8 3-44z" fill={`url(#${gradientId})`} stroke="#6e4b2b" strokeWidth="1.5" />
      <path d="M24 4h12l-2 33 4 43-8 8-7-8 1-44z" fill={`url(#${gradientId})`} stroke="#6e4b2b" strokeWidth="1.5" />
      <path d="M21 30h5v16h-5z" fill="none" stroke="#5e4630" strokeWidth="2" />
      <path d="M20 33c-5 0-5 10 0 10m7-10c5 0 5 10 0 10" fill="none" stroke="#c8c2b7" strokeWidth="1.5" />
      <path d="m13 12 1 16m17-16-1 16" stroke="#e2bd86" strokeOpacity=".55" strokeWidth="1" />
    </svg>
  );
}
