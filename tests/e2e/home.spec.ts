import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('should display the welcome message', async ({ page }) => {
    await page.goto('/');
    
    // Assert H1 text - use a more specific selector
    const heading = await page.locator('h1.text-4xl');
    await expect(heading).toHaveText('Welcome to Nirvana');
    await expect(heading).toHaveClass(/text-4xl.*font-bold.*text-brand-600/);
  });

  test('should display services', async ({ page }) => {
    await page.goto('/');
    
    // Check if services are displayed
    const services = await page.locator('a[href^="/services/"]');
    await expect(services).toHaveCount(1); // We have one service (pressure-washing)
    
    // Check service card content
    const serviceCard = services.first();
    await expect(serviceCard).toContainText('Pressure Washing');
    await expect(serviceCard).toContainText('$150-$500');
    await expect(serviceCard).toContainText('2-4 hours');
  });

  test('should open modal when button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click the modal trigger button
    await page.click('button:has-text("Open Modal")');
    
    // Check if modal is visible - use Dialog.Title instead of h2
    const modalTitle = await page.locator('[role="dialog"] >> text=Welcome');
    await expect(modalTitle).toBeVisible();
    
    const modalDescription = await page.locator('[role="dialog"] >> text=This is a Radix UI modal component hydrated as a React island in Astro.');
    await expect(modalDescription).toBeVisible();
    
    // Close the modal
    await page.click('button:has-text("Close")');
    await expect(modalTitle).not.toBeVisible();
  });

  test('should take a screenshot of the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/homepage.png',
      fullPage: true 
    });
  });

  test('should pass accessibility checks', async ({ page }) => {
    await page.goto('/');
    
    // Run axe-core accessibility check
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // Expect no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle('Nirvana');
    
    // Check viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
  });
});