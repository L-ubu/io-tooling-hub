---
title: "TypeScript Best Practices"
description: "Cursor rule enforcing strict TypeScript patterns, proper error handling, and clean code conventions used across iO projects."
author: "Luca"
tags: ["typescript", "best-practices", "code-quality"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Enforces consistent TypeScript patterns across your project when using Cursor AI. Includes rules for:
- Strict type safety (no `any`, prefer `unknown`)
- Proper error handling with typed errors
- Functional patterns over class-based when appropriate
- Consistent naming conventions

## Setup

Copy the rule content below into `.cursor/rules/typescript.mdc` in your project root.

## Rule Content

````markdown
# TypeScript Best Practices

## Strict Type Safety
- Never use `any`. Use `unknown` and narrow with type guards when the type is truly unknown
- Enable `strict: true` in tsconfig.json. This includes `strictNullChecks`, `noImplicitAny`, and other important checks
- Prefer `undefined` over `null` for optional values unless an API explicitly requires `null`
- Use `as const` for literal types and to prevent type widening:
  ```ts
  // Without as const: type is string[]
  const roles = ['admin', 'editor', 'viewer'];

  // With as const: type is readonly ['admin', 'editor', 'viewer']
  const roles = ['admin', 'editor', 'viewer'] as const;
  type Role = (typeof roles)[number]; // 'admin' | 'editor' | 'viewer'
  ```
- Avoid type assertions (`as`) except when interfacing with untyped code. Prefer type guards instead

## Types vs Interfaces
- Use `interface` for object shapes that may be extended or implemented:
  ```ts
  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface AdminUser extends User {
    permissions: Permission[];
  }
  ```
- Use `type` for unions, intersections, mapped types, and utility compositions:
  ```ts
  type Status = 'idle' | 'loading' | 'success' | 'error';
  type ApiResponse<T> = { data: T; meta: PaginationMeta } | { error: ApiError };
  ```
- Export types alongside their implementations. Consumers should not need to dig for type definitions

## Discriminated Unions
- Use discriminated unions to model states that are mutually exclusive. This eliminates impossible states:
  ```ts
  // Bad: allows impossible combinations like { isLoading: true, error: new Error() }
  interface RequestState {
    isLoading: boolean;
    data?: User;
    error?: Error;
  }

  // Good: each state is explicit and the compiler enforces correctness
  type RequestState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: User }
    | { status: 'error'; error: Error };

  // TypeScript narrows automatically in switch/if
  function renderState(state: RequestState) {
    switch (state.status) {
      case 'loading': return <Spinner />;
      case 'success': return <UserCard user={state.data} />; // data is available here
      case 'error': return <ErrorMessage error={state.error} />; // error is available here
      case 'idle': return null;
    }
  }
  ```
- Use discriminated unions for event systems, state machines, API responses, and form states

## Generics
- Use generics to create reusable, type-safe abstractions. Keep them as constrained as possible:
  ```ts
  // Unconstrained: T could be anything, even undefined
  function getProperty<T>(obj: T, key: string) { ... }

  // Constrained: T must be an object, K must be a key of T
  function getProperty<T extends Record<string, unknown>, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  ```
- Name generic parameters descriptively when their purpose is not obvious:
  ```ts
  // Simple cases: T is fine
  function identity<T>(value: T): T { return value; }

  // Complex cases: use descriptive names
  function mergeConfigs<TBase extends Config, TOverride extends Partial<TBase>>(
    base: TBase,
    override: TOverride
  ): TBase & TOverride { ... }
  ```
- Avoid generics with more than 3 type parameters. If you need more, the abstraction is probably too complex

## Utility Types
- Know and use the built-in utility types instead of reinventing them:
  ```ts
  Partial<T>          // Makes all properties optional
  Required<T>         // Makes all properties required
  Pick<T, K>          // Selects a subset of properties
  Omit<T, K>          // Removes a subset of properties
  Record<K, V>        // Creates an object type with keys K and values V
  Readonly<T>         // Makes all properties readonly
  ReturnType<F>       // Extracts the return type of a function
  Parameters<F>       // Extracts parameter types as a tuple
  Awaited<T>          // Unwraps a Promise type
  NonNullable<T>      // Removes null and undefined from T
  Extract<T, U>       // Extracts types from T that are assignable to U
  Exclude<T, U>       // Removes types from T that are assignable to U
  ```
- Compose utility types for common patterns:
  ```ts
  // A User with only 'id' required, everything else optional
  type UserPatch = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;

  // All properties of Config, but readonly and deeply partial
  type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };
  ```

## Type Narrowing
- Prefer `in` operator, `instanceof`, and custom type guards over type assertions:
  ```ts
  // 'in' operator for discriminating object shapes
  function handleEvent(event: MouseEvent | KeyboardEvent) {
    if ('key' in event) {
      console.log(event.key); // TypeScript knows it's KeyboardEvent
    }
  }

  // Custom type guard for reusable narrowing
  function isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error
    );
  }

  // Usage
  try {
    await fetchUser(id);
  } catch (error: unknown) {
    if (isApiError(error)) {
      showToast(error.message); // TypeScript knows error is ApiError
    } else {
      showToast('An unexpected error occurred');
    }
  }
  ```
- Use `satisfies` to validate a value matches a type without widening:
  ```ts
  const config = {
    api: { baseUrl: 'https://api.example.com', timeout: 5000 },
    features: { darkMode: true, beta: false },
  } satisfies Record<string, Record<string, string | number | boolean>>;
  // config retains its literal types but TypeScript validates the shape
  ```

## Error Handling
- Always type catch clauses as `unknown`:
  ```ts
  try {
    const data = await fetchData();
  } catch (error: unknown) {
    if (error instanceof NetworkError) {
      retry();
    } else if (error instanceof ValidationError) {
      showFieldErrors(error.fields);
    } else {
      reportUnexpectedError(error);
    }
  }
  ```
- Create custom error classes for domain-specific errors:
  ```ts
  class AppError extends Error {
    constructor(
      message: string,
      public readonly code: string,
      public readonly statusCode: number = 500
    ) {
      super(message);
      this.name = 'AppError';
    }
  }

  class NotFoundError extends AppError {
    constructor(resource: string, id: string) {
      super(`${resource} with id ${id} not found`, 'NOT_FOUND', 404);
      this.name = 'NotFoundError';
    }
  }
  ```
- Never swallow errors silently. At minimum, log them. Prefer explicit handling
- Use Result types for operations that can fail without throwing:
  ```ts
  type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

  function parseConfig(raw: string): Result<Config, ParseError> {
    try {
      return { ok: true, value: JSON.parse(raw) };
    } catch {
      return { ok: false, error: new ParseError('Invalid JSON') };
    }
  }
  ```

## Async Patterns
- Always handle Promise rejections. Never leave a `.catch` chain empty
- Use `Promise.allSettled` when you need all results regardless of individual failures:
  ```ts
  const results = await Promise.allSettled([fetchUser(id), fetchOrders(id), fetchPreferences(id)]);

  const [userResult, ordersResult, prefsResult] = results;
  const user = userResult.status === 'fulfilled' ? userResult.value : null;
  ```
- Type async function return values explicitly for exported functions:
  ```ts
  async function getUser(id: string): Promise<User | null> { ... }
  ```
- Use `AbortController` for cancellable async operations:
  ```ts
  async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }
  ```

## Functions
- Prefer pure functions where possible: same input always produces same output, no side effects
- Use explicit return types for exported functions. Inferred types are fine for internal/private functions
- Prefer `readonly` for parameters and properties that should not be mutated:
  ```ts
  function processItems(items: readonly Item[]): Item[] {
    return items.filter((item) => item.isActive).map((item) => ({ ...item, processed: true }));
  }
  ```
- Use `Record<string, T>` over `{ [key: string]: T }` for index signatures
- Use function overloads when a function has multiple call signatures with different return types:
  ```ts
  function createElement(tag: 'input'): HTMLInputElement;
  function createElement(tag: 'div'): HTMLDivElement;
  function createElement(tag: string): HTMLElement;
  function createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }
  ```

## Module Patterns and Barrel Exports
- Use barrel exports (`index.ts`) to define the public API of a module:
  ```ts
  // components/index.ts
  export { Button } from './Button';
  export { Input } from './Input';
  export type { ButtonProps } from './Button';
  export type { InputProps } from './Input';
  ```
- Never re-export internal utilities through barrel exports. Only export what consumers need
- Use `export type` for type-only exports to help bundlers with tree-shaking:
  ```ts
  export type { User, UserRole } from './types';
  ```
- Avoid deep import paths. If a consumer needs to import `@/components/Button/Button`, your barrel export is missing an entry
- Use path aliases (`@/`) configured in tsconfig.json to avoid brittle relative imports like `../../../`

## Naming Conventions
- PascalCase for types, interfaces, enums, classes, and React components
- camelCase for variables, functions, methods, and properties
- UPPER_SNAKE_CASE for true constants (values that never change and are known at compile time)
- Prefix boolean variables and props with `is`, `has`, `can`, `should`:
  ```ts
  const isLoading = true;
  const hasPermission = user.role === 'admin';
  const canEdit = hasPermission && !isLocked;
  ```
- Do not prefix interfaces with `I` or types with `T`. Use descriptive nouns: `User`, not `IUser`
- Name enums in singular PascalCase with PascalCase members:
  ```ts
  enum Status {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
  }
  ```

## Configuration
- Recommended tsconfig.json strict settings:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "forceConsistentCasingInFileNames": true,
      "exactOptionalPropertyTypes": true
    }
  }
  ```
- Use `noUncheckedIndexedAccess` to force null checks on array and object index access. This catches real bugs
- Enable `verbatimModuleSyntax` if your bundler supports it, for consistent import/export handling
````
