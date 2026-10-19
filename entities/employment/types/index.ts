import type { ProjectSlug } from "@/entities/project/data/projects";
import type { ProjectSummary } from "@/entities/project/types";

// Locale-independent data, keyed by id in data/employment.ts.
// Dates are "YYYY-MM"; endDate "present" means ongoing; period overrides both
export type EmploymentBase = {
  company: string;
  // Employer website, shown as a link on the card
  url?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  projects: ProjectSlug[];
};

// Per-locale fields, see data/i18n
export type EmploymentI18n = {
  type: string;
  category?: string;
  position?: string;
  roles: string[];
};

export type Employment = Omit<EmploymentBase, "projects"> &
  EmploymentI18n & {
    id: string;
    linkedProjects: ProjectSummary[];
  };
