export type Testimonial = {
  id: string;
  coupleNames: string;
  location: string;
  shootType: string;
  quote: {
    plain: string;
    emphasis: string;
  };
  avatarImage: string;
};

// Add, remove, or reorder entries here. Update googleReviewsUrl to your
// Google Business review URL when it is ready.
export const googleReviewsUrl = "https://www.google.com/search?q=Photio+Noida+reviews";

export const testimonials: Testimonial[] = [
  {
    id: "aanya-rahul",
    coupleNames: "AANYA & RAHUL",
    location: "DELHI",
    shootType: "WEDDING",
    quote: {
      plain: "They didn't just capture our wedding. They captured",
      emphasis: "how it felt.",
    },
    avatarImage: "/images/portfolio/7.jpg",
  },
  {
    id: "meera-arjun",
    coupleNames: "MEERA & ARJUN",
    location: "JAIPUR",
    shootType: "PRE-WEDDING",
    quote: {
      plain: "Every photograph brought us right back to",
      emphasis: "the joy of that day.",
    },
    avatarImage: "/images/portfolio/16.webp",
  },
  {
    id: "priya-kartik",
    coupleNames: "PRIYA & KARTIK",
    location: "DELHI",
    shootType: "WEDDING",
    quote: {
      plain: "From the quiet moments to the celebrations, they understood",
      emphasis: "what mattered to us.",
    },
    avatarImage: "/images/portfolio/475416934_3480357045430756_3377981072329047463_n.jpg",
  },
  {
    id: "isha-kabir",
    coupleNames: "ISHA & KABIR",
    location: "NOIDA",
    shootType: "WEDDING",
    quote: {
      plain: "We felt completely at ease, and every frame feels",
      emphasis: "so unmistakably us.",
    },
    avatarImage: "/images/portfolio/FB_IMG_1738766381528.jpg",
  },
  {
    id: "sana-zain",
    coupleNames: "SANA & ZAIN",
    location: "AGRA",
    shootType: "PRE-WEDDING",
    quote: {
      plain: "We will treasure these photographs for a lifetime; they are",
      emphasis: "memories made tangible.",
    },
    avatarImage: "/images/portfolio/FB_IMG_1738766546744.jpg",
  },
];

export const testimonialFramingImages = {
  leftMain: {
    src: "/images/portfolio/1-process.webp",
    alt: "A close wedding detail captured in warm light",
  },
  leftBack: {
    src: "/images/portfolio/FB_IMG_1738411095158.jpg",
    alt: "",
  },
  right: {
    src: "/images/portfolio/6.webp",
    alt: "A couple together in a softly toned wedding portrait",
  },
};
