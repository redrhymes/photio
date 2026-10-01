import type { Metadata } from "next";
import { ServicesHeader } from "@/components/ServicesHeader";
import { ServicesListSection } from "@/components/ServicesListSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FAQSection } from "@/components/FAQSection";

export const metadata: Metadata = { title: "Photography & Film Services", description: "Wedding, pre-wedding, corporate, event, and music album photography by Photio in Noida and across Delhi NCR." };

export default function ServicesPage() {
  return (
    <>
      <ServicesHeader />
      <ServicesListSection />
      <ExperienceSection />
      <FAQSection />
    </>
  );
}
