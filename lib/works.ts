export type Work = {
  slug: string;
  coupleNames: string;
  city: string;
  shootType: string;
  image: string;
  alt: string;
};

// Empty names omit the couple line, keeping bracket placeholders out of every caption.
export const works: Work[] = [
  {
    slug: "aanya-rahul",
    coupleNames: "",
    city: "Jaipur",
    shootType: "PRE-WEDDING",
    image: "/images/home/work1.jpg",
    alt: "A couple sharing a quiet moment along a garden path",
  },
  {
    slug: "meera-arjun",
    coupleNames: "",
    city: "Udaipur",
    shootType: "PRE-WEDDING",
    image: "/images/home/work2.jpg",
    alt: "A couple framed by ornate sandstone arches",
  },
  {
    slug: "isha-kabir",
    coupleNames: "",
    city: "Delhi",
    shootType: "CINEMATIC",
    image: "/images/home/work3.jpg",
    alt: "A couple in silhouette beneath an orange sunset",
  },
  {
    slug: "tara-veer",
    coupleNames: "",
    city: "Jodhpur",
    shootType: "WEDDING",
    image: "/images/home/work4.jpg",
    alt: "A couple in traditional attire inside a painted palace corridor",
  },
  {
    slug: "sana-zain",
    coupleNames: "",
    city: "Jaipur",
    shootType: "CANDID",
    image: "/images/home/work5.jpg",
    alt: "A joyful low-angle portrait of a couple forming a heart with their arms",
  },
  {
    slug: "noor-dev",
    coupleNames: "",
    city: "Udaipur",
    shootType: "WEDDING",
    image: "/images/home/work6.jpg",
    alt: "A couple seated together in front of an ornate palace facade",
  },
];
