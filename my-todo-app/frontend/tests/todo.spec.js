import { test, expect } from "@playwright/test"

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the login page
    await page.goto("http://localhost:3000/")

    // Login
    await page.fill('input[type="email"]', "test@example.com")
    await page.fill('input[type="password"]', "password")
    await page.click('button[type="submit"]')

    // Wait for navigation to todos page
    await page.waitForURL("**/todos")
  })

  test("should add a new todo", async ({ page }) => {
    // Add a new todo
    await page.fill('input[placeholder="Add a new task..."]', "Test Todo")
    await page.click('button:has-text("Add Task")')

    // Check if the todo was added
    await expect(page.locator("text=Test Todo")).toBeVisible()
  })

  test("should delete a todo", async ({ page }) => {
    // Add a new todo
    await page.fill('input[placeholder="Add a new task..."]', "Todo to Delete")
    await page.click('button:has-text("Add Task")')

    // Confirm it's added
    await expect(page.locator("text=Todo to Delete")).toBeVisible()

    // Find the delete button next to the todo and click it
    const todoItem = page.locator("text=Todo to Delete").first()
    await todoItem.locator("xpath=..").locator('button:has-text("Delete")').click()

    // Ensure the todo is no longer visible
    await expect(page.locator("text=Todo to Delete")).not.toBeVisible()
  })

  test("should filter todos by status", async ({ page }) => {
    // Add a todo and mark it as completed
    await page.fill('input[placeholder="Add a new task..."]', "Completed Todo")
    await page.click('button:has-text("Add Task")')

    // Find the newly added todo and mark it as completed
    const todoItem = page.locator("text=Completed Todo").first()
    await todoItem.locator("xpath=..").locator('button:has-text("Mark as Completed")').click()

    // Filter by completed
    await page.selectOption("select#status-filter", "completed")

    // Check if only completed todos are visible
    await expect(page.locator("text=Completed Todo")).toBeVisible()

    // Filter by pending
    await page.selectOption("select#status-filter", "pending")

    // Check if completed todo is not visible
    await expect(page.locator("text=Completed Todo")).not.toBeVisible()
  })

  test("should select multiple todos and mark them as completed", async ({ page }) => {
    // Add two todos
    await page.fill('input[placeholder="Add a new task..."]', "Todo 1")
    await page.click('button:has-text("Add Task")')

    await page.fill('input[placeholder="Add a new task..."]', "Todo 2")
    await page.click('button:has-text("Add Task")')

    // Select both todos
    await page.locator('input[type="checkbox"]').first().check()
    await page.locator('input[type="checkbox"]').nth(1).check()

    // Mark selected as completed
    await page.click('button:has-text("Mark Selected as Completed")')

    // Filter by completed
    await page.selectOption("select#status-filter", "completed")

    // Check if both todos are visible in completed filter
    await expect(page.locator("text=Todo 1")).toBeVisible()
    await expect(page.locator("text=Todo 2")).toBeVisible()
  })

  test("should logout successfully", async ({ page }) => {
    // Click logout button
    await page.click('button[aria-label="Logout"]')

    // Check if redirected to login page
    await expect(page).toHaveURL("http://localhost:3000/")
  })
})
