import { describe, expect, it } from "vitest";
import { localeAlternates, localePath } from "./seo";

describe("localePath", () => {
  it("keeps default locale without prefix", () => {
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("en", "/projects")).toBe("/projects");
  });

  it("prefixes other locales", () => {
    expect(localePath("uk", "/")).toBe("/uk");
    expect(localePath("uk", "/projects")).toBe("/uk/projects");
  });

  it("normalizes paths without leading slash", () => {
    expect(localePath("uk", "projects")).toBe("/uk/projects");
  });
});

describe("localeAlternates", () => {
  it("builds canonical and hreflang for every locale", () => {
    expect(localeAlternates("uk", "/projects/foo")).toEqual({
      canonical: "/uk/projects/foo",
      languages: {
        en: "/projects/foo",
        uk: "/uk/projects/foo",
        "x-default": "/projects/foo",
      },
    });
  });
});
