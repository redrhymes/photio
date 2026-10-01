export type ServicePageEntry = {
  slug: string;
  title: string;
  heroTitle: [string, string];
  breadcrumb: string;
  heroImage: string;
  introTitle: string;
  introDescription: string;
  introAdditional: string;
  offeringsTitle: string;
  offerings: { title: string; description: string }[];
  trendsTitle: string;
  trendsDescription: string;
  trends: { title: string; description: string }[];
  ideasTitle: string;
  ideas: { title: string; description: string; details?: string[] }[];
  ctaDescription: string;
};

export const servicePages: ServicePageEntry[] = [
  {
    slug: "pre-wedding",
    title: "Pre-Wedding & Wedding Shoots",
    heroTitle: ["Pre-Wedding &", "Wedding Shoots"],
    breadcrumb: "Pre-wedding",
    heroImage: "/images/portfolio/FB_IMG_1738507126356.jpg",
    introTitle: "Our Approach and Work Specifics",
    introDescription: "At Photio, photography is about more than pictures — it is about preserving emotion, connection and memory. We take time to understand your vision, plan each detail and create photographs that feel true to you.",
    introAdditional: "From the first conversation to the final gallery, we shape a relaxed experience around your story, choosing thoughtful locations and a visual direction that lets your connection lead.",
    offeringsTitle: "What We Capture",
    offerings: [
      { title: "Emotional milestones", description: "The glances, embraces and joyful moments that make your celebration deeply personal." },
      { title: "Timeless portraits", description: "Guided, natural portraits with room for real movement and the way you are together." },
      { title: "Thoughtful details", description: "The setting, styling and small considered touches that complete the story of your day." },
      { title: "Personalized concepts", description: "A shoot shaped around your ideas, chosen locations and the atmosphere you want to remember." },
      { title: "Candid moments", description: "Honest interactions and unscripted emotion, photographed as they naturally unfold." },
      { title: "Stress-free experience", description: "Clear planning and gentle direction help you feel present rather than perform for the camera." },
    ],
    trendsTitle: "Trends in Wedding Photography",
    trendsDescription: "Wedding photography holds a day's emotions, rituals and details. Our approach balances candid moments, intentional portraits and thoughtful visual storytelling.",
    trends: [
      { title: "Film-inspired aesthetics", description: "Grain, muted tones and timeless colour inspired by the character of analog film." },
      { title: "Drone photography", description: "Aerial views of venues and landscapes add scale and a fresh sense of place." },
      { title: "Documentary style", description: "Unposed storytelling focused on real emotion and natural interactions." },
      { title: "Sustainable practices", description: "Digital galleries and considered production choices help keep the experience thoughtful." },
    ],
    ideasTitle: "Ideas for Pre-Wedding Shoots",
    ideas: [
      { title: "Thematic shoots", description: "Build a visual world around a shared interest, a favourite era or a place that means something to you.", details: ["Vintage romance", "Nature lovers", "Urban vibes", "Cultural storytelling"] },
      { title: "Casual & candid", description: "Coffee dates, walks, picnics and everyday moments create space for natural interaction rather than forced poses." },
      { title: "Adventurous concepts", description: "Make a location the beginning of the story with a hike, destination session, night shoot or cinematic outdoor concept." },
    ],
    ctaDescription: "Tell us what you are planning, what you are imagining and what matters most to you.",
  },
  {
    slug: "corporate",
    title: "Corporate Photography & Film",
    heroTitle: ["Corporate", "Photography & Film"],
    breadcrumb: "Corporate",
    heroImage: "/images/portfolio/Promotional.jpg",
    introTitle: "Elevate Your Brand Through Visual Storytelling",
    introDescription: "In a digital-first world, visuals shape how a business is perceived. Photio creates considered photography and video that reflect your brand, team culture and business identity.",
    introAdditional: "We work with your team to understand the audience, message and channels, then create useful visual assets with a consistent point of view.",
    offeringsTitle: "What We Offer",
    offerings: [
      { title: "Professional headshots", description: "Approachable, polished portraits for leadership, teams, press and company profiles." },
      { title: "Corporate event coverage", description: "Keynotes, launches and gatherings documented with the people and energy in focus." },
      { title: "Office lifestyle photography", description: "Authentic workplace imagery that gives clients and future teammates a feel for your culture." },
      { title: "Promotional & brand videos", description: "Purposeful short-form films designed around your message, campaign or service." },
      { title: "Client testimonials & interviews", description: "Clear, natural conversations that bring customer experience and expertise to life." },
    ],
    trendsTitle: "Why Corporate Visuals Matter",
    trendsDescription: "A consistent visual story makes your brand easier to recognise and gives people a more human way to understand what you do.",
    trends: [
      { title: "Build brand credibility", description: "Professional, current imagery communicates care, trust and attention to detail." },
      { title: "Increase engagement", description: "Strong visual content helps your message travel across digital channels." },
      { title: "Improve recruitment", description: "Real workplace stories help potential teammates see the people behind the company." },
      { title: "Stand out in the market", description: "A distinctive visual identity makes your brand recognisable across every touchpoint." },
    ],
    ideasTitle: "Ways to Tell Your Brand Story",
    ideas: [
      { title: "Brand portraits", description: "Leadership and team portraits with a consistent look that still feels individual." },
      { title: "Event stories", description: "A considered record of launches, conferences, milestones and the people who shape them." },
      { title: "Office culture", description: "Environmental photography that shows how your team works, collaborates and welcomes people." },
    ],
    ctaDescription: "Tell us about your brand, your audience and the images or films you need to make.",
  },
  {
    slug: "events",
    title: "Event Photography & Film",
    heroTitle: ["Events,", "as they happen."],
    breadcrumb: "Events",
    heroImage: "/images/portfolio/Event.jpg",
    introTitle: "A Sense of the Whole Occasion",
    introDescription: "Every event has its own pace and character. We photograph the people, atmosphere and defining moments while letting the occasion unfold naturally.",
    introAdditional: "From advance planning through final delivery, we coordinate around your schedule and priorities so the coverage feels considered and unobtrusive.",
    offeringsTitle: "What We Cover",
    offerings: [
      { title: "Live event coverage", description: "A clear visual record of the programme, speakers, guests and moments in between." },
      { title: "Cultural celebrations", description: "Rituals, performances and traditions photographed with care for their meaning and detail." },
      { title: "Corporate gatherings", description: "Conferences, launches and team events documented for internal and public storytelling." },
      { title: "Private occasions", description: "Intimate celebrations captured with a thoughtful balance of candid frames and portraits." },
      { title: "Event films", description: "Moving images that bring the energy, voices and rhythm of the day back to life." },
    ],
    trendsTitle: "The Value of an Event Story",
    trendsDescription: "Good event coverage does more than record a schedule. It preserves the feeling of being there and gives the occasion a life beyond the room.",
    trends: [
      { title: "The candid in-between", description: "Unscripted connections often become the frames guests return to most." },
      { title: "A sense of place", description: "Venue, light and atmosphere help every image feel rooted in this particular event." },
      { title: "People at the centre", description: "Guest and team portraits make the shared experience visible and personal." },
      { title: "Stories made to share", description: "A well-curated gallery gives hosts useful images for memories, press and future events." },
    ],
    ideasTitle: "Event Stories We Create",
    ideas: [
      { title: "Live and on stage", description: "Performances, talks and key moments captured with a responsive eye for action and expression." },
      { title: "People and connection", description: "Guest portraits and candid interactions that show the human side of the gathering." },
      { title: "Details and atmosphere", description: "A visual record of the setting, design, food and small touches that set the mood." },
    ],
    ctaDescription: "Share the date, schedule and spirit of your event, and we will plan the coverage around it.",
  },
  {
    slug: "music-albums",
    title: "Music & Album Visuals",
    heroTitle: ["Visuals for", "the sound."],
    breadcrumb: "Music albums",
    heroImage: "/images/locations/musical-nights/mn1.jpg",
    introTitle: "A Visual World for Your Music",
    introDescription: "An album's imagery can extend its sound into a whole world. We collaborate with artists to create photographs and films with a visual language that feels distinctly theirs.",
    introAdditional: "From early concept conversations to the final frames, we build around the music, the artist and the feeling listeners should carry with them.",
    offeringsTitle: "What We Create",
    offerings: [
      { title: "Album cover stories", description: "Distinctive cover imagery developed to sit naturally beside the music." },
      { title: "Artist portraits", description: "Expressive portraits for releases, press, platforms and artist profiles." },
      { title: "Behind the scenes", description: "The creative process, rehearsals and human moments around a project." },
      { title: "Music videos", description: "Cinematic visual interpretations shaped around the track and artist direction." },
      { title: "Promotional visuals", description: "A considered collection of campaign assets for release announcements and live dates." },
    ],
    trendsTitle: "Why Music Needs a Visual Story",
    trendsDescription: "Visuals give listeners another way into a release. A coherent visual world helps a track, artist and live identity stay connected.",
    trends: [
      { title: "A recognisable identity", description: "Consistent imagery helps audiences connect a release to the artist behind it." },
      { title: "A feeling beyond the track", description: "Colour, texture and movement can carry the mood of music into a frame." },
      { title: "A closer artist connection", description: "Personal portraits and process stories invite listeners into the work." },
      { title: "A release with a life", description: "A flexible image library supports the album from announcement through performance." },
    ],
    ideasTitle: "Ways to Build the Visuals",
    ideas: [
      { title: "The cover story", description: "A focused concept and hero image designed to introduce the release at a glance." },
      { title: "Artist portraiture", description: "A versatile portrait session that leaves room for both intimacy and performance." },
      { title: "Behind the music", description: "Rehearsals, recording and live moments gathered into an honest project archive." },
    ],
    ctaDescription: "Tell us about the release, the sound and the visual world you want to build around it.",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
