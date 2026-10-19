// Project list state lives in the URL. These pure functions are shared by the
// server (parse searchParams, filter, sort) and the client (build next URL)

import type { Project } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";

export type SortKey = "newest" | "oldest" | "az" | "za";
export type MatchMode = "any" | "all";
export type ViewMode = "grid" | "list";

export type ProjectFilters = {
  techs: string[];
  sort: SortKey;
  match: MatchMode;
  commercialOnly: boolean;
  view: ViewMode;
};

export const DEFAULT_FILTERS: ProjectFilters = {
  techs: [],
  sort: "newest",
  match: "all",
  commercialOnly: true,
  view: "grid",
};

const SORT_VALUES: readonly SortKey[] = ["newest", "oldest", "az", "za"];
const MATCH_VALUES: readonly MatchMode[] = ["any", "all"];
const VIEW_VALUES: readonly ViewMode[] = ["grid", "list"];

// Page searchParams (record) and useSearchParams() (URLSearchParams) both work
export type SearchParamsInput =
  URLSearchParams | Record<string, string | string[] | undefined>;

const read = (input: SearchParamsInput, key: string): string | null => {
  if (input instanceof URLSearchParams) return input.get(key);
  const value = input[key];
  return (Array.isArray(value) ? value[0] : value) ?? null;
};

const oneOf = <T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
): T => (allowed.includes(value as T) ? (value as T) : fallback);

export function parseFilters(input: SearchParamsInput): ProjectFilters {
  const tech = read(input, "tech");

  return {
    techs: tech ? tech.split(",").filter(Boolean) : [],
    sort: oneOf(read(input, "sort"), SORT_VALUES, DEFAULT_FILTERS.sort),
    match: oneOf(read(input, "match"), MATCH_VALUES, DEFAULT_FILTERS.match),
    commercialOnly: read(input, "commercial") !== "false",
    view: oneOf(read(input, "view"), VIEW_VALUES, DEFAULT_FILTERS.view),
  };
}

// Serializes filters, omitting defaults so URLs stay short. Returns "" or "?…"
export function toQueryString(filters: ProjectFilters): string {
  const params = new URLSearchParams();
  if (filters.techs.length > 0) params.set("tech", filters.techs.join(","));
  if (filters.sort !== DEFAULT_FILTERS.sort) params.set("sort", filters.sort);
  if (filters.match !== DEFAULT_FILTERS.match)
    params.set("match", filters.match);
  if (!filters.commercialOnly) params.set("commercial", "false");
  if (filters.view !== DEFAULT_FILTERS.view) params.set("view", filters.view);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// View mode is presentation, not a filter
export const hasActiveFilters = (filters: ProjectFilters): boolean =>
  filters.techs.length > 0 ||
  filters.sort !== DEFAULT_FILTERS.sort ||
  filters.match !== DEFAULT_FILTERS.match ||
  filters.commercialOnly !== DEFAULT_FILTERS.commercialOnly;

const hasTech = (project: Project, techId: string) =>
  project.technologies.some((tech) => tech.id === techId);

export function applyFilters(
  projects: Project[],
  filters: ProjectFilters,
): Project[] {
  const { techs, match, commercialOnly, sort } = filters;

  return projects
    .filter((project) => !commercialOnly || Boolean(project.isCommercial))
    .filter((project) => {
      if (techs.length === 0) return true;
      return match === "all"
        ? techs.every((id) => hasTech(project, id))
        : techs.some((id) => hasTech(project, id));
    })
    .toSorted((a, b) => {
      switch (sort) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
      }
    });
}

// Only technologies used by at least one project, by priority
export const getAvailableTechnologies = (
  projects: Project[],
  technologies: Technology[],
): Technology[] =>
  technologies
    .filter((tech) => projects.some((project) => hasTech(project, tech.id)))
    .toSorted((a, b) => a.priority - b.priority);
