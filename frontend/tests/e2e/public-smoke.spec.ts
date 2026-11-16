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

  test("fa date controls are Jalali while their canonical value is Gregorian", async ({
    page
  }) => {
    await page.goto("/fa");
    await page.getByRole("tab", { name: "تورهای داخلی" }).click();

    const input = page.locator("#tour-departure");
    await expect(input).toHaveValue(/^[۰-۹]{4}\/[۰-۹]{2}\/[۰-۹]{2}$/);
    await expect(input).toHaveAttribute(
      "data-iso-value",
      /^\d{4}-\d{2}-\d{2}$/
    );

    await input.click();
    const calendar = page.locator(".hani-date-picker .rmdp-wrapper");
    await expect(calendar).toContainText("آبان");
    await expect(calendar).toContainText("۱۴۰۵");

    const initialIso = await input.getAttribute("data-iso-value");
    const selectableDay = page
      .locator(".hani-date-picker .rmdp-day-picker .rmdp-day:not(.rmdp-day-hidden):not(.rmdp-disabled):not(.rmdp-selected):visible")
      .first();
    await selectableDay.click();
    const selectedIso = await input.getAttribute("data-iso-value");
    expect(selectedIso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(selectedIso).not.toBe(initialIso);
  });

  test("fa range displays Jalali while both canonical dates stay Gregorian", async ({
    page
  }) => {
    await page.goto("/fa");
    const range = page.locator(".hani-date-range-picker:visible").first();
    const start = range.locator('input[data-iso-start]');
    const end = range.locator('input[data-iso-end]');

    await expect(start).toHaveValue(/^[۰-۹]{4}\/[۰-۹]{2}\/[۰-۹]{2}$/);
    await expect(end).toHaveValue(/^[۰-۹]{4}\/[۰-۹]{2}\/[۰-۹]{2}$/);
    await expect(start).toHaveAttribute("data-iso-start", /^\d{4}-\d{2}-\d{2}$/);
    await expect(end).toHaveAttribute("data-iso-end", /^\d{4}-\d{2}-\d{2}$/);
  });

  test("en date control stays Gregorian", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("tab", { name: "Domestic tours" }).click();

    const input = page.locator("#tour-departure");
    await expect(input).toHaveValue(/^\d{2}-\d{2}-\d{4}$/);
    await expect(input).toHaveAttribute(
      "data-iso-value",
      /^\d{4}-\d{2}-\d{2}$/
    );

    await input.click();
    await expect(page.locator(".hani-date-picker .rmdp-wrapper")).toContainText(
      "November"
    );
  });

  test("api rejects Jalali-shaped dates and accepts Gregorian dates", async ({
    request
  }) => {
    const jalali = await request.get(
      "http://localhost:5099/market/v1/search?locale=fa&startDate=1405-08-25"
    );
    expect(jalali.status()).toBe(400);

    const gregorian = await request.get(
      "http://localhost:5099/market/v1/search?locale=fa&startDate=2026-11-16&endDate=2026-11-20"
    );
    expect(gregorian.status()).toBe(200);
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
