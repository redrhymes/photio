export type ServiceCard = {
  id: string;
  number: string;
  title: string;
  titleLines: [string, string?];
  pinX: number;
  pinY: number;
  width: number;
  rotation: number;
  image: string;
  alt: string;
};

// Pin coordinates and width are cqw values measured against the 1672px reference canvas.
// Append ?debug=1 to the homepage to compare the pin and pivot crosshairs while nudging these values.
export const serviceCards: ServiceCard[] = [
  {
    id: "pre-wedding",
    number: "01",
    title: "PRE-WEDDING & WEDDING",
    titleLines: ["PRE-WEDDING", "& WEDDING"],
    pinX: 15.7,
    pinY: 20.2,
    width: 16.8,
    rotation: 11,
    image: "/images/home/work1.jpg",
    alt: "A couple sharing a warm, intimate pre-wedding moment",
  },
  {
    id: "corporate",
    number: "02",
    title: "CORPORATE PHOTO & VIDEO",
    titleLines: ["CORPORATE", "PHOTO & VIDEO"],
    pinX: 39.9,
    pinY: 24.8,
    width: 16.8,
    rotation: 7,
    image: "/images/portfolio/Corporate.jpg",
    alt: "A thoughtfully composed photograph of a modern studio workspace",
  },
  {
    id: "events",
    number: "03",
    title: "EVENTS",
    titleLines: ["EVENTS"],
    pinX: 62.4,
    pinY: 21.4,
    width: 16.8,
    rotation: -10,
    image: "/images/portfolio/Event.jpg",
    alt: "A celebration venue lit for an evening event",
  },
  {
    id: "music",
    number: "04",
    title: "MUSIC ALBUMS",
    titleLines: ["MUSIC ALBUMS"],
    pinX: 87.6,
    pinY: 21.7,
    width: 15.5,
    rotation: 4,
    image: "/images/locations/musical-nights/mn1.jpg",
    alt: "A musician performing under warm stage lights",
  },
];
