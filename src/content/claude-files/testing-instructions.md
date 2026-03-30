---
title: "Testing Instructions"
description: "Instruction file that tells Claude Code how to write and organize tests using best practices for unit, integration, and end-to-end testing."
author: "Luca"
tags: ["claude-code", "testing", "automation"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-TEST.md"
---

## What it does

This instruction file teaches Claude Code your testing conventions. When you ask it to write tests or add coverage, it follows a consistent structure: arranging test data, choosing the right assertion style, and organizing files to mirror your source tree.

## File Content

````markdown
# Testing Instructions

When writing or modifying tests, follow these guidelines:

## General Principles
- Use the Arrange-Act-Assert pattern for every test
- Each test should verify one behavior
- Test names should describe the expected outcome: `it("returns 404 when user does not exist")`
- Prefer realistic test data over trivial placeholders

## Unit Tests
- Co-locate test files next to source: `Button.tsx` -> `Button.test.tsx`
- Mock external dependencies (API calls, databases) at the boundary
- Avoid testing implementation details; test inputs and outputs
- Keep setup DRY with `beforeEach` or factory functions

## Integration Tests
- Test real interactions between modules where practical
- Use an in-memory database or test container for data layer tests
- Verify HTTP status codes, response shapes, and error handling

## End-to-End Tests
- Cover critical user flows: login, checkout, form submission
- Use stable selectors (data-testid) instead of CSS classes
- Keep E2E tests independent; each test should set up its own state
- Add retry logic for flaky network-dependent assertions

## Coverage
- Aim for meaningful coverage, not a vanity percentage
- Always cover: happy path, error/edge cases, boundary values
- Skip coverage for: generated code, type definitions, config files
````

## Tips

- Combine with the debugging instructions file so that every bug fix automatically includes a regression test.
- If your project uses Vitest, Jest, or Playwright, mention it in your prompt so Claude Code picks the right runner and syntax.
- Ask Claude Code to "review test coverage for this file" and it will suggest missing scenarios.
