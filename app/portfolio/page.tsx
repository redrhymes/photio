import type { Metadata } from "next";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { FeaturedStorySection } from "@/components/FeaturedStorySection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { FinalCTASection } from "@/components/FinalCTASection";

export const metadata: Metadata = {
  title: "Portfolio | Photography & Film | Photio",
  description: "Explore Photio's selected photography and film projects across weddings, brands, live events and music.",
};

export default function PortfolioPage() {
  return <><PortfolioHeader /><PortfolioGrid /><FeaturedStorySection /><FinalCTASection /></>;
}
