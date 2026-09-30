export type ShootSetTile = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  index: string;
  left: number;
  top: number;
  width: number;
  height: number;
  polygon: string;
  direction: "left" | "right" | "bottom";
};

// Coordinates are cqw values against a 1672 × 941 stage. Use ?debug=1 on the
// homepage to show tile outlines; add sets by extending this data and the mobile grid.
export const shootSetTiles: ShootSetTile[] = [
  {
    slug: "bali-vibes",
    title: "Bali Vibes",
    image: "/images/locations/bali-vibes/3.jpg",
    alt: "Tropical Bali-inspired shoot set with palms and a sunset pool",
    index: "01",
    left: 0,
    top: 15.9,
    width: 43.2,
    height: 35,
    polygon: "polygon(0 2.6%, 100% 0, 100% 97.4%, 0 100%)",
    direction: "left",
  },
  {
    slug: "spanish-old-town",
    title: "Spanish Old Town",
    image: "/images/locations/spanish town/sot6.jpg",
    alt: "Spanish old-town street with warm stone and flowering balconies",
    index: "02",
    left: 44,
    top: 3.3,
    width: 21.8,
    height: 25.1,
    polygon: "polygon(0 0, 100% 0, 100% 100%, 0 98.6%)",
    direction: "left",
  },
  {
    slug: "tuscany-street",
    title: "Tuscany Street",
    image: "/images/locations/tuscany-street/ts3.jpg",
    alt: "Golden Tuscan street opening onto hills at sunset",
    index: "03",
    left: 66.7,
    top: 3.3,
    width: 33.3,
    height: 24.8,
    polygon: "polygon(0 0, 100% 0, 100% 98.3%, 0 100%)",
    direction: "right",
  },
  {
    slug: "moroccan-fort",
    title: "Moroccan Fort",
    image: "/images/locations/moroccan-fort/mfort2.jpg",
    alt: "Moroccan fort courtyard with arches and warm evening light",
    index: "04",
    left: 43.7,
    top: 28.9,
    width: 20.2,
    height: 20.7,
    polygon: "polygon(0 0, 100% 0, 100% 97%, 0 100%)",
    direction: "bottom",
  },
  {
    slug: "greece-vibes",
    title: "Greece Vibes",
    image: "/images/locations/greece-vibes/gv5.jpg",
    alt: "Bright Greek-inspired terrace with white walls and sea views",
    index: "05",
    left: 64.5,
    top: 28.9,
    width: 20.9,
    height: 20.4,
    polygon: "polygon(0 0.6%, 100% 0, 100% 98%, 0 100%)",
    direction: "bottom",
  },
  {
    slug: "floral-arches",
    title: "Floral Arches",
    image: "/images/locations/floral-arches/fag2.jpg",
    alt: "Floral archway framing a sunset garden",
    index: "06",
    left: 86.1,
    top: 28.4,
    width: 13.9,
    height: 19.1,
    polygon: "polygon(0 1%, 100% 0, 100% 99%, 0 100%)",
    direction: "right",
  },
];
