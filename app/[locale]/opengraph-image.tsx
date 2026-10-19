import { siteConfig } from "@/shared/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/shared/lib/og";

export const alt = siteConfig.pages.home.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: siteConfig.name,
    description: siteConfig.og.subtitle,
  });
}
