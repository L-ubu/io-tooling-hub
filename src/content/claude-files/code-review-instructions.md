---
title: "Code Review Instructions"
description: "Instructions file that tells Claude Code how to perform thorough code reviews following iO standards."
author: "Luca"
tags: ["claude-code", "code-review", "quality"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-REVIEW.md"
---

## What it does

Drop this file into your project and ask Claude Code to review your changes. It will follow a structured checklist covering security, performance, readability, and iO-specific conventions.

## File Content

````markdown
# Code Review Guidelines

When reviewing code, check the following in order:

## 1. Security
- [ ] No secrets or tokens in code
- [ ] User input is validated and sanitized
- [ ] SQL queries use parameterized statements
- [ ] Authentication/authorization checks present where needed
- [ ] No XSS vectors (unsanitized HTML rendering)

## 2. Correctness
- [ ] Logic handles edge cases (null, empty, boundary values)
- [ ] Error handling is present and meaningful
- [ ] Types are correct and not overly permissive
- [ ] Tests cover the happy path and key failure modes

## 3. Performance
- [ ] No unnecessary re-renders (React)
- [ ] Database queries are efficient (no N+1)
- [ ] Large lists are paginated or virtualized
- [ ] Assets are optimized (images, bundles)

## 4. Readability
- [ ] Code is self-documenting (clear names, small functions)
- [ ] Complex logic has explanatory comments
- [ ] Consistent formatting and style
- [ ] No dead code or unused imports

## 5. Architecture
- [ ] Changes follow existing patterns in the codebase
- [ ] No unnecessary abstractions
- [ ] Dependencies are justified
- [ ] API contracts are backward-compatible
````
