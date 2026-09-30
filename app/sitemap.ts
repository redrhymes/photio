import type { MetadataRoute } from "next";
import { projects, shootSets } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://photio.in";
  const pages = ["", "/portfolio", "/services", "/shoot-sets", "/about", "/contact"].map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route ? 0.7 : 1 }));
  const stories = projects.map(({ slug }) => ({ url: `${base}/portfolio/${slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.6 }));
  const sets = shootSets.map(({ slug }) => ({ url: `${base}/shoot-sets/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...pages, ...stories, ...sets];
}
