# Test info

- Name: Delete Todo
- Location: C:\Projects\Project\my-todo-app\frontend\tests\todo.spec.js:11:1

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Add a new todo"]')

    at C:\Projects\Project\my-todo-app\frontend\tests\todo.spec.js:13:14
```

# Page snapshot

```yaml
- button "Switch to dark mode"
- button "Logout"
- heading "Welcome Back" [level=2]
- text: Email
- textbox "Email"
- text: Password
- textbox "Password"
- button "Login"
- paragraph:
  - text: Don't have an account?
  - button "Sign Up"
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('Add Todo', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000');
   5 |   await page.fill('input[placeholder="Add a new todo"]', 'Test Todo');
   6 |   await page.click('text=Add');
   7 |   const todoCount = await page.locator('text=Test Todo').count();
   8 |   expect(todoCount).toBe(1);
   9 | });
  10 |
  11 | test('Delete Todo', async ({ page }) => {
  12 |   await page.goto('http://localhost:3000');
> 13 |   await page.fill('input[placeholder="Add a new todo"]', 'Todo to Delete');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  14 |   await page.click('text=Add');
  15 |   await page.click('text=Delete');
  16 |   const todoCount = await page.locator('text=Todo to Delete').count();
  17 |   expect(todoCount).toBe(0);
  18 | });
```