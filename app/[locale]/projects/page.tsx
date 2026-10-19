import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjects } from "@/entities/project/api";
import { getTechnologies } from "@/entities/technology/api";
import { ProjectsSection } from "@/views/projects/Projects";
import { parseFilters } from "@/views/projects/lib/filters";
import { getProjectsConfig } from "@/shared/config/projects";
import { siteConfig } from "@/shared/config/site";
import { localeAlternates } from "@/shared/lib/seo";
import type { LocalePageProps } from "@/shared/types/page";

type ProjectsPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const alternates = localeAlternates(locale, "/projects");
  const canonical = alternates.canonical as string;

  return {
    title: { absolute: title },
    description: siteConfig.pages.projects.description,
    alternates,
    openGraph: { url: canonical },
  };
}

// Rendered per request (SSR): reading searchParams makes the route dynamic,
// so the filtered list is server-rendered for every filter combination
export default async function Projects({
  params,
  searchParams,
}: ProjectsPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);

  const [projects, config] = await Promise.all([
    getProjects(locale),
    getProjectsConfig(),
  ]);

  return (
    <ProjectsSection
      projects={projects}
      technologies={getTechnologies(locale)}
      filters={parseFilters(query)}
      commercialOnlyMode={config.commercialOnly}
    />
  );
}
