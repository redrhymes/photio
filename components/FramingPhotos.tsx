import Image from "@/components/OptimizedImage";
import { testimonialFramingImages } from "@/components/testimonials";

export function FramingPhotos() {
  return (
    <div className="testimonial-framing" aria-hidden="true">
      <div className="testimonial-frame testimonial-frame-left-back">
        <Image
          src={testimonialFramingImages.leftBack.src}
          alt={testimonialFramingImages.leftBack.alt}
          width={1600}
          height={1200}
          sizes="12vw"
          className="testimonial-frame-image"
        />
      </div>
      <div className="testimonial-frame testimonial-frame-left" data-testimonial-frame="left">
        <Image
          src={testimonialFramingImages.leftMain.src}
          alt={testimonialFramingImages.leftMain.alt}
          width={1600}
          height={1200}
          sizes="18vw"
          className="testimonial-frame-image"
        />
      </div>
      <div className="testimonial-frame testimonial-frame-right" data-testimonial-frame="right">
        <Image
          src={testimonialFramingImages.right.src}
          alt={testimonialFramingImages.right.alt}
          width={1600}
          height={1200}
          sizes="20vw"
          className="testimonial-frame-image"
        />
        <span className="testimonial-frame-leaf-shadow" />
      </div>
    </div>
  );
}
