import Image from "@/components/OptimizedImage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/PageIntro";
import { photo, shootSets } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return shootSets.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const set = shootSets.find((item) => item.slug === slug);
  return { title: set ? `${set.name} Shoot Set` : "Shoot Set", description: set?.mood };
}

export default async function ShootSetDetail({ params }: Props) {
  const { slug } = await params;
  const set = shootSets.find((item) => item.slug === slug);
  if (!set) notFound();
  const gallery = [set.image, photo("photo-1511818966892-d7d671e672a2"), photo("photo-1490750967868-88aa4486c946")];
  return (
    <>
      <PageIntro index="Shoot Sets / Blank Spots" subtitle="A small world of your own" title={<>{set.name.split(" ").slice(0, -1).join(" ")}<br /><i>{set.name.split(" ").slice(-1)}</i></>}><p>{set.mood} Bring your people, your story, and a little room to play.</p></PageIntro>
      <section data-theme="light" className="bg-paper px-4 py-4 sm:px-10 sm:py-10"><div className="relative aspect-[.9] sm:aspect-[1.8]"><Image src={set.image} alt={`${set.name} themed shoot set`} fill sizes="100vw" priority className="image-cover" /></div></section>
      <section data-theme="light" className="section-pad bg-paper"><div className="container grid gap-8 lg:grid-cols-12"><div className="lg:col-span-4"><p className="eyebrow mb-4">The feeling</p><h2 className="display text-5xl leading-none">A scene for your <i>story.</i></h2></div><div className="lg:col-span-6 lg:col-start-6"><p className="text-sm leading-7 text-ash">{set.mood} Our team will help you choose a time, style the details, and find a pace that feels natural.</p><p className="eyebrow mt-8">Suggested for</p><p className="mt-2 text-sm">Pre-wedding · Portraits · Anniversary · Fashion</p><Button href={`/contact?set=${encodeURIComponent(set.name)}`} className="mt-8">Book this set</Button></div></div></section>
      <section data-theme="light" className="bg-paper px-4 pb-24 sm:px-10"><div className="grid grid-cols-2 gap-3">{gallery.map((image, index) => <div key={`${image}-${index}`} className={`relative aspect-[.8] overflow-hidden ${index === 0 ? "col-span-2 aspect-[1.8]" : ""}`}><Image src={image} alt={`${set.name} set detail ${index + 1}`} fill sizes={index === 0 ? "100vw" : "50vw"} className="image-cover" /></div>)}</div></section>
    </>
  );
}
