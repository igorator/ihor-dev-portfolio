import { siteConfig } from "@/shared/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/shared/lib/og";

export const alt = siteConfig.pages.home.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: siteConfig.og.subtitle,
    title: siteConfig.name,
    description: siteConfig.description,
    tags: siteConfig.keywords.slice(1, 5).map((label) => ({ label })),
  });
}
