import { test, expect } from "@playwright/test";

test.describe("public smoke", () => {
  test("home renders RTL and scoped tour tabs", async ({ page }) => {
    await page.goto("/fa?scope=domestic");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    const trending = page.locator("section.recommended-sec").first();
    await expect(trending).toBeVisible();
    await expect(trending.getByText("تورهای داخلی", { exact: true })).toBeVisible();
  });

  test("home hero scope switch changes fields in place", async ({ page }) => {
    await page.goto("/fa");
    await page.evaluate(() => {
      (window as unknown as { __haniMarker?: string }).__haniMarker = "kept";
    });

    const tourPane = page.locator("#Tour");
    await tourPane.getByRole("tab", { name: "تورهای داخلی" }).click();
    await expect(tourPane.getByText("شهر یا نوع تور")).toBeVisible();
    await expect(tourPane.getByText("مبدا", { exact: true })).toHaveCount(0);
    await expect(page).toHaveURL(/\/fa$/);

    const marker = await page.evaluate(
      () => (window as unknown as { __haniMarker?: string }).__haniMarker
    );
    expect(marker).toBe("kept");
  });

  test("home hero scope tabs support keyboard arrows", async ({ page }) => {
    await page.goto("/fa");
    const foreign = page.locator("#tour-scope-foreign");
    const domestic = page.locator("#tour-scope-domestic");
    await foreign.focus();
    await page.keyboard.press("ArrowRight");
    await expect(domestic).toHaveAttribute("aria-selected", "true");
    await expect(domestic).toBeFocused();
    await expect(page).toHaveURL(/\/fa$/);
  });

  test("tour scope tabs stay on one route and update only the query", async ({ page }) => {
    await page.goto("/fa/tours?scope=domestic");
    await page.evaluate(() => {
      (window as unknown as { __haniMarker?: string }).__haniMarker = "kept";
    });

    const foreign = page.getByRole("link", { name: "تورهای خارجی" }).first();
    await foreign.click();
    await expect(foreign).toHaveClass(/active/);
    await expect(page).toHaveURL(/\/fa\/tours\?scope=foreign$/);

    const marker = await page.evaluate(
      () => (window as unknown as { __haniMarker?: string }).__haniMarker
    );
    expect(marker).toBe("kept");
  });

  test("tours landing renders and keeps LTR in English", async ({ page }) => {
    await page.goto("/en/tours?scope=domestic");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("link", { name: "Domestic tours" }).first()).toBeVisible();
  });

  test("home exposes canonical, hreflang, JSON-LD and a main landmark", async ({ page }) => {
    await page.goto("/fa");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hani.ir/fa"
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="fa"]')
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]')
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="ar"]')
    ).toHaveCount(1);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("تور و سفر");
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(jsonLd).toContain('"WebSite"');
    expect(jsonLd).toContain('"SearchAction"');
    expect(jsonLd).toContain('"Organization"');
  });

  test("tours listing exposes canonical, hreflang and ItemList", async ({ page }) => {
    await page.goto("/fa/tours?scope=domestic");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hani.ir/fa/tours?scope=domestic"
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]')
    ).toHaveCount(1);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(jsonLd).toContain('"ItemList"');
    expect(jsonLd).toContain('"BreadcrumbList"');
  });

  test("sitemap and robots are served for all locales", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapBody = await sitemap.text();
    expect(sitemapBody).toContain("https://hani.ir/fa/tours?scope=domestic");
    expect(sitemapBody).toContain("https://hani.ir/en/tours?scope=foreign");
    expect(sitemapBody).toContain("https://hani.ir/ar/tours");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsBody = await robots.text();
    expect(robotsBody).toContain("Sitemap: https://hani.ir/sitemap.xml");
  });

  test("invalid tour page and scope fall back safely", async ({ page }) => {
    const response = await page.goto("/fa/tours?scope=unknown&page=abc");
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toHaveCount(1);
  });

  test("home hero has no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fa");
    await expect(page.getByRole("link", { name: "تورهای داخلی" }).first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);
  });
});
