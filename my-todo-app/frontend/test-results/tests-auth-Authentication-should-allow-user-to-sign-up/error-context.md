# Test info

- Name: Authentication >> should allow user to sign up
- Location: C:\Projects\Project\my-todo-app\frontend\tests\auth.spec.ts:4:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected string: "http://localhost:3000/"
Received string: "http://localhost:3000/signup"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    9 × locator resolved to <html lang="en">…</html>
      - unexpected value "http://localhost:3000/signup"

    at C:\Projects\Project\my-todo-app\frontend\tests\auth.spec.ts:16:24
```

# Page snapshot

```yaml
- button "Switch to dark mode"
- button "Logout"
- heading "Create an Account" [level=2]
- text: Email
- textbox "Email": test1746818929481@example.com
- text: Password
- textbox "Password": password123
- text: Confirm Password
- textbox "Confirm Password"
- button "Sign Up"
- paragraph:
  - text: Already have an account?
  - button "Login"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test"
   2 |
   3 | test.describe("Authentication", () => {
   4 |   test("should allow user to sign up", async ({ page }) => {
   5 |     // Go to signup page
   6 |     await page.goto("http://localhost:3000/signup")
   7 |
   8 |     // Fill in signup form
   9 |     await page.fill('input[type="email"]', `test${Date.now()}@example.com`)
  10 |     await page.fill('input[type="password"]', "password123")
  11 |
  12 |     // Submit form
  13 |     await page.click('button[type="submit"]')
  14 |
  15 |     // Check if redirected to login page
> 16 |     await expect(page).toHaveURL("http://localhost:3000/")
     |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
  17 |   })
  18 |
  19 |   test("should allow user to login", async ({ page }) => {
  20 |     // Go to login page
  21 |     await page.goto("http://localhost:3000/")
  22 |
  23 |     // Fill in login form
  24 |     await page.fill('input[type="email"]', "test@example.com")
  25 |     await page.fill('input[type="password"]', "password")
  26 |
  27 |     // Submit form
  28 |     await page.click('button[type="submit"]')
  29 |
  30 |     // Check if redirected to todos page
  31 |     await expect(page).toHaveURL("**/todos")
  32 |   })
  33 |
  34 |   test("should show error for invalid login", async ({ page }) => {
  35 |     // Go to login page
  36 |     await page.goto("http://localhost:3000/")
  37 |
  38 |     // Fill in login form with invalid credentials
  39 |     await page.fill('input[type="email"]', "invalid@example.com")
  40 |     await page.fill('input[type="password"]', "wrongpassword")
  41 |
  42 |     // Submit form
  43 |     await page.click('button[type="submit"]')
  44 |
  45 |     // Check for alert
  46 |     page.on("dialog", async (dialog) => {
  47 |       expect(dialog.message()).toContain("Failed to login")
  48 |       await dialog.accept()
  49 |     })
  50 |   })
  51 | })
  52 |
```