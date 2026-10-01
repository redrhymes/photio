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

export const testimonials: Testimonial[] = [
  {
    id: "weddings",
    coupleNames: "[CLIENT NAME]",
    location: "",
    shootType: "WEDDINGS & PRE-WEDDING",
    quote: {
      plain: "[Approved client feedback will appear here.]",
      emphasis: "",
    },
    avatarImage: "/images/home/work1.jpg",
  },
  {
    id: "brands",
    coupleNames: "[CLIENT NAME]",
    location: "",
    shootType: "BRANDS & BUSINESSES",
    quote: {
      plain: "[Approved client feedback will appear here.]",
      emphasis: "",
    },
    avatarImage: "/images/portfolio/Promotional.jpg",
  },
  {
    id: "events",
    coupleNames: "[CLIENT NAME]",
    location: "",
    shootType: "LIVE EVENTS",
    quote: {
      plain: "[Approved client feedback will appear here.]",
      emphasis: "",
    },
    avatarImage: "/images/portfolio/Event.jpg",
  },
  {
    id: "music",
    coupleNames: "[CLIENT NAME]",
    location: "",
    shootType: "MUSIC & ARTISTS",
    quote: {
      plain: "[Approved client feedback will appear here.]",
      emphasis: "",
    },
    avatarImage: "/images/locations/musical-nights/mn1.jpg",
  },
];

export const testimonialFramingImages = {
  leftMain: {
    src: "/images/portfolio/Promotional.jpg",
    alt: "",
  },
  leftBack: {
    src: "/images/portfolio/Event.jpg",
    alt: "",
  },
  right: {
    src: "/images/locations/musical-nights/mn1.jpg",
    alt: "",
  },
};
