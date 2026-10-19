import type { Locale } from "next-intl";
import { technologies } from "@/entities/technology/data/technologies";
import { technologiesI18n } from "@/entities/technology/data/i18n";
import type { Technology } from "@/entities/technology/types";

// Local data only: no I/O, so nothing to cache
export function getTechnologies(locale: Locale): Technology[] {
  const i18n = technologiesI18n[locale];

  return Object.entries(technologies)
    .map(([id, base]) => ({
      id,
      ...base,
      ...i18n[id as keyof typeof i18n],
    }))
    .toSorted((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category, locale);
      }
      return a.priority - b.priority;
    });
}
