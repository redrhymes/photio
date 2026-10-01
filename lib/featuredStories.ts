import { projects } from "@/lib/content";

export const featuredStories = projects.flatMap((project) => {
  if (!project.featured || !project.featuredNames) return [];
  return [{
    slug: project.slug,
    coupleNames: project.featuredNames,
    couple: project.title,
    location: project.location,
    shootType: project.shootType,
    description: project.description,
    heroImage: project.featuredHeroImage ?? project.coverImage,
  }];
});
