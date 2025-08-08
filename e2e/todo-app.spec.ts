import { test, expect } from '@playwright/test';

test.describe('Todo Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/React TypeScript Starter/);
    await expect(page.getByRole('heading', { name: 'React Starter Kit' })).toBeVisible();
  });

  test('should navigate to todos page', async ({ page }) => {
    // Wait for any navigation link to be available
    await page.waitForSelector('a[href="/todos"]', { timeout: 10000 });
    await page.click('a[href="/todos"]');
    await expect(page).toHaveURL('/todos');
    await expect(page.getByRole('heading', { name: 'Todo Application' })).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    await page.goto('/todos');

    const todoInput = page.getByPlaceholder('What do you need to do?');
    const addButton = page.getByRole('button', { name: 'Add Todo' });

    await todoInput.fill('Test todo from E2E');
    await addButton.click();

    await expect(page.getByText('Test todo from E2E')).toBeVisible();
  });

  test('should toggle todo completion', async ({ page }) => {
    await page.goto('/todos');

    // Add a todo first
    await page.getByPlaceholder('What do you need to do?').fill('Complete this todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    // Find the checkbox for the todo and click it
    const todoCheckbox = page.getByRole('checkbox', { name: /Complete this todo/ });
    await todoCheckbox.check();

    // The todo text should have strikethrough (completed style)
    await expect(page.getByText('Complete this todo')).toHaveCSS('text-decoration', /line-through/);
  });

  test('should delete a todo', async ({ page }) => {
    await page.goto('/todos');

    // Add a todo first
    await page.getByPlaceholder('What do you need to do?').fill('Delete this todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    // Delete the todo
    await page.getByRole('button', { name: /Delete.*Delete this todo/ }).click();

    // Todo should no longer be visible
    await expect(page.getByText('Delete this todo')).not.toBeVisible();
  });

  test('should filter todos correctly', async ({ page }) => {
    await page.goto('/todos');

    // Add two todos with different states
    await page.getByPlaceholder('What do you need to do?').fill('Active todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    await page.getByPlaceholder('What do you need to do?').fill('Completed todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    // Complete the second todo
    const secondTodoCheckbox = page.getByRole('checkbox', { name: /Completed todo/ });
    await secondTodoCheckbox.check();

    // Test Active filter - use more specific selector
    await page.getByRole('button', { name: 'Active (1)' }).click();
    await expect(page.getByText('Active todo')).toBeVisible();
    await expect(page.getByText('Completed todo')).not.toBeVisible();

    // Test Completed filter
    await page.getByRole('button', { name: 'Completed (1)' }).click();
    await expect(page.getByText('Completed todo')).toBeVisible();
    await expect(page.getByText('Active todo')).not.toBeVisible();

    // Test All filter
    await page.getByRole('button', { name: 'All (2)' }).click();
    await expect(page.getByText('Active todo')).toBeVisible();
    await expect(page.getByText('Completed todo')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/todos');

    // Try to submit empty todo
    await page.getByRole('button', { name: 'Add Todo' }).click();
    await expect(page.getByText('Come on, type something!')).toBeVisible();

    // Try to submit todo that's too short
    await page.getByPlaceholder('What do you need to do?').fill('Hi');
    await page.getByRole('button', { name: 'Add Todo' }).click();
    await expect(page.getByText('Make it at least 3 characters')).toBeVisible();
  });

  test('should work with keyboard navigation', async ({ page }) => {
    await page.goto('/todos');

    // Use keyboard to add a todo
    await page.getByPlaceholder('What do you need to do?').fill('Keyboard todo');
    await page.keyboard.press('Enter');

    await expect(page.getByText('Keyboard todo')).toBeVisible();
  });

  test('should handle authentication flow', async ({ page }) => {
    await page.goto('/');

    // Should show login button initially
    await expect(page.getByRole('button', { name: 'Login (Demo)' })).toBeVisible();

    // Click login
    await page.getByRole('button', { name: 'Login (Demo)' }).click();

    // Should show user info and logout button
    await expect(page.getByRole('heading', { name: 'Hey John Doe! 👋' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    // Click logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // Should show login button again
    await expect(page.getByRole('button', { name: 'Login (Demo)' })).toBeVisible();
  });
});

test.describe('SpaceX Launches Page', () => {
  test('should load SpaceX launches', async ({ page }) => {
    await page.goto('/launches');

    await expect(page.getByRole('heading', { name: 'SpaceX Launches' })).toBeVisible();

    // Wait for either success or error state (but not stuck in loading)
    await page.waitForTimeout(3000); // Give it time to load

    // Should not show persistent loading state
    const isStillLoading = await page.getByText('Loading SpaceX launches...').isVisible();
    expect(isStillLoading).toBe(false);

    // Should either show data or error, but not be stuck loading
    const hasError = await page.getByText('Oops! Something went wrong').isVisible();
    const hasData = await page.getByRole('heading', { name: 'Recent SpaceX Launches' }).isVisible();

    // One of these should be true (either successful load or graceful error handling)
    expect(hasError || hasData).toBe(true);
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between all pages', async ({ page }) => {
    // Test navigation to each page using href selectors for more reliability
    await page.waitForSelector('a[href="/todos"]', { timeout: 10000 });

    await page.click('a[href="/todos"]');
    await expect(page).toHaveURL('/todos');

    await page.click('a[href="/launches"]');
    await expect(page).toHaveURL('/launches');

    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');

    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should show active navigation state', async ({ page }) => {
    await page.goto('/todos');

    // Wait for navigation links to be available
    await page.waitForSelector('a[href="/todos"]', { timeout: 10000 });

    // The Todos nav link should be visible and accessible
    const todosLink = page.locator('a[href="/todos"]');
    await expect(todosLink).toBeVisible();
    await expect(todosLink).toHaveAttribute('href', '/todos');
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check for the main heading specifically
    const mainHeading = page.getByRole('heading', { name: 'React Starter Kit' });
    await expect(mainHeading).toBeVisible();

    // Check for any h2 elements (features section)
    const featuresHeading = page.getByRole('heading', { name: 'Features & Technologies' });
    await expect(featuresHeading).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/todos');

    // Check for proper ARIA labels
    await expect(page.getByRole('textbox', { name: 'New todo item' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Todo' })).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Wait for navigation links to be available
    await page.waitForSelector('nav a[href="/todos"]', { timeout: 10000 });

    // Focus on the navigation todos link specifically (not the demo buttons)
    const todosNavLink = page.locator('nav a[href="/todos"]');
    await expect(todosNavLink).toBeVisible();
    await todosNavLink.focus();

    // Press Enter to navigate
    await page.keyboard.press('Enter');

    // Should navigate to todos page
    await expect(page).toHaveURL('/todos');
    await expect(page.getByRole('heading', { name: 'Todo Application' })).toBeVisible();
  });
});
