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
    await page.getByRole('link', { name: 'Todos' }).click();
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

    // Add multiple todos
    await page.getByPlaceholder('What do you need to do?').fill('Active todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    await page.getByPlaceholder('What do you need to do?').fill('Completed todo');
    await page.getByRole('button', { name: 'Add Todo' }).click();

    // Complete one todo
    await page.getByRole('checkbox', { name: /Completed todo/ }).check();

    // Test Active filter
    await page.getByRole('button', { name: /Active/ }).click();
    await expect(page.getByText('Active todo')).toBeVisible();
    await expect(page.getByText('Completed todo')).not.toBeVisible();

    // Test Completed filter
    await page.getByRole('button', { name: /Completed/ }).click();
    await expect(page.getByText('Completed todo')).toBeVisible();
    await expect(page.getByText('Active todo')).not.toBeVisible();

    // Test All filter
    await page.getByRole('button', { name: /All/ }).click();
    await expect(page.getByText('Active todo')).toBeVisible();
    await expect(page.getByText('Completed todo')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/todos');

    // Try to submit empty todo
    await page.getByRole('button', { name: 'Add Todo' }).click();
    await expect(page.getByText('Please enter a todo item')).toBeVisible();

    // Try to submit todo that's too short
    await page.getByPlaceholder('What do you need to do?').fill('Hi');
    await page.getByRole('button', { name: 'Add Todo' }).click();
    await expect(page.getByText('Todo must be at least 3 characters long')).toBeVisible();
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
    await expect(page.getByText('John Doe')).toBeVisible();
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

    // Wait for loading to complete and launches to appear
    await expect(page.getByText('Loading SpaceX launches...')).toBeVisible();
    await expect(page.getByText('Loading SpaceX launches...')).not.toBeVisible({ timeout: 10000 });

    // Should show some launches
    await expect(page.getByText(/launches loaded/)).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate between all pages', async ({ page }) => {
    await page.goto('/');

    // Test navigation to each page
    await page.getByRole('link', { name: 'Todos' }).click();
    await expect(page).toHaveURL('/todos');

    await page.getByRole('link', { name: 'SpaceX' }).click();
    await expect(page).toHaveURL('/launches');

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should show active navigation state', async ({ page }) => {
    await page.goto('/todos');

    // The Todos nav link should have active styling
    const todosLink = page.getByRole('link', { name: 'Todos' });
    await expect(todosLink).toHaveCSS('color', /rgb\(0, 123, 255\)/); // Primary color
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    const h2Elements = page.getByRole('heading', { level: 2 });
    await expect(h2Elements.first()).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/todos');

    // Check for proper ARIA labels
    await expect(page.getByRole('textbox', { name: 'New todo item' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Todo' })).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to activate links with Enter
    await page.keyboard.press('Enter');

    // Should navigate to the focused link
    await expect(page).not.toHaveURL('/');
  });
});
