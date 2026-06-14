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

test("Visitors can add the shared calendar to Google Calendar", async ({
  page,
}) => {
  await page.goto("http://localhost:4321/calendar");

  await expect(
    page.getByRole("link", { name: "Add this calendar to Google Calendar" })
  ).toHaveAttribute(
    "href",
    "https://calendar.google.com/calendar/u/1?cid=anBtY3dvcmtlcnNAZ21haWwuY29t"
  );
});

test("Mobile visitors see the shared calendar in agenda view by default", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile calendar behavior only");

  await page.goto("http://localhost:4321/calendar");

  const calendar = page.locator(
    'iframe[title="JPMC Workers Alliance Google Calendar"]'
  );

  await expect(calendar).toHaveAttribute("src", /[?&]mode=AGENDA/);
});

test("Desktop visitors keep the shared calendar in the default view", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop calendar behavior only");

  await page.goto("http://localhost:4321/calendar");

  const calendar = page.locator(
    'iframe[title="JPMC Workers Alliance Google Calendar"]'
  );

  await expect(calendar).not.toHaveAttribute("src", /[?&]mode=AGENDA/);
});
