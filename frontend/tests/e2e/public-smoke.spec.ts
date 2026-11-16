import { test, expect } from "@playwright/test";

test.describe("public smoke", () => {
  test("home renders RTL and scoped tour tabs", async ({ page }) => {
    await page.goto("/fa?scope=domestic");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    const trending = page.locator("section.recommended-sec").first();
    await expect(trending).toBeVisible();
    await expect(trending.getByText("تورهای داخلی", { exact: true })).toBeVisible();
  });

  test("tour scope tabs switch in place without changing the URL", async ({ page }) => {
    await page.goto("/fa/tours/domestic");
    await page.evaluate(() => {
      (window as unknown as { __haniMarker?: string }).__haniMarker = "kept";
    });

    const foreign = page.getByRole("link", { name: "تورهای خارجی" }).first();
    await foreign.click();
    await expect(foreign).toHaveClass(/active/);
    await expect(page).toHaveURL(/\/fa\/tours\/domestic$/);

    const marker = await page.evaluate(
      () => (window as unknown as { __haniMarker?: string }).__haniMarker
    );
    expect(marker).toBe("kept");
  });

  test("tours landing renders and keeps LTR in English", async ({ page }) => {
    await page.goto("/en/tours/domestic");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("link", { name: "Domestic tours" }).first()).toBeVisible();
  });
});
