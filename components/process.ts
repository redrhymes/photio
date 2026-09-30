export type ProcessStepData = {
  number: string;
  title: string;
  body: string;
  checklist: string[];
  image: string;
  alt: string;
};

// Edit step copy here; reorder these entries to reorder the process. Add another entry
// to extend the list (the timeline markers and photo layout adapt to the number of steps).
export const processSteps: ProcessStepData[] = [
  {
    number: "01",
    title: "ENQUIRE",
    body: "Tell us about your story, your vision and your special day. We’ll get to know what matters most to you, understand your needs, and guide you through the best options for capturing it all.",
    checklist: ["SHARE YOUR DETAILS", "DISCUSS REQUIREMENTS", "GET A TAILORED PROPOSAL"],
    image: "/images/portfolio/1-process.webp",
    alt: "A planning desk with a laptop, coffee and notebook",
  },
  {
    number: "02",
    title: "PLAN THE CONCEPT",
    body: "We collaborate on themes, locations and a detailed plan to bring your vision to life. Together, we shape a thoughtful timeline so you can feel prepared and enjoy every moment.",
    checklist: ["MOODBOARD & REFERENCES", "LOCATION PLANNING", "OUTFIT & TIMELINE GUIDANCE"],
    image: "/images/portfolio/2-process.webp",
    alt: "Printed photographs and an invitation arranged on a table",
  },
  {
    number: "03",
    title: "SHOOT DAY",
    body: "A relaxed and enjoyable experience while we capture real moments, emotions and everything in between. Our team keeps the day flowing naturally, so you can stay present with the people you love.",
    checklist: ["PROFESSIONAL CREW", "CANDID & DIRECTED SHOTS", "A SEAMLESS EXPERIENCE"],
    image: "/images/portfolio/Event.jpg",
    alt: "A photographer capturing a couple at golden hour",
  },
  {
    number: "04",
    title: "DELIVERY",
    body: "Your beautifully edited memories, ready to be relived — in high quality and timeless formats. Revisit the feeling of your day, share it with family, and keep your favourite moments close for years to come.",
    checklist: ["PROFESSIONALLY EDITED", "HIGH-RESOLUTION OUTPUT", "EASY SHARING & ALBUM OPTIONS"],
    image: "/images/portfolio/07-process.webp",
    alt: "A Photio album box opened to reveal a printed photograph",
  },
];
