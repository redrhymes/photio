"use client";

import Image from "@/components/OptimizedImage";

export function PhotoStack() {
  return (
    <div className="approach-photo-stack" data-approach-stack>
      <svg className="approach-photo-arc" viewBox="0 0 420 480" fill="none" aria-hidden="true">
        <path
          data-approach-arc
          d="M44 196C53 91 141 18 246 30c105 12 175 104 164 209-9 81-61 150-134 177"
          stroke="#8F6E3F"
          strokeOpacity=".3"
          strokeWidth="1"
        />
      </svg>
      <div className="approach-photo approach-photo-back" data-approach-back>
        <Image
          src="/images/home/about2.png"
          alt="A Photio photographer capturing a portrait during a studio shoot"
          fill
          sizes="(max-width: 767px) 0px, (max-width: 1279px) 30vw, 20vw"
          quality={85}
          className="approach-photo-image"
        />
      </div>
      <div className="approach-photo approach-photo-front" data-approach-front>
        <Image
          src="/images/home/about.png"
          alt="Photio's photography team collaborating during a shoot"
          fill
          sizes="(max-width: 767px) 69vw, (max-width: 1279px) 40vw, 26vw"
          quality={85}
          className="approach-photo-image"
        />
        <span className="approach-photo-script" aria-hidden="true">Every Story</span>
      </div>
    </div>
  );
}
