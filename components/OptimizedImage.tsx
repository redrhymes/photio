"use client";

import Image, { type ImageProps } from "next/image";
import { forwardRef } from "react";
import { imageBlurData } from "@/lib/image-blur-data";

const fallbackBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJiIj48ZmVCbHVyIHN0ZERldmlhdGlvbj0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2E5OWY5MSIgZmlsdGVyPSJ1cmwoI2IpIi8+PC9zdmc+";

export const OptimizedImage = forwardRef<HTMLImageElement, ImageProps>(
  function OptimizedImage({ src, placeholder, blurDataURL, ...props }, ref) {
    const imagePath = typeof src === "string" ? src.split(/[?#]/, 1)[0] : "";
    const generatedBlur = imageBlurData[imagePath];

    return (
      <Image
        {...props}
        ref={ref}
        src={src}
        placeholder={placeholder ?? "blur"}
        blurDataURL={blurDataURL ?? generatedBlur ?? fallbackBlurDataURL}
      />
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
