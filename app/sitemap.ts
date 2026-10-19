import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/entities/project/data/projects";
import { getProjectSlugs } from "@/entities/project/api";
import { siteConfig } from "@/shared/config/site";
import { localePath } from "@/shared/lib/seo";

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/employment", changeFrequency: "monthly", priority: 0.7 },
];

const projectEntries = getProjectSlugs().map((slug) => ({
  slug,
  lastModified: new Date(`${projects[slug].date}-01`),
}));

function alternatesForPath(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [
        l,
        new URL(localePath(l, path), siteConfig.url).toString(),
      ]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, route.path),
        siteConfig.url,
      ).toString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternatesForPath(route.path),
    });
  }

  for (const project of projectEntries) {
    const projectPath = `/projects/${project.slug}`;
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, projectPath),
        siteConfig.url,
      ).toString(),
      lastModified: project.lastModified ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternatesForPath(projectPath),
    });
  }

  return urls;
}
