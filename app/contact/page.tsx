import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact Photio — Book a Shoot", description: "Tell Photio about your wedding, pre-wedding, event, or brand photography plans. Based in Sector 63, Noida." };

function ContactDetails() {
  return <aside className="bg-[#eeece8] p-6 sm:p-9"><p className="eyebrow">Find us & get in touch</p><div className="mt-8 space-y-7"><div className="flex gap-4"><MapPin size={17} className="mt-1 shrink-0" /><p className="text-sm leading-6">LL3 E-2, Sector 63<br />Noida, Uttar Pradesh 201301<br />India</p></div><a className="flex min-h-11 items-center gap-4 text-sm" href="tel:[PHONE]"><Phone size={17} />[PHONE]</a><a className="flex min-h-11 items-center gap-4 text-sm" href="mailto:[EMAIL]"><Mail size={17} />[EMAIL]</a><div><p className="eyebrow mb-2 text-ash">Studio hours</p><p className="text-sm leading-6">Monday – Saturday<br />10:00 am – 6:00 pm IST</p></div></div><div className="mt-9 overflow-hidden"><iframe title="Map showing Photio in Sector 63, Noida" src="https://www.google.com/maps?q=Sector%2063%20Noida&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0 grayscale" /></div></aside>;
}

export default function ContactPage() {
  return <><PageIntro index="05" subtitle="The first hello" title={<>Tell us what<br /><i>you&apos;re dreaming.</i></>}><p>Share a few details. We&apos;ll listen, ask thoughtful questions, and help you figure out what feels right.</p></PageIntro><section data-theme="light" className="section-pad bg-paper"><div className="container grid gap-14 lg:grid-cols-12"><div className="lg:col-span-7"><Suspense fallback={<p className="text-sm text-ash">Preparing the enquiry form…</p>}><ContactForm /></Suspense></div><div className="lg:col-span-4 lg:col-start-9"><ContactDetails /></div></div></section></>;
}
