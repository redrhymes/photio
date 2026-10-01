import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PortfolioProjectGallery } from "@/components/PortfolioProjectGallery";
import { projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Portfolio story" };

  const location = project.location.startsWith("[") ? "Across India" : project.location;
  const description = project.description || `A ${project.shootType.toLowerCase()} story in ${location}, captured by Photio.`;
  const title = `${project.title} — ${project.shootType} | Photio`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: project.coverImage, alt: `${project.title} in ${location}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  if (!project || !previous || !next) notFound();

  const location = project.location.startsWith("[") ? "Across India" : project.location;

  return (
    <article className="portfolio-project-page" data-theme="dark">
      <header className="project-editorial-header">
        <div className="project-editorial-heading">
          <div>
            <p className="project-index">{String(index + 1).padStart(2, "0")} / PROJECT</p>
            <h1 className="project-title display">{project.title}</h1>
            <p className="project-meta">{location} — {project.shootType}</p>
          </div>
          <p className="project-description">{project.description}</p>
        </div>
        <span className="project-header-rule" aria-hidden="true" />
      </header>

      <PortfolioProjectGallery project={{ ...project, location }} />

      <nav className="project-story-navigation" aria-label="Portfolio stories">
        <Link href="/portfolio" className="project-all-stories">
          <ArrowLeft size={14} aria-hidden="true" />
          All stories
        </Link>
        <div className="project-story-links">
          <Link href={`/portfolio/${previous.slug}`} className="project-story-link project-story-previous">
            <span className="project-story-label">Previous story</span>
            <span className="project-story-title display">{previous.title}</span>
            <ArrowLeft size={17} aria-hidden="true" />
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="project-story-link project-story-next">
            <span className="project-story-label">Next story</span>
            <span className="project-story-title display">{next.title}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
