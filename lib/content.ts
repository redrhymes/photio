export type Project = {
  slug: string;
  title: string;
  featuredNames?: [string, string];
  featured?: boolean;
  featuredHeroImage?: string;
  location: string;
  shootType: string;
  category: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
};

const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const portfolioGalleryAssets = [
  "/images/portfolio/1.webp",
  "/images/portfolio/2.webp",
  "/images/portfolio/3.webp",
  "/images/portfolio/4.webp",
  "/images/portfolio/5.webp",
  "/images/portfolio/7.jpg",
  "/images/portfolio/8.webp",
  "/images/portfolio/9.webp",
  "/images/portfolio/11.webp",
  "/images/portfolio/12.webp",
  "/images/portfolio/13.webp",
  "/images/portfolio/14.jpg",
  "/images/portfolio/15.webp",
  "/images/portfolio/17.webp",
  "/images/portfolio/18.webp",
  "/images/portfolio/19.webp",
  "/images/portfolio/Corporate.jpg",
  "/images/portfolio/Event.jpg",
  "/images/portfolio/FB_IMG_1738411075303.jpg",
  "/images/portfolio/FB_IMG_1738411095158.jpg",
  "/images/portfolio/FB_IMG_1738411109066.jpg",
  "/images/portfolio/FB_IMG_1738411115895.jpg",
  "/images/portfolio/FB_IMG_1738411140820.jpg",
  "/images/portfolio/FB_IMG_1738507126356.jpg",
  "/images/portfolio/FB_IMG_1738550506030.jpg",
  "/images/portfolio/FB_IMG_1738766384113.jpg",
  "/images/portfolio/FB_IMG_1738766386770.jpg",
  "/images/portfolio/FB_IMG_1738766393746.jpg",
  "/images/portfolio/FB_IMG_1738766397194.jpg",
  "/images/portfolio/FB_IMG_1738766402720.jpg",
  "/images/portfolio/FB_IMG_1738766417043.jpg",
  "/images/portfolio/FB_IMG_1738766427617.jpg",
  "/images/portfolio/FB_IMG_1738766445806.jpg",
  "/images/portfolio/FB_IMG_1738766467037.jpg",
  "/images/portfolio/FB_IMG_1738766579976.jpg",
  "/images/portfolio/FB_IMG_1738766582950.jpg",
  "/images/portfolio/FB_IMG_1738766662415.jpg",
  "/images/portfolio/Promotional.jpg",
];

const galleryForProject = (offset: number, coverImage: string) => {
  const candidates = portfolioGalleryAssets.filter((image) => image !== coverImage);
  const start = (offset * 4) % candidates.length;
  return Array.from({ length: 6 }, (_, index) => candidates[(start + index) % candidates.length]!);
};

export const projects: Project[] = [
  { slug: "aanya-rahul", title: "Aarav & Mehreen", featuredNames: ["Aarav &", "Mehreen"], featured: true, featuredHeroImage: "/images/portfolio/FB_IMG_1738507126356.jpg", location: "Jaipur", shootType: "Pre-wedding", category: "Pre-Wedding", coverImage: "/images/portfolio/FB_IMG_1738411100106.jpg", galleryImages: galleryForProject(0, "/images/portfolio/FB_IMG_1738411100106.jpg"), description: "A celebration of love, architecture and everything in between." },
  { slug: "meera-arjun", title: "Aanya & Rohan", featuredNames: ["Aanya &", "Rohan"], featured: true, location: "Jaipur", shootType: "Wedding", category: "Wedding", coverImage: "/images/portfolio/2-process.webp", galleryImages: galleryForProject(1, "/images/portfolio/2-process.webp"), description: "An intimate celebration framed by the carved arches of a historic palace." },
  { slug: "isha-kabir", title: "Isha & Kabir", featuredNames: ["Isha &", "Kabir"], featured: true, location: "Delhi", shootType: "Cinematic", category: "Cinematic", coverImage: "/images/portfolio/475416934_3480357045430756_3377981072329047463_n.jpg", galleryImages: galleryForProject(2, "/images/portfolio/475416934_3480357045430756_3377981072329047463_n.jpg"), description: "A quiet forest evening made entirely their own." },
  { slug: "tara-veer", title: "Tara & Veer", featuredNames: ["Tara &", "Veer"], featured: true, location: "Jaipur", shootType: "Candid", category: "Candid", coverImage: "/images/portfolio/6.webp", galleryImages: galleryForProject(3, "/images/portfolio/6.webp"), description: "A little wind, a warm afternoon, and the kind of laughter you can hear in a photograph." },
  { slug: "sana-zain", title: "Sana & Zain", featuredNames: ["Sana &", "Zain"], featured: true, location: "Udaipur", shootType: "Wedding", category: "Wedding", coverImage: "/images/portfolio/10.webp", galleryImages: galleryForProject(4, "/images/portfolio/10.webp"), description: "A generous, joyful wedding with everyone they love in one place." },
  { slug: "noor-dev", title: "Noor & Dev", featuredNames: ["Noor &", "Dev"], featured: true, location: "Delhi", shootType: "Pre-wedding", category: "Pre-Wedding", coverImage: "/images/portfolio/16.webp", galleryImages: galleryForProject(5, "/images/portfolio/16.webp"), description: "A sunlit walk and a story still unfolding." },
  { slug: "studio-01", title: "Form / Feeling", location: "[LOCATION]", shootType: "Corporate", category: "Corporate", coverImage: "/images/portfolio/FB_IMG_1738766381528.jpg", galleryImages: galleryForProject(6, "/images/portfolio/FB_IMG_1738766381528.jpg"), description: "A considered visual language for a team building something useful." },
  { slug: "after-hours", title: "After Hours", location: "[LOCATION]", shootType: "Events", category: "Events", coverImage: "/images/portfolio/FB_IMG_1738766546744.jpg", galleryImages: galleryForProject(7, "/images/portfolio/FB_IMG_1738766546744.jpg"), description: "The room after the lights go low and the music takes over." },
];

export const shootSets = [
  { slug: "bali-vibes", name: "Bali Vibes Set", image: photo("photo-1507525428034-b723cf961d3e"), mood: "Tropical greens, warm sun, and a little escape." },
  { slug: "spanish-old-town", name: "Spanish Old Town", image: photo("photo-1516483638261-f4dbaf036963"), mood: "Old-world walls and the ease of a slow afternoon." },
  { slug: "tuscany-street", name: "Tuscany Street", image: photo("photo-1516483638261-f4dbaf036963"), mood: "Stone textures and a golden-hour walk." },
  { slug: "geometrical-set", name: "Geometrical Set", image: photo("photo-1511818966892-d7d671e672a2"), mood: "Sculptural lines for a modern love story." },
  { slug: "maazi-parasti", name: "Maazi Parasti", image: photo("photo-1518709268805-4e9042af9f23"), mood: "A nostalgic set with a timeless, lived-in feel." },
  { slug: "moroccan-fort", name: "Moroccan Fort", image: photo("photo-1539020140153-e479b8c22e70"), mood: "Intricate arches, rich texture, and dramatic light." },
  { slug: "floral-arches", name: "Floral Arches & Garden", image: photo("photo-1490750967868-88aa4486c946"), mood: "Soft florals framed by an open garden." },
  { slug: "greece-vibes", name: "Greece Vibes", image: photo("photo-1533104816931-20fa691ff6ca"), mood: "Whitewashed calm and bright, open skies." },
  { slug: "colours-and-angles", name: "Colours and Angles", image: photo("photo-1513519245088-0e12902e5a38"), mood: "Playful shapes, bold compositions, your own rules." },
  { slug: "mystical-flames", name: "Mystical Flames", image: photo("photo-1475738198235-4b30fc7b8545"), mood: "A cinematic night set with a little theatre." },
];

export const services = [
  { number: "01", title: "Pre-wedding stories", image: photo("photo-1522673607200-164d1b6ce486"), summary: "A day that feels like you, photographed before the celebrations begin.", includes: ["Concept and location planning", "A dedicated photo and film team", "Curated, edited gallery"] },
  { number: "02", title: "Wedding photography", image: photo("photo-1519741497674-611481863552"), summary: "The big moments, the small ones, and all the feeling in between.", includes: ["Candid and traditional coverage", "Ceremony-to-celebration timelines", "Print-ready edited photographs"] },
  { number: "03", title: "Corporate & events", image: photo("photo-1492684223066-81342ee5ff30"), summary: "Thoughtful coverage for the people and moments behind your brand.", includes: ["Event photography and film", "Brand and team portraits", "Delivery sized for web and press"] },
  { number: "04", title: "Music albums", image: photo("photo-1506157786151-b8491531f063"), summary: "Visual worlds for musicians, made with the same care as the sound.", includes: ["Creative direction", "Artist portraits and cover imagery", "Behind-the-scenes film options"] },
];

export const testimonials = [
  { quote: "[TESTIMONIAL_QUOTE]", names: "[COUPLE_NAME]", note: "Pre-wedding · [LOCATION]" },
  { quote: "[TESTIMONIAL_QUOTE]", names: "[COUPLE_NAME]", note: "Wedding · [LOCATION]" },
  { quote: "[TESTIMONIAL_QUOTE]", names: "[COUPLE_NAME]", note: "Wedding · [LOCATION]" },
];

export const servicesFaqs = [
  { question: "When will we receive our photographs?", answer: "Your edited gallery is usually ready within 4–6 weeks. We share a small preview sooner, so you can revisit a few favourites while we finish the full set." },
  { question: "Do you travel for outstation shoots?", answer: "Yes. We photograph across Delhi NCR and travel throughout India. We will plan travel and stay with you before confirming your date." },
  { question: "Can you arrange drone coverage?", answer: "We can include drone footage where venue rules, weather, and local permissions allow. We confirm feasibility with your venue in advance." },
  { question: "How do we reserve a date?", answer: "A 30% advance confirms your booking. The remaining schedule is shared clearly in your proposal." },
  { question: "How many edited images are included?", answer: "The final number depends on the length and format of your shoot. Your proposal will include an exact delivery range and what is edited." },
];

export { photo };
