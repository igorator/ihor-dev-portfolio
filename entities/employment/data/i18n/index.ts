import type { Locale } from "next-intl";
import type { EmploymentI18n } from "../../types";
import type { EmploymentId } from "../employment";
import { en } from "./en";
import { uk } from "./uk";

export const employmentI18n = { en, uk } satisfies Record<
  Locale,
  Record<EmploymentId, EmploymentI18n>
>;
