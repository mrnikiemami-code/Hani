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
