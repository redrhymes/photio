"use client";

import type { ImageProps } from "next/image";
import Image from "@/components/OptimizedImage";
import { useEffect, useRef, useState } from "react";

type Props = Omit<ImageProps, "onLoad">;

export function ImageReveal(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <Image {...props} className={`image-cover image-reveal ${props.className ?? ""}`} data-hidden={!visible} />
    </div>
  );
}
