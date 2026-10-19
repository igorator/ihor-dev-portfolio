import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getProjectSlugs } from "@/entities/project/api";
import { ProjectSection } from "@/views/project-detail/Project";
import { siteConfig } from "@/shared/config/site";
import { localeAlternates } from "@/shared/lib/seo";
import type { SlugPageProps } from "@/shared/types/page";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

// Prerendered at build (SSG); re-generated in the background at most every
// 5 minutes so new covers/screens from the assets repo show up (ISR)
export const revalidate = 300;

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return { title: "Not Found" };
  }

  const title = project.title || slug;
  const description =
    project.description || siteConfig.pages.project.fallbackDescription;
  const alternates = localeAlternates(locale, `/projects/${slug}`);
  const canonical = alternates.canonical as string;

  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      url: canonical,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: SlugPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);

  if (!project) notFound();

  const isDefaultLocale = locale === routing.defaultLocale;
  const baseUrl = siteConfig.url;
  const projectUrl = `${baseUrl}${isDefaultLocale ? "" : `/${locale}`}/projects/${slug}`;
  const projectsUrl = `${baseUrl}${isDefaultLocale ? "" : `/${locale}`}/projects`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: projectsUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <ProjectSection
        title={project.title}
        description={project.description}
        type={project.type}
        category={project.category}
        date={project.date}
        cover={project.cover ?? ""}
        technologies={project.technologies}
        githubUrl={project.githubUrl}
        demoUrl={project.demoUrl}
        screens={project.screens ?? []}
        video={project.video}
      />
    </>
  );
}
