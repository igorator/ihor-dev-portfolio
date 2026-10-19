import type { Locale } from "next-intl";
import type { ProjectI18n } from "../../types";
import type { ProjectSlug } from "../projects";
import { en } from "./en";
import { uk } from "./uk";

export const projectsI18n = { en, uk } satisfies Record<
  Locale,
  Record<ProjectSlug, ProjectI18n>
>;
