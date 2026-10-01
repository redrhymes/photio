export type Work = {
  slug: string;
  title: string;
  city: string;
  shootType: string;
  image: string;
  alt: string;
};

export const works: Work[] = [
  {
    slug: "aanya-rahul",
    title: "Pre-Wedding Story",
    city: "Jaipur",
    shootType: "PRE-WEDDING",
    image: "/images/home/work1.jpg",
    alt: "A couple sharing a quiet moment along a garden path",
  },
  {
    slug: "meera-arjun",
    title: "Wedding Story",
    city: "Jaipur",
    shootType: "WEDDING",
    image: "/images/home/work2.jpg",
    alt: "A couple framed by ornate sandstone arches",
  },
  {
    slug: "studio-01",
    title: "Corporate Brand Visuals",
    city: "",
    shootType: "CORPORATE",
    image: "/images/home/about2.png",
    alt: "A photographer capturing a portrait during a studio shoot",
  },
  {
    slug: "after-hours",
    title: "Live Event Coverage",
    city: "",
    shootType: "EVENTS",
    image: "/images/portfolio/Event.jpg",
    alt: "A live event captured in photographs",
  },
  {
    slug: "live-music-session",
    title: "Artist Performance",
    city: "",
    shootType: "MUSIC",
    image: "/images/locations/musical-nights/mn1.jpg",
    alt: "An artist performing beneath warm stage lights",
  },
  {
    slug: "isha-kabir",
    title: "Cinematic Story",
    city: "Delhi",
    shootType: "CINEMATIC",
    image: "/images/home/work3.jpg",
    alt: "A cinematic story captured at sunset",
  },
];
