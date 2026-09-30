export type Project = {
  slug: string;
  couple: string;
  location: string;
  type: string;
  category: string;
  image: string;
  description: string;
};

const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const projects: Project[] = [
  { slug: "aanya-rahul", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Pre-wedding", category: "Pre-Wedding", image: photo("photo-1537633552985-df8429e8048b"), description: "A quiet sunrise, pink stone, and two people who forgot the camera was there." },
  { slug: "meera-arjun", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Wedding", category: "Wedding", image: photo("photo-1519741497674-611481863552"), description: "An intimate celebration shaped by old family rituals and the lake at dusk." },
  { slug: "isha-kabir", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Cinematic", category: "Cinematic", image: photo("photo-1523438885200-e635ba2c371e"), description: "A city evening made entirely their own." },
  { slug: "tara-veer", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Candid", category: "Candid", image: photo("photo-1532712938310-34cb3982ef74"), description: "A sunlit fort, a little wind, and the kind of laughter you can hear in a photograph." },
  { slug: "sana-zain", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Wedding", category: "Wedding", image: photo("photo-1511285560929-80b456fea0bc"), description: "A generous, joyful wedding with everyone they love in one place." },
  { slug: "noor-dev", couple: "[COUPLE_NAME]", location: "[LOCATION]", type: "Pre-wedding", category: "Pre-Wedding", image: photo("photo-1522673607200-164d1b6ce486"), description: "A long walk, soft winter light, and a story still unfolding." },
  { slug: "studio-01", couple: "Form / Feeling", location: "[LOCATION]", type: "Corporate", category: "Corporate", image: photo("photo-1497366754035-f200968a6e72"), description: "A considered visual language for a team building something useful." },
  { slug: "after-hours", couple: "After Hours", location: "[LOCATION]", type: "Events", category: "Events", image: photo("photo-1492684223066-81342ee5ff30"), description: "The room after the lights go low and the music takes over." },
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
