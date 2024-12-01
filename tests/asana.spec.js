import { test, expect } from '@playwright/test';
import fs from 'fs';

// Load test data from the JSON file
const testData = JSON.parse(fs.readFileSync('./data/test-cases.json', 'utf8'));

// Login credentials selectors
const loginUrl = 'https://app.asana.com/-/login';
const emailSelector = 'input[name="email"]';
const passwordSelector = 'input[name="password"]';
const submitButtonSelector = 'button[type="submit"]';

test.describe('Asana Task Verification', () => {
  // Iterate over each test case defined in test-cases.json
  testData.forEach(({ description, email, password, taskName, column, tags, projectUrl }) => {
    test(description, async ({ page }) => {
      // Step 1: Log in to Asana
      await page.goto(loginUrl);
      await page.fill(emailSelector, email);
      await page.fill(passwordSelector, password);
      await page.click(submitButtonSelector);
      await page.waitForNavigation();

      // Step 2: Navigate to the specified project URL
      await page.goto(projectUrl);

      // Step 3: Verify the task is in the correct column
      const taskLocator = page.locator(`text=${taskName}`);
      await expect(taskLocator).toBeVisible();
      const taskColumnLocator = taskLocator.locator(`xpath=../../..//div[contains(text(),"${column}")]`);
      await expect(taskColumnLocator).toBeVisible();

      // Step 4: Verify the task tags
      for (const tag of tags) {
        const tagLocator = page.locator(`text=${tag}`);
        await expect(tagLocator).toBeVisible();
      }
    });
  });
});
