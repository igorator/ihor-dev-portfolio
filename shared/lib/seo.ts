import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const localePath = (locale: string, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

// canonical + hreflang for every locale, x-default points to the default locale
export const localeAlternates = (
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> => ({
  canonical: localePath(locale, path),
  languages: {
    ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(routing.defaultLocale, path),
  },
});
