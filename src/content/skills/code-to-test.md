---
title: "Generate Tests from Code"
description: "Paste any function or module and get comprehensive unit tests with edge cases, mocks, and assertions automatically generated."
author: "Luca"
tags: ["testing", "automation", "quality"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill takes any piece of source code — a function, a class, or an entire module — and generates a comprehensive test suite for it. It analyzes inputs, outputs, side effects, and error paths to produce tests that cover happy paths, edge cases, and failure scenarios. The generated tests follow best practices for whichever testing framework you use (Jest, Vitest, pytest, Go testing, etc.).

## How to use

1. Copy the function or module you want to test.
2. Paste it into the prompt below, replacing the placeholder.
3. Optionally specify your preferred testing framework and language conventions.
4. Run the prompt in Cursor or Claude Code.
5. Review the generated tests, adjust mocks or fixtures to match your project setup, and add them to your test suite.

For best results, include any relevant type definitions or interfaces that the code depends on so the AI can generate properly typed mocks.

## The Skill/Prompt

````markdown
You are a senior test engineer. Given the following source code, generate a comprehensive test suite.

**Source code to test:**
```
{{PASTE_YOUR_CODE_HERE}}
```

**Requirements:**
- Identify the testing framework from the project context (fallback: Jest for JS/TS, pytest for Python, go test for Go)
- Write tests for every public function and method
- Include the following categories of tests:
  1. **Happy path** — typical valid inputs produce expected outputs
  2. **Edge cases** — empty inputs, boundary values, null/undefined, zero, negative numbers, very large inputs
  3. **Error handling** — invalid inputs throw or return the correct errors
  4. **Integration points** — mock external dependencies (API calls, database, file system)
- Use descriptive test names that explain the scenario and expected outcome
- Group related tests with `describe` blocks (or equivalent)
- Add inline comments explaining *why* each edge case matters
- If the code has side effects, verify they occur (or don't occur) as expected
- Generate any necessary mock data, fixtures, or factory functions at the top of the file

Output ONLY the test file contents, ready to save and run.
````

## Tips

- **Include type definitions**: If your code uses custom types or interfaces, paste those too. The AI will generate better typed mocks and assertions.
- **Specify your framework**: Adding "Use Vitest with Testing Library" or "Use pytest with fixtures" to the prompt gives more accurate output.
- **Iterate on coverage**: After generating tests, run them and ask the AI to add tests for any uncovered branches.
- **Watch for flaky patterns**: Review any tests involving timers, randomness, or async operations — you may need to add deterministic seeds or fake timers.
- **Combine with coverage tools**: Run `--coverage` after adding the generated tests to see exactly which lines still need attention.
