import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import uk from "../messages/uk.json";

const projectLinks = 'main a[href*="/projects/"]';

test.describe("pages", () => {
  for (const path of ["/", "/projects", "/employment"]) {
    test(`${path} renders without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("employment shows the history", async ({ page }) => {
    await page.goto("/employment");
    await expect(
      page.getByRole("heading", { name: en.employment.title }),
    ).toBeVisible();
  });
});

test.describe("projects", () => {
  test("opens a project page from the list", async ({ page }) => {
    await page.goto("/projects");
    const first = page.locator(projectLinks).first();
    const href = await first.getAttribute("href");

    await first.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator("main h1, main h2").first()).toBeVisible();
  });

  test("turning off the commercial filter shows more projects", async ({
    page,
  }) => {
    await page.goto("/projects");
    await expect(page.locator(projectLinks).first()).toBeVisible();
    const commercial = await page.locator(projectLinks).count();

    await page.goto("/projects?commercial=false");
    await expect(page.locator(projectLinks).first()).toBeVisible();
    expect(await page.locator(projectLinks).count()).toBeGreaterThan(
      commercial,
    );
  });

  test("clicking a technology filters the list on the server", async ({
    page,
  }) => {
    await page.goto("/projects?commercial=false");
    const chip = page.locator('main a[href*="tech="]').first();
    const name = (await chip.textContent())!.trim();

    await chip.click();
    await expect(page).toHaveURL(/tech=/);

    // Waits out the grid's exit animation: every card left must use the tech
    const cards = page.locator("main [class*='projectCard']");
    await expect
      .poll(async () => {
        const texts = await cards.allTextContents();
        return texts.length > 0 && texts.every((text) => text.includes(name));
      })
      .toBe(true);
  });

  test("the commercial switch updates the URL and the list", async ({
    page,
  }) => {
    await page.goto("/projects");
    const commercial = await page.locator(projectLinks).count();

    await page
      .getByRole("switch", { name: en.projects.filters.commercial })
      .click();
    await expect(page).toHaveURL(/commercial=false/);
    await expect
      .poll(() => page.locator(projectLinks).count())
      .toBeGreaterThan(commercial);
  });

  test("unknown project returns 404", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(en.notFound.title)).toBeVisible();
  });
});

test.describe("i18n", () => {
  test("ukrainian locale is served under /uk", async ({ page }) => {
    await page.goto("/uk/projects");
    await expect(page.locator("html")).toHaveAttribute("lang", "uk");
    await expect(
      page.getByRole("heading", { name: uk.projects.title }),
    ).toBeVisible();
  });

  test("pages declare hreflang alternates", async ({ page }) => {
    await page.goto("/projects");
    await expect(
      page.locator('link[rel="alternate"][hreflang="uk"]'),
    ).toHaveAttribute("href", /\/uk\/projects$/);
  });
});
