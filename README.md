# Photio — That click, wow!

A responsive wedding and pre-wedding photography studio site built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Lenis, and Framer Motion. Portfolio and shoot-set content lives in `lib/content.ts` so the project runs without a CMS.

## Run locally

1. Install Node.js 20.9 or newer.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add the Resend settings to enable contact delivery.
4. Start the dev server: `npm run dev`
5. Create a production build: `npm run build`, then run it with `npm start`.

The contact form returns a clear service-unavailable message until email delivery is configured. Set `RESEND_API_KEY`, `LEADS_TO_EMAIL`, and `LEADS_FROM_EMAIL` in your Vercel project environment for production. Verify the sender domain with Resend before deploying.

## Add a portfolio story

Add a `Project` object to `projects` in `lib/content.ts`, with a unique URL-safe `slug`, descriptive `image`, category, short story, and location. The portfolio filter, sitemap, and static project route pick it up automatically. Replace the sample Unsplash image URLs with licensed studio photography before launch.

## Add a shoot set

Add a set object to `shootSets` in `lib/content.ts`. It automatically appears in the set grid, sitemap, and generated detail route, with a prefilled booking link. Replace the sample photography and refine the detail gallery and description with the real set's dimensions and booking guidance.

## Production checklist

- Replace `[PHONE]`, `[EMAIL]`, `[INSTAGRAM_URL]`, `[STARTING_PRICE]`, `[YEARS]`, `[COUPLES]`, `[CITIES]`, `[COUPLE_NAME]`, `[LOCATION]`, and `[TESTIMONIAL_QUOTE]` with verified business details and approved customer quotes.
- Replace sample remote photography with studio-owned/licensed images and descriptive alt text.
- Configure Resend environment variables and send a test enquiry.
- Connect GA4 by adding the approved measurement ID and consent approach.
- Deploy to Vercel; Next.js metadata, sitemap, robots, and responsive image optimization are configured.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API credential, server-side only |
| `LEADS_TO_EMAIL` | Inbox receiving contact enquiries |
| `LEADS_FROM_EMAIL` | Verified sender, e.g. `Photio <hello@photio.in>` |

The current content source is local TypeScript data rather than Sanity. A CMS can replace `lib/content.ts` without changing the page structure and rendering components.

## Homepage hero and navigation

The reusable fixed navigation is in `components/Navbar.tsx`; `components/MobileMenu.tsx` provides its keyboard-accessible mobile overlay. Hero slide sources and alt text are listed in `components/HeroSlider.tsx`, currently using `/images/home/hero1.jpg`, `/images/home/hero2.jpg`, and `/images/home/hero3.jpg`. Keep the first slide as the priority image, and provide both a wide crop and a portrait-friendly crop where possible. Next Image is configured to serve AVIF/WebP.

The navbar uses the logo images in `public/images/white.png` and `public/images/black.png`; `public/photio-wordmark.svg` is an alternate wordmark asset. The main accent token is `--champagne` (`#E8CB94`) in `app/globals.css`, with matching Tailwind tokens in `tailwind.config.ts`.

The editorial intro directly below the hero is `components/IntroSection.tsx`. Replace `public/images/home/about.png` to change its photograph. Edit the headline in that component; its three statistics are editable through the `stats` prop using `IntroStat` values from `components/StatCounter.tsx` (the defaults are near the top of `IntroSection.tsx`).

## Global dark theme

The site uses the dark palette globally. Edit the `--bg`, `--surface`, `--surface-2`, `--line`, `--text`, `--muted`, and `--champagne` tokens in `app/globals.css`; their Tailwind color names are available in `tailwind.config.ts`. The navbar stays dark and uses the white logo on every page.

## Add or reorder selected-work stories

The dark homepage carousel directly after the intro is driven by `lib/works.ts`. Add, edit, or reorder entries in the `works` array; keep each `slug` in sync with a story in `projects` in `lib/content.ts` so its `/portfolio/[slug]` link resolves. Put the image in `public/images/home/`, update its `image` path and descriptive `alt` text. Panel widths and the start-aligned film-strip layout are configured in `app/globals.css`. The six current entries use `work1.jpg` through `work6.jpg`. Replace sample cities and shoot types with verified story details before launch; an empty `coupleNames` field hides that caption line.
