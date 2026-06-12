import { expect, test } from "@playwright/test";

test("Visitors can view the shared events calendar", async ({ page }) => {
  await page.goto("http://localhost:4321/calendar");

  await expect(
    page.getByRole("heading", { name: "Events Calendar", level: 1 })
  ).toBeVisible();

  await expect(
    page.locator('iframe[title="JPMC Workers Alliance Google Calendar"]')
  ).toHaveAttribute(
    "src",
    /https:\/\/calendar\.google\.com\/calendar\/embed\?src=jpmcworkers%40gmail\.com/
  );
});
