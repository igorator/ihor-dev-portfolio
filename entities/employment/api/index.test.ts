import { describe, expect, it } from "vitest";
import { employment } from "@/entities/employment/data/employment";
import { employmentI18n } from "@/entities/employment/data/i18n";
import { getProjectSlugs } from "@/entities/project/api";
import { getEmployment } from "./index";

describe("getEmployment", () => {
  it("keeps data order and merges translations", async () => {
    const list = await getEmployment("uk");
    expect(list.map((e) => e.id)).toEqual(Object.keys(employment));

    const first = list[0]!;
    const i18n = employmentI18n.uk[first.id as keyof typeof employmentI18n.uk];
    expect(first.position).toBe(i18n.position);
    expect(first.roles).toEqual(i18n.roles);
  });

  it("links only visible projects", async () => {
    const visible = new Set<string>(getProjectSlugs());
    for (const entry of await getEmployment("en")) {
      for (const project of entry.linkedProjects) {
        expect(visible.has(project.slug)).toBe(true);
        expect(project.title).toBeTruthy();
      }
    }
  });
});
