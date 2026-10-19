import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeSection } from "@/views/home/Home";
import { siteConfig } from "@/shared/config/site";
import { localeAlternates } from "@/shared/lib/seo";
import type { LocalePageProps } from "@/shared/types/page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "home" });

  const alternates = localeAlternates(locale, "/");
  const canonical = alternates.canonical as string;

  return {
    title: { absolute: siteConfig.pages.home.title },
    description: siteConfig.pages.home.description,
    alternates,
    openGraph: {
      url: canonical,
      title: siteConfig.pages.home.title,
      description: siteConfig.pages.home.description,
    },
    twitter: {
      title: siteConfig.pages.home.title,
      description: siteConfig.pages.home.description,
    },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author,
  url: siteConfig.url,
  jobTitle: siteConfig.og.subtitle,
  email: `mailto:${siteConfig.socials.email}`,
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
};

export default async function Home({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <HomeSection />
    </>
  );
}
