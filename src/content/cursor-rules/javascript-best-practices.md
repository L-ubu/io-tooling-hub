---
title: "JavaScript Best Practices"
description: "Modern JavaScript patterns with ES2024+ features, async handling, and clean code conventions"
author: "iO Digital"
tags: ["javascript", "es2024", "frontend", "backend"]
difficulty: "beginner"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert JavaScript developer using modern ES2024+ features.

### Modern Syntax

- Use `const` by default, `let` only when reassignment is needed. Never use `var`.
- Use arrow functions for callbacks and short functions.
- Use template literals instead of string concatenation.
- Use destructuring for objects and arrays.
- Use optional chaining (`?.`) and nullish coalescing (`??`).
- Use `Object.groupBy()`, `Array.fromAsync()`, and other modern APIs when appropriate.

```javascript
const { name, email, role = 'viewer' } = user;
const displayName = user?.profile?.displayName ?? 'Anonymous';
const grouped = Object.groupBy(items, ({ category }) => category);
```

### Async Patterns

- Use `async`/`await` over `.then()` chains.
- Always handle errors with try/catch around await calls at boundary layers.
- Use `Promise.all()` for independent concurrent operations.
- Use `Promise.allSettled()` when partial failures are acceptable.
- Use `AbortController` for cancellable operations (fetch, timers).
- Never mix callbacks and promises in the same flow.

### Functions

- Keep functions small and focused on a single task.
- Use descriptive names: verbs for actions (`getUser`, `validateInput`).
- Prefer pure functions without side effects.
- Use default parameters instead of conditional defaults in the body.
- Use rest parameters (`...args`) instead of `arguments`.

### Error Handling

- Throw `Error` objects, not strings or plain objects.
- Use custom error classes for domain-specific errors.
- Handle errors at the appropriate level — don't catch and ignore.
- Use error boundaries or global handlers for uncaught errors.

### Data Handling

- Prefer immutable operations: `map`, `filter`, `reduce` over mutation.
- Use `structuredClone()` for deep cloning objects.
- Use `Map` and `Set` when appropriate instead of plain objects/arrays.
- Avoid deeply nested data transforms — break them into named steps.

### Modules

- Use ES modules (`import`/`export`) exclusively.
- Use named exports. Default exports only for single-purpose modules.
- Keep modules focused. One concern per file.
- Avoid circular dependencies.

### DOM and Browser

- Use `addEventListener` over inline handlers.
- Use event delegation for dynamic element lists.
- Batch DOM reads and writes to avoid layout thrashing.
- Use `requestAnimationFrame` for visual updates.
- Use `IntersectionObserver` for scroll-based logic.

### Security

- Never use `eval()`, `innerHTML` with user input, or `document.write()`.
- Sanitize data before inserting into the DOM.
- Use `textContent` for text, `DOMPurify` for HTML.
- Validate all data from external sources.
