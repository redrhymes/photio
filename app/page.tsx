import { Hero } from "@/components/Hero";
import { ApproachSection } from "@/components/ApproachSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SelectedWork } from "@/components/SelectedWork";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTASection } from "@/components/FinalCTASection";

export default function HomePage() {
  return (
    <div className="page-wrap">
      <Hero />

      <ApproachSection />

      <ServicesSection />

      <SelectedWork />

      <TestimonialsSection />

      <FinalCTASection />
    </div>
  );
}
