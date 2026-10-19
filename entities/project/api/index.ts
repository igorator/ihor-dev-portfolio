import { cache } from "react";
import type { Locale } from "next-intl";

import { projects, type ProjectSlug } from "@/entities/project/data/projects";
import { projectsI18n } from "@/entities/project/data/i18n";
import { getTechnologies } from "@/entities/technology/api";
import type { Technology } from "@/entities/technology/types";
import type {
  Project,
  ProjectDetail,
  ProjectSummary,
} from "@/entities/project/types";

import { listProjectImages } from "./images";
import { listProjectVideo } from "./videos";

const isProjectSlug = (slug: string): slug is ProjectSlug => slug in projects;

const visibleSlugs = (): ProjectSlug[] =>
  (Object.keys(projects) as ProjectSlug[]).filter(
    (slug) => !projects[slug].isHidden,
  );

// Merges base data, translations and technologies; no network
function buildProject(
  slug: ProjectSlug,
  locale: Locale,
  technologies: Map<string, Technology>,
): Project {
  const { technologiesIds, ...base } = projects[slug];

  return {
    slug,
    ...base,
    ...projectsI18n[locale][slug],
    technologies: technologiesIds
      .map((id) => technologies.get(id))
      .filter((tech): tech is Technology => tech !== undefined)
      .toSorted((a, b) => a.priority - b.priority),
  };
}

const technologyMap = (locale: Locale) =>
  new Map(getTechnologies(locale).map((tech) => [tech.id, tech]));

export const getProjectSlugs = (): ProjectSlug[] => visibleSlugs();

export function getProjectSummaries(locale: Locale): ProjectSummary[] {
  return visibleSlugs().map((slug) => ({
    slug,
    title: projectsI18n[locale][slug].title,
  }));
}

// Wrapped in React cache: page, metadata and OG image share one call per
// request. Network data below is cached across requests by fetch (see cdn.ts)
export const getProjects = cache(async (locale: Locale): Promise<Project[]> => {
  const technologies = technologyMap(locale);
  const list = visibleSlugs()
    .map((slug) => buildProject(slug, locale, technologies))
    .toSorted((a, b) => b.date.localeCompare(a.date));

  const images = await Promise.all(
    list.map((project) => listProjectImages(project.slug)),
  );

  return list.map((project, i) => ({
    ...project,
    cover: images[i]?.cover ?? undefined,
  }));
});

export const getProjectBySlug = cache(
  async (slug: string, locale: Locale): Promise<ProjectDetail | null> => {
    if (!isProjectSlug(slug) || projects[slug].isHidden) return null;

    const project = buildProject(slug, locale, technologyMap(locale));
    const [images, video] = await Promise.all([
      listProjectImages(slug),
      listProjectVideo(slug),
    ]);

    return {
      ...project,
      cover: images.cover ?? undefined,
      screens: images.screens,
      video: video ?? undefined,
    };
  },
);
