import type { Locale } from "next-intl";
import { getProjectBySlug } from "@/entities/project/api";
import { siteConfig } from "@/shared/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/shared/lib/og";

export const alt = siteConfig.pages.project.fallbackDescription;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return renderOgImage({ title: siteConfig.name });
  }

  return renderOgImage({
    eyebrow: [project.type, project.category].filter(Boolean).join(" · "),
    title: project.title,
    description: project.description,
    tags: project.technologies.map((tech) => ({
      label: tech.name,
      color: tech.color,
    })),
  });
}
