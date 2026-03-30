---
title: "Testing Best Practices"
description: "Cursor rule for writing effective unit tests with Vitest and E2E tests with Playwright."
author: "Luca"
tags: ["testing", "vitest", "playwright", "quality"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to generate well-structured, maintainable tests using Vitest for unit/integration testing and Playwright for end-to-end testing.

## Setup

Copy into `.cursor/rules/testing.mdc` in your project.

## Rule Content

````markdown
# Testing Best Practices

## General Principles
- Follow the Arrange-Act-Assert (AAA) pattern in every test
- Test behavior, not implementation — tests should not break when refactoring internals
- Each test should be independent and not rely on the execution order of other tests
- Use descriptive test names that explain the expected behavior: `it("returns 404 when user does not exist")`

## Unit Tests with Vitest

### Structure
- Place test files next to the source: `utils.ts` -> `utils.test.ts`
- Group related tests with `describe` blocks matching the function or module name
- Keep each test focused on a single behavior

```ts
describe("formatCurrency", () => {
  it("formats positive amounts with two decimals", () => {
    const result = formatCurrency(42.5, "EUR");
    expect(result).toBe("€42.50");
  });

  it("handles zero correctly", () => {
    const result = formatCurrency(0, "EUR");
    expect(result).toBe("€0.00");
  });

  it("throws for negative amounts", () => {
    expect(() => formatCurrency(-10, "EUR")).toThrow("Amount must be non-negative");
  });
});
```

### Mocking
- Use `vi.mock()` for module-level mocks — place at the top of the file
- Use `vi.fn()` for inline function mocks
- Use `vi.spyOn()` when you need to observe calls without replacing the implementation
- Always call `vi.restoreAllMocks()` in `afterEach` or use `mockReset: true` in vitest config
- Avoid mocking what you don't own — wrap third-party libraries in your own adapters and mock those

### Assertions
- Prefer specific matchers: `toEqual` for deep equality, `toContain` for arrays/strings, `toThrow` for errors
- Use `toMatchInlineSnapshot()` for complex output that is easier to review inline
- Avoid `toBeTruthy()` / `toBeFalsy()` — be explicit about expected values

## E2E Tests with Playwright

### Structure
- Place E2E tests in `e2e/` or `tests/` directory at the project root
- Name files after the user flow: `checkout-flow.spec.ts`, `login.spec.ts`
- Use `test.describe` to group related flows

### Page Object Model
- Create page objects for each major page to encapsulate selectors and actions:
```ts
class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}
```

### Selectors
- Prefer accessible selectors: `getByRole`, `getByLabel`, `getByText`
- Use `data-testid` only when no accessible selector is available
- Never use CSS selectors or XPath for elements with accessible alternatives

### Assertions
- Use Playwright's auto-waiting assertions: `await expect(page.getByText("Success")).toBeVisible()`
- Avoid hard-coded waits (`page.waitForTimeout`) — prefer `waitForSelector` or auto-waiting locators
- Assert on visible outcomes, not internal state

### Test Isolation
- Each test should start from a clean state — use `beforeEach` for setup
- Use API calls or database seeding for test data, not UI interactions
- Run tests in parallel where possible with `test.describe.configure({ mode: "parallel" })`
````
