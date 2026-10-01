import type { Metadata } from "next";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { FeaturedStorySection } from "@/components/FeaturedStorySection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { FinalCTASection } from "@/components/FinalCTASection";

export const metadata: Metadata = { title: "Portfolio | Wedding Stories & Photography", description: "Explore Photio's candid, cinematic wedding and pre-wedding photography from Noida, Delhi NCR, and across India." };

export default function PortfolioPage() {
  return <><PortfolioHeader /><PortfolioGrid /><FeaturedStorySection /><FinalCTASection /></>;
}
