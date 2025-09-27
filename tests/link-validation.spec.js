import { test, expect } from '@playwright/test';

test('Desktop overall Linkage', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Skip mobile for now, as the sidebar is hidden behind a hamburger menu');
  await page.goto('http://localhost:4321/');
  await expect(page.getByLabel('Sidebar navigation')).toMatchAriaSnapshot(`
    - navigation:
      - heading "Navigation" [level=3]
      - list:
        - listitem:
          - link "Start Here":
            - /url: /
        - listitem:
          - link "Join / Get Involved":
            - /url: /join-us
        - listitem:
          - link "Events & News":
            - /url: /news
        - listitem:
          - link "Learn the Issues":
            - /url: /issues-and-resources
        - listitem:
          - link "Organizer Toolkit":
            - /url: /content
        - listitem:
          - link "Media Library":
            - /url: /image
        - listitem:
          - link "Booklets & Templates":
            - /url: /booklet
        - listitem:
          - link "Myth Busting":
            - /url: /myth-busting
        - listitem:
          - link "About Us":
            - /url: /mission
    - heading "Connect With Us" [level=3]
    - link "Discord":
      - /url: https://discord.gg/BZA3pxppq9
      - img
    - link "YouTube":
      - /url: https://www.youtube.com/@jpmcWorkers
      - img
    - link "Reddit":
      - /url: https://www.reddit.com/user/JPMCWorkers/
      - img
    - link "Instagram":
      - /url: https://www.instagram.com/jpmcworkers
      - img
    `);
  await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - img "JPMC Workers Alliance Logo"
    - text: JPMC WORKERS ALLIANCE
    - heading "JPMC Workers Alliance" [level=1]
    `);
  await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(`
    - contentinfo:
      - img "JPMC Workers Alliance Logo"
      - text: JPMC WORKERS ALLIANCE
      - paragraph: Better working conditions for all JPMC employees worldwide.
      - heading "Quick Links" [level=2]
      - list:
        - listitem:
          - link "About Us":
            - /url: /mission
        - listitem:
          - link "Latest News":
            - /url: /news
        - listitem:
          - link "Join / Get Involved":
            - /url: /join-us
        - listitem:
          - link "Organizer Toolkit":
            - /url: /content
      - heading "Connect With Us" [level=3]
      - link "Discord":
        - /url: https://discord.gg/BZA3pxppq9
        - img
      - link "YouTube":
        - /url: https://www.youtube.com/@jpmcWorkers
        - img
      - link "Reddit":
        - /url: https://www.reddit.com/user/JPMCWorkers/
        - img
      - link "Instagram":
        - /url: https://www.instagram.com/jpmcworkers
        - img
      - paragraph: /© \\d+ JPMC Workers Alliance\\. All rights reserved\\./
      - paragraph: See any broken links? Write to jpmcWorkers at gmail dot com.
    `);
});

test('Mobile overall Linkage', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile Version of test, skipped for desktop');
  await page.goto('http://localhost:4321/');

  await page.getByRole('button', { name: 'Toggle navigation menu' }).click()

  await expect(page.getByTestId('mobile-menu')).toMatchAriaSnapshot(`
  - navigation "Mobile navigation":
    - link "Start Here":
      - /url: /
    - link "Join / Get Involved":
      - /url: /join-us
    - link "Events & News":
      - /url: /news
    - link "Organizer Toolkit":
      - /url: /content
    - link "Media Library":
      - /url: /image
    - link "Booklets & Templates":
      - /url: /booklet
    - link "Myth Busting":
      - /url: /myth-busting
    - link "About Us":
      - /url: /mission
    - link "Start Here":
      - /url: /
    - link "Organizer Toolkit":
      - /url: /content`);

  await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(`
    - contentinfo:
      - img "JPMC Workers Alliance Logo"
      - text: JPMC WORKERS ALLIANCE
      - paragraph: Better working conditions for all JPMC employees worldwide.
      - heading "Quick Links" [level=2]
      - list:
        - listitem:
          - link "About Us":
            - /url: /mission
        - listitem:
          - link "Latest News":
            - /url: /news
        - listitem:
          - link "Join / Get Involved":
            - /url: /join-us
        - listitem:
          - link "Organizer Toolkit":
            - /url: /content
      - heading "Connect With Us" [level=3]
      - link "Discord":
        - /url: https://discord.gg/BZA3pxppq9
        - img
      - link "YouTube":
        - /url: https://www.youtube.com/@jpmcWorkers
        - img
      - link "Reddit":
        - /url: https://www.reddit.com/user/JPMCWorkers/
        - img
      - link "Instagram":
        - /url: https://www.instagram.com/jpmcworkers
        - img
      - paragraph: /© \\d+ JPMC Workers Alliance\\. All rights reserved\\./
      - paragraph: See any broken links? Write to jpmcWorkers at gmail dot com.
    `);
});
