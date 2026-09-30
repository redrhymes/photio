"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Check, LoaderCircle } from "lucide-react";

const inputClass = "peer min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 py-3 text-sm text-ink placeholder:text-transparent focus:border-ink focus:ring-0";
const labelClass = "pointer-events-none absolute left-0 top-3 text-[10px] uppercase tracking-[.15em] text-ash transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px] peer-focus:-top-3 peer-focus:text-[9px]";

export function ContactForm() {
  const search = useSearchParams();
  const setName = search.get("set") ?? "";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (key !== "addOns") payload[key] = value;
    });
    payload.addOns = formData.getAll("addOns").map(String);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "We couldn't send your note. Please try again.");
      setStatus("success");
      form.reset();
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "We couldn't send your note. Please try again.");
    }
  }
  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="relative pt-3"><input className={inputClass} id="name" name="name" required autoComplete="name" placeholder=" " /><label className={labelClass} htmlFor="name">Your name *</label></div>
        <div className="relative pt-3"><input className={inputClass} id="email" name="email" type="email" required autoComplete="email" placeholder=" " /><label className={labelClass} htmlFor="email">Email address *</label></div>
        <div className="relative pt-3"><input className={inputClass} id="phone" name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} required autoComplete="tel" placeholder=" " /><label className={labelClass} htmlFor="phone">10-digit mobile *</label></div>
        <div className="relative pt-3"><input className={inputClass} id="city" name="city" required placeholder=" " /><label className={labelClass} htmlFor="city">Your city *</label></div>
        <div><label className="eyebrow mb-2 block text-ash" htmlFor="shootType">What are we photographing? *</label><select className="min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 text-sm focus:border-ink focus:ring-0" id="shootType" name="shootType" required defaultValue=""><option value="" disabled>Choose a shoot type</option><option>Pre-wedding</option><option>Wedding</option><option>Corporate / Event</option><option>Music album</option><option>Portraits</option></select></div>
        <div><label className="eyebrow mb-2 block text-ash" htmlFor="shootDate">Shoot date</label><input className="min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 text-sm focus:border-ink focus:ring-0" id="shootDate" name="shootDate" type="date" /></div>
        <div><label className="eyebrow mb-2 block text-ash" htmlFor="budget">Approx. budget</label><select className="min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 text-sm focus:border-ink focus:ring-0" id="budget" name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000–₹2,50,000</option><option>₹2,50,000+</option><option>Let&apos;s discuss</option></select></div>
        <div><label className="eyebrow mb-2 block text-ash" htmlFor="outstation">Is this outstation?</label><select className="min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 text-sm focus:border-ink focus:ring-0" id="outstation" name="outstation" defaultValue="No"><option>No</option><option>Yes</option></select></div>
      </div>
      <fieldset><legend className="eyebrow mb-4 text-ash">Interested in</legend><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">{["Videography", "Drone coverage", "Music album", "Shoot set"].map((option) => <label key={option} className="flex min-h-11 items-center gap-2"><input type="checkbox" name="addOns" value={option} className="h-4 w-4 border-black/30 text-ink focus:ring-champagne" />{option}</label>)}</div></fieldset>
      {setName && <input type="hidden" name="requestedSet" value={setName} />}
      <div className="relative pt-3"><textarea className={`${inputClass} min-h-28 resize-y`} id="message" name="message" placeholder=" " rows={3} /><label className={labelClass} htmlFor="message">Anything else we should know?</label></div>
      {status === "success" ? <div role="status" className="flex items-start gap-3 border border-black/15 p-5"><Check className="mt-0.5" size={18} /><div><p className="display text-2xl">Your note is with us.</p><p className="mt-1 text-sm text-ash">Thank you for telling us a little about your plans. We&apos;ll be in touch soon.</p></div></div> : <div className="flex flex-wrap items-center gap-5"><button disabled={status === "sending"} className="button-pill button-pill-solid min-w-44 disabled:opacity-60" type="submit">{status === "sending" ? <><LoaderCircle size={15} className="animate-spin" /> Sending</> : <>Send your enquiry <span aria-hidden="true">↗</span></>}</button>{error && <p role="alert" className="text-sm text-red-800">{error}</p>}</div>}
      <p className="text-xs leading-5 text-ash">Required fields are marked *. We&apos;ll only use your details to reply to this enquiry.</p>
    </form>
  );
}
