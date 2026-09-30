import Image from "@/components/OptimizedImage";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/Button";
import { services, servicesFaqs } from "@/lib/content";

export const metadata: Metadata = { title: "Photography & Film Services", description: "Wedding, pre-wedding, corporate, event, and music album photography by Photio in Noida and across Delhi NCR." };

export default function ServicesPage() {
  return (
    <>
      <PageIntro index="02" subtitle="Thoughtfully photographed" title={<>For all the<br /><i>good stuff.</i></>}><p>A crew that knows when to step in, when to step back, and how to make the day feel like yours.</p></PageIntro>
      <section data-theme="light" className="bg-paper">
        {services.map((service, index) => <article id={["pre-wedding", "wedding", "corporate", "music"][index]} key={service.number} className="relative grid scroll-mt-24 border-b border-black/15 lg:min-h-[540px] lg:grid-cols-2">
          {index === 2 && <span id="events" className="absolute top-0 scroll-mt-24" aria-hidden="true" />}
          <div className={`relative min-h-[320px] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}><Image src={service.image} alt={`${service.title} photography`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="image-cover" /></div>
          <div className={`flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-[10%] ${index % 2 ? "lg:order-1" : ""}`}>
            <p className="eyebrow text-ash">{service.number} / Photio service</p><h2 className="display mt-5 text-5xl leading-[.95] sm:text-7xl">{service.title}</h2><p className="mt-5 max-w-lg text-sm leading-7 text-ash">{service.summary}</p>
            <ul className="mt-6 space-y-3">{service.includes.map((item) => <li key={item} className="flex items-start gap-3 text-sm"><span className="text-champagne">—</span>{item}</li>)}</ul>
            <Link href="/contact" className="eyebrow mt-8 flex min-h-11 items-center gap-2">Tell us what you have in mind <ArrowUpRight size={14} /></Link>
          </div>
        </article>)}
      </section>
      <section data-theme="light" className="section-pad bg-[#eeece8]">
        <div className="container grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="eyebrow mb-4">A note on investment</p><h2 className="display text-6xl leading-none">Made to fit<br /><i>your day.</i></h2></div><div className="lg:col-span-6 lg:col-start-6"><p className="text-sm leading-7 text-ash">No two celebrations are the same, so we shape every proposal around your plans. Photography collections start from <span className="text-ink">[STARTING_PRICE]</span>. Get in touch for a considered quote, with travel and coverage details laid out clearly.</p><Button href="/contact" className="mt-7">Ask for a collection</Button></div></div>
      </section>
      <section data-theme="light" className="section-pad bg-paper"><div className="container grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="eyebrow mb-4">Good to know</p><h2 className="display text-6xl">A few <i>answers.</i></h2></div><div className="lg:col-span-7 lg:col-start-6">{servicesFaqs.map((faq) => <details key={faq.question} className="group border-t border-black/20 py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4"><span className="display text-2xl sm:text-3xl">{faq.question}</span><ChevronDown className="shrink-0 transition group-open:rotate-180" size={18} /></summary><p className="max-w-2xl pb-2 pr-8 text-sm leading-7 text-ash">{faq.answer}</p></details>)}</div></div></section>
    </>
  );
}
