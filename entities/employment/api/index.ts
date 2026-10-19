import type { Locale } from "next-intl";

import {
  employment,
  type EmploymentId,
} from "@/entities/employment/data/employment";
import { employmentI18n } from "@/entities/employment/data/i18n";
import type { Employment } from "@/entities/employment/types";
import { getProjectSummaries } from "@/entities/project/api";

// Local data only: no I/O, so nothing to cache
export function getEmployment(locale: Locale): Employment[] {
  const projectsBySlug = new Map(
    getProjectSummaries(locale).map((project) => [project.slug, project]),
  );

  return (Object.keys(employment) as EmploymentId[]).map((id) => {
    const { projects, ...base } = employment[id];

    return {
      id,
      ...base,
      ...employmentI18n[locale][id],
      // Hidden projects are absent from summaries and get dropped here
      linkedProjects: projects.flatMap((slug) => {
        const project = projectsBySlug.get(slug);
        return project ? [project] : [];
      }),
    };
  });
}
