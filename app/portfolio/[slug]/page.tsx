import Image from "@/components/OptimizedImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/PageIntro";
import { photo, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project ? `${project.couple} — ${project.location}` : "Portfolio story", description: project?.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const gallery = [project.image, photo("photo-1511285560929-80b456fea0bc"), photo("photo-1537633552985-df8429e8048b"), photo("photo-1522673607200-164d1b6ce486")];
  return (
    <>
      <PageIntro index="Portfolio / Story" subtitle={`${project.location} · ${project.type}`} title={<>{project.couple.split(" & ")[0]} <i>&</i><br />{project.couple.split(" & ")[1] ?? "A story"}</>}><p>{project.description}</p></PageIntro>
      <section data-theme="light" className="bg-paper px-4 py-4 sm:px-10 sm:py-10"><div className="relative aspect-[.9] w-full overflow-hidden sm:aspect-[1.85]"><Image src={project.image} alt={`${project.couple}, a Photio ${project.type.toLowerCase()} story`} fill sizes="100vw" priority className="image-cover" /></div></section>
      <section data-theme="light" className="section-pad bg-paper"><div className="container grid gap-8 lg:grid-cols-12"><p className="eyebrow lg:col-span-2">A story in passing</p><p className="display text-4xl leading-tight sm:text-6xl lg:col-span-8">No two days ask to be remembered in quite the same way. This one asked us to slow down, look closer, and leave room for the unexpected.</p></div></section>
      <section data-theme="light" className="bg-paper px-4 pb-24 sm:px-10"><div className="grid grid-cols-2 gap-2 sm:gap-5">{gallery.map((image, i) => <div key={image} className={`relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[1.8]" : "aspect-[.78]"}`}><Image src={image} alt={`${project.couple} photo ${i + 1}`} fill sizes={i === 0 ? "100vw" : "50vw"} className="image-cover" /></div>)}</div></section>
      <section data-theme="dark" className="bg-ink px-6 py-16 text-paper sm:px-12"><div className="container flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4 text-white/55">Up next</p><Link href={`/portfolio/${next.slug}`} className="display text-5xl sm:text-7xl">{next.couple} <ArrowUpRight className="inline" size={32} /></Link><p className="mt-2 text-sm text-white/60">{next.location}</p></div><Button href="/portfolio">Back to portfolio <ArrowLeft size={14} /></Button></div></section>
    </>
  );
}
