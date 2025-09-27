import { test, expect } from '@playwright/test'


test.skip('visual regression', async ({ page }) => {
  await page.goto('/')  
  await expect(page).toHaveScreenshot({ fullPage: true })
});
