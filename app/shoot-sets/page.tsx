import Image from "@/components/OptimizedImage";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { shootSets } from "@/lib/content";

export const metadata: Metadata = { title: "Shoot Sets — Blank Spots by Photio", description: "Explore Photio's themed shoot sets in Noida. Book a set for your pre-wedding or portrait story." };

export default function ShootSetsPage() {
  return (
    <>
      <PageIntro index="03" subtitle="Blank Spots by Photio" title={<>Step into<br /><i>somewhere else.</i></>}><p>Ten little worlds at our Noida studio, ready for your own story. Meet the Shoot Sets — lovingly called Blank Spots.</p></PageIntro>
      <section data-theme="light" className="section-pad bg-paper"><div className="container grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{shootSets.map((set, index) => <Link href={`/shoot-sets/${set.slug}`} key={set.slug} className={`group ${index % 3 === 1 ? "sm:mt-14" : ""}`} data-cursor-label="View"><div className="relative aspect-[.84] overflow-hidden bg-fog"><Image src={set.image} alt={`${set.name} themed set at Photio`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="image-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" /><span className="absolute bottom-5 left-5 text-white"><span className="eyebrow block text-white/75">{`Set 0${index + 1}`}</span><span className="display mt-1 block text-3xl sm:text-4xl">{set.name}</span></span><span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={16} /></span></div><p className="mt-3 text-sm leading-6 text-ash">{set.mood}</p></Link>)}</div></section>
    </>
  );
}
