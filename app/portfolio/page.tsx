import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = { title: "Portfolio | Wedding Stories & Photography", description: "Explore Photio's candid, cinematic wedding and pre-wedding photography from Noida, Delhi NCR, and across India." };

export default function PortfolioPage() {
  return <><PageIntro index="01" subtitle="The portfolio" title={<>Real days.<br /><i>Remembered.</i></>}><p>Every celebration has its own rhythm. These are a few we still think about.</p></PageIntro><PortfolioGrid /></>;
}
