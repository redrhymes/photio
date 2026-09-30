import Image from "@/components/OptimizedImage";
import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { photo } from "@/lib/content";

export const metadata: Metadata = { title: "About Photio — The People Behind the Lens", description: "Meet the Photio team and the thoughtful approach behind our wedding and pre-wedding photography." };

export default function AboutPage() {
  return (
    <>
      <PageIntro index="04" subtitle="The people behind the lens" title={<>A camera is<br /><i>only the start.</i></>}><p>We are a small, curious team of photographers who care as much about how a day feels as how it looks.</p></PageIntro>
      <section data-theme="light" className="section-pad bg-paper"><div className="container grid items-center gap-12 lg:grid-cols-12"><div className="relative aspect-[.82] lg:col-span-5"><Image src={photo("photo-1534528741775-53994a69daeb")} alt="A Photio photographer portrait in soft natural light" fill sizes="(max-width: 1024px) 100vw, 42vw" className="image-cover" /></div><div className="lg:col-span-6 lg:col-start-7"><p className="eyebrow mb-5">Our beginning</p><h2 className="display text-5xl leading-[.95] sm:text-7xl">For the things<br />that <i>happen between.</i></h2><p className="mt-7 text-sm leading-7 text-ash">Photio began with a simple feeling: the photographs people return to are rarely the most perfectly posed. They are the frame just before, just after, the tiny details only a familiar eye notices.</p><p className="mt-5 text-sm leading-7 text-ash">From our studio in Sector 63, Noida, we work across Delhi NCR and travel wherever a good story takes us. We arrive prepared, stay present, and make space for a day to unfold its own way.</p></div></div></section>
      <section data-theme="light" className="section-pad bg-[#eeece8]"><div className="container grid gap-10 md:grid-cols-3">{[["Our philosophy", "A little direction when it helps. Plenty of room to be yourself. We look for honest gestures, honest light, and photographs that still feel like you."], ["Our approach", "Thoughtful planning should make shoot day feel lighter. We talk through the setting, timings, and people, then stay flexible when real life has other ideas."], ["Our kit & craft", "We use professional full-frame cameras, fast prime lenses, and reliable dual-backup workflows. The tools matter; the care after the shutter matters more."]].map(([title, text], i) => <article key={title} className="border-t border-black/20 pt-5"><p className="eyebrow text-ash">{`0${i + 1} / Photio`}</p><h2 className="display mt-5 text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-ash">{text}</p></article>)}</div></section>
      <section data-theme="dark" className="bg-ink px-6 py-20 text-center text-paper sm:px-12"><p className="eyebrow text-white/55">No borrowed stories. No borrowed awards.</p><p className="display mx-auto mt-5 max-w-3xl text-4xl sm:text-6xl">Just real people, shared days, and a lot of care in every frame.</p></section>
    </>
  );
}
