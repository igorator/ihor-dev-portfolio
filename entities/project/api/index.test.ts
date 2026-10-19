import { beforeEach, describe, expect, it, vi } from "vitest";
import { projects } from "@/entities/project/data/projects";
import { projectsI18n } from "@/entities/project/data/i18n";
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
  getProjectSummaries,
} from "./index";

vi.mock("./images", () => ({
  listProjectImages: vi.fn(async (slug: string) => ({
    cover: `cover/${slug}`,
    screens: [`screen/${slug}`],
  })),
}));
vi.mock("./videos", () => ({
  listProjectVideo: vi.fn(async () => null),
}));

const hiddenSlugs = Object.entries(projects)
  .filter(([, project]) => project.isHidden)
  .map(([slug]) => slug);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getProjectSlugs", () => {
  it("excludes hidden projects", () => {
    const slugs = getProjectSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of hiddenSlugs) expect(slugs).not.toContain(slug);
  });
});

describe("getProjectSummaries", () => {
  it("returns localized titles", () => {
    const [first] = getProjectSummaries("uk");
    expect(first?.title).toBe(
      projectsI18n.uk[first!.slug as keyof typeof projectsI18n.uk].title,
    );
  });
});

describe("getProjects", () => {
  it("sorts by date, newest first", async () => {
    const list = await getProjects("en");
    const dates = list.map((p) => p.date);
    expect(dates).toEqual(dates.toSorted().reverse());
  });

  it("merges translations, technologies and cover", async () => {
    const list = await getProjects("uk");
    const project = list[0]!;
    expect(project.title).toBe(
      projectsI18n.uk[project.slug as keyof typeof projectsI18n.uk].title,
    );
    expect(project.cover).toBe(`cover/${project.slug}`);
    expect(project.technologies.length).toBeGreaterThan(0);
    expect(project.technologies[0]).toHaveProperty("name");
  });

  it("sorts technologies by priority", async () => {
    for (const project of await getProjects("en")) {
      const priorities = project.technologies.map((t) => t.priority);
      expect(priorities).toEqual(priorities.toSorted((a, b) => a - b));
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns project with screens", async () => {
    const slug = getProjectSlugs()[0]!;
    const project = await getProjectBySlug(slug, "en");
    expect(project?.slug).toBe(slug);
    expect(project?.screens).toEqual([`screen/${slug}`]);
  });

  it("returns null for unknown and hidden projects", async () => {
    expect(await getProjectBySlug("does-not-exist", "en")).toBeNull();
    for (const slug of hiddenSlugs) {
      expect(await getProjectBySlug(slug, "en")).toBeNull();
    }
  });
});
