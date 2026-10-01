"use client";

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { ScrollEffects } from "@/components/ScrollEffects";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <div data-scroll-progress className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-champagne" />
      <Navbar />
      <Preloader />
      <Cursor />
      <ScrollEffects />
      <main id="main-content">{children}</main>
      <Footer />
      <a href="https://wa.me/[PHONE]" target="_blank" rel="noreferrer" aria-label="Chat with Photio on WhatsApp" className="fixed bottom-5 right-5 z-40 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[#f7f5f2] text-ink shadow-lg shadow-black/25 transition hover:bg-champagne sm:bottom-8 sm:right-8">
        <MessageCircle size={20} strokeWidth={1.5} />
      </a>
    </>
  );
}
