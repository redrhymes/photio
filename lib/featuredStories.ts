import { projects } from "@/lib/content";

export const featuredStories = projects.flatMap((project) => {
  if (!project.featured || !project.featuredHeading) return [];
  return [{
    slug: project.slug,
    heading: project.featuredHeading,
    title: project.title,
    location: project.location,
    shootType: project.shootType,
    description: project.description,
    heroImage: project.featuredHeroImage ?? project.coverImage,
  }];
});
