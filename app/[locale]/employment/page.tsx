import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getEmployment } from "@/entities/employment/api";
import { EmploymentSection } from "@/views/employment/Employment";
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
  const t = await getTranslations({ locale, namespace: "employment" });

  const title = t("title");
  const alternates = localeAlternates(locale, "/employment");
  const canonical = alternates.canonical as string;

  return {
    title: { absolute: title },
    description: siteConfig.pages.employment.description,
    alternates,
    openGraph: { url: canonical },
  };
}

export default async function Employment({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const employmentHistory = getEmployment(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
