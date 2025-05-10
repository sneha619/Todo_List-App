import { test, expect } from "@playwright/test"

test.describe("Authentication", () => {
  test("should allow user to sign up", async ({ page }) => {
    // Go to signup page
    await page.goto("http://localhost:3000/signup")

    // Fill in signup form
    await page.fill('input[type="email"]', `test${Date.now()}@example.com`)
    await page.fill('input[type="password"]', "password123")

    // Submit form
    await page.click('button[type="submit"]')

    // Check if redirected to login page
    await expect(page).toHaveURL("http://localhost:3000/")
  })

  test("should allow user to login", async ({ page }) => {
    // Go to login page
    await page.goto("http://localhost:3000/")

    // Fill in login form
    await page.fill('input[type="email"]', "test@example.com")
    await page.fill('input[type="password"]', "password")

    // Submit form
    await page.click('button[type="submit"]')

    // Check if redirected to todos page
    await expect(page).toHaveURL("**/todos")
  })

  test("should show error for invalid login", async ({ page }) => {
    // Go to login page
    await page.goto("http://localhost:3000/")

    // Fill in login form with invalid credentials
    await page.fill('input[type="email"]', "invalid@example.com")
    await page.fill('input[type="password"]', "wrongpassword")

    // Submit form
    await page.click('button[type="submit"]')

    // Check for alert
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Failed to login")
      await dialog.accept()
    })
  })
})
