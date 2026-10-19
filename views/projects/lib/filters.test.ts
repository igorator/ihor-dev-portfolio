import { describe, expect, it } from "vitest";
import type { Project } from "@/entities/project/types";
import type { Technology } from "@/entities/technology/types";
import {
  applyFilters,
  DEFAULT_FILTERS,
  getAvailableTechnologies,
  hasActiveFilters,
  parseFilters,
  toQueryString,
} from "./filters";

const tech = (id: string, priority: number): Technology => ({
  id,
  name: id,
  category: "",
  color: "",
  priority,
});

const react = tech("react", 2);
const ts = tech("typescript", 1);
const vue = tech("vue", 3);

const project = (
  slug: string,
  fields: Partial<Project> & { technologies: Technology[] },
): Project => ({
  slug,
  title: slug,
  description: "",
  type: "",
  category: "",
  date: "2025-01",
  ...fields,
});

const projects = [
  project("alpha", {
    date: "2025-03",
    technologies: [react, ts],
    isCommercial: true,
  }),
  project("beta", { date: "2025-01", technologies: [react] }),
  project("gamma", {
    date: "2025-02",
    technologies: [vue],
    isCommercial: true,
  }),
];

const slugs = (list: Project[]) => list.map((p) => p.slug);
const filter = (query: string) =>
  slugs(applyFilters(projects, parseFilters(new URLSearchParams(query))));

describe("parseFilters", () => {
  it("returns defaults for an empty query", () => {
    expect(parseFilters(new URLSearchParams())).toEqual(DEFAULT_FILTERS);
  });

  it("reads page searchParams records, incl. repeated keys", () => {
    expect(
      parseFilters({
        tech: ["react,vue", "ignored"],
        sort: "az",
        view: "list",
      }),
    ).toMatchObject({ techs: ["react", "vue"], sort: "az", view: "list" });
  });

  it("falls back to defaults for invalid values", () => {
    const filters = parseFilters({ sort: "bogus", match: "x", view: "y" });
    expect(filters.sort).toBe("newest");
    expect(filters.match).toBe("all");
    expect(filters.view).toBe("grid");
  });
});

describe("toQueryString", () => {
  it("omits defaults", () => {
    expect(toQueryString(DEFAULT_FILTERS)).toBe("");
  });

  it("round-trips through parseFilters", () => {
    const filters = {
      techs: ["react", "vue"],
      sort: "az" as const,
      match: "any" as const,
      commercialOnly: false,
      view: "list" as const,
    };
    const qs = toQueryString(filters);
    expect(parseFilters(new URLSearchParams(qs))).toEqual(filters);
  });
});

describe("hasActiveFilters", () => {
  it("ignores the view mode", () => {
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, view: "list" })).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, sort: "az" })).toBe(true);
  });
});

describe("applyFilters", () => {
  it("shows only commercial projects by default, newest first", () => {
    expect(filter("")).toEqual(["alpha", "gamma"]);
  });

  it("shows all projects when the commercial filter is off", () => {
    expect(filter("commercial=false")).toEqual(["alpha", "gamma", "beta"]);
  });

  it("matches all selected technologies by default", () => {
    expect(filter("commercial=false&tech=react,typescript")).toEqual(["alpha"]);
  });

  it("matches any selected technology in any mode", () => {
    expect(filter("commercial=false&tech=typescript,vue&match=any")).toEqual([
      "alpha",
      "gamma",
    ]);
  });

  it("sorts by title and date", () => {
    expect(filter("commercial=false&sort=az")).toEqual([
      "alpha",
      "beta",
      "gamma",
    ]);
    expect(filter("commercial=false&sort=oldest")).toEqual([
      "beta",
      "gamma",
      "alpha",
    ]);
  });
});

describe("getAvailableTechnologies", () => {
  it("lists only technologies used by projects, by priority", () => {
    expect(
      getAvailableTechnologies(projects, [vue, react, ts]).map((t) => t.id),
    ).toEqual(["typescript", "react", "vue"]);
    expect(
      getAvailableTechnologies([projects[1]!], [react, ts, vue]).map(
        (t) => t.id,
      ),
    ).toEqual(["react"]);
  });
});
