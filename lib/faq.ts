export type FAQEntry = {
  id: string;
  number: string;
  question: string;
  answer: string;
};

export const faqEntries: FAQEntry[] = [
  {
    id: "booking-timing",
    number: "01",
    question: "How far in advance should we book?",
    answer: "We recommend booking 3 to 6 months in advance for weddings, and at least 4 to 6 weeks for pre-wedding shoots, especially during peak wedding season from October to February.",
  },
  {
    id: "travel",
    number: "02",
    question: "Do you travel outside Delhi NCR?",
    answer: "Yes, we travel across India and internationally for destination weddings and shoots. Travel and accommodation are added to your package based on the location.",
  },
  {
    id: "photograph-count",
    number: "03",
    question: "How many edited photographs will we receive?",
    answer: "You'll typically receive 300 to 500 professionally edited photographs for a full wedding day, and 60 to 100 for a pre-wedding shoot, depending on your package and coverage hours.",
  },
  {
    id: "wedding-films",
    number: "04",
    question: "Do you offer cinematic wedding films?",
    answer: "Yes, cinematic wedding films are available as an add-on or as part of our premium packages, including highlight reels and full-length documentary-style films.",
  },
  {
    id: "custom-coverage",
    number: "05",
    question: "Can we customise our coverage?",
    answer: "Absolutely. Every package can be tailored to your coverage hours, number of photographers, add-ons such as drone coverage or a second shooter, and your specific must-have moments.",
  },
  {
    id: "drone",
    number: "06",
    question: "Do you provide drone photography?",
    answer: "Yes, drone photography and videography are available where permitted by local regulations. We can also coordinate any permissions required by your venue or outdoor location.",
  },
  {
    id: "payment",
    number: "07",
    question: "How does the booking and advance payment work?",
    answer: "A 20 to 30 percent advance secures your date, with the remaining balance due before or on the shoot day. We'll share a clear payment schedule in your proposal.",
  },
];
