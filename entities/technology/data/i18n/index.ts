import type { Locale } from "next-intl";
import type { TechnologyI18n } from "../../types";
import type { TechnologyId } from "../technologies";
import { en } from "./en";
import { uk } from "./uk";

export const technologiesI18n = { en, uk } satisfies Record<
  Locale,
  Record<TechnologyId, TechnologyI18n>
>;
