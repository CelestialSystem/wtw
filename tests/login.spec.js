// @ts-check
const { test, expect } = require('@playwright/test');

test('ExtJS login page has correct title and elements', async ({ page }) => {
  // Go to the login page and wait until network is idle
  await page.goto('https://eepoint-app-engine.csi-infra.com/', { waitUntil: 'networkidle' });

  // Check if the welcome message is visible
  const welcomeMessage = await page.locator('.welcome-message');
  await expect(welcomeMessage).toBeVisible();
  await expect(welcomeMessage).toHaveText('Welcome');

  // Check if the sign-in message is visible
  const subText = await page.locator('.sub-text');
  await expect(subText).toBeVisible();
  await expect(subText).toHaveText('You can sign in to access it with your existing profile.');

  // Check if the username field is visible
  const usernameField = await page.locator('input[name="username"]');
  await expect(usernameField).toBeVisible();

  // Check if the password field is visible
  const passwordField = await page.locator('input[name="password"]');
  await expect(passwordField).toBeVisible();

  // Check if the "Remember Me" checkbox is visible
  const rememberMeCheckbox = await page.locator('input[name="rememberme"]');
  await expect(rememberMeCheckbox).toBeVisible();

  // Fill in the username
  await usernameField.fill('admin2@wtwtest.com');

  // Fill in the password
  await passwordField.fill('Admin1Admin!');

  // Update the selector for the login button using data-testid
  const loginButton = await page.locator('[data-testid="loginBtn"]'); 
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toBeEnabled();

  // Wait for the login request
  const [response] = await Promise.all([
    loginButton.click(),
    page.waitForResponse(response => response.url().includes('/login') && response.status() === 200),
  ]);
  
  await page.waitForTimeout(10000);
  await page.waitForLoadState('networkidle'); // Wait until the network is idle
  await expect(page).toHaveURL('https://eepoint-app-engine.csi-infra.com/#home'); // Check the URL
});
