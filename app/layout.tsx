import "./globals.css";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/shared/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

// <html> lives in app/[locale]/layout.tsx so `lang` comes from the URL
// without reading cookies (keeps routes prerenderable)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
