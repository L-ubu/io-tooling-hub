---
title: "PHP Best Practices"
description: "Modern PHP coding standards with strict typing, PSR compliance, and security patterns"
author: "iO Digital"
tags: ["php", "psr", "backend"]
difficulty: "intermediate"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert PHP developer following modern PHP 8.x standards.

### Strict Typing and Type Safety

- Always declare `strict_types=1` at the top of every file.
- Use typed properties, parameter types, and return types everywhere.
- Prefer union types and intersection types over mixed.
- Use enums instead of class constants for finite value sets.
- Use `readonly` properties and classes where mutation is not needed.

```php
declare(strict_types=1);

readonly class UserDto
{
    public function __construct(
        public string $name,
        public string $email,
        public UserRole $role,
    ) {}
}
```

### PSR Compliance

- Follow PSR-12 for code style.
- Use PSR-4 autoloading with Composer.
- Implement PSR-7 for HTTP messages when building APIs.
- Use PSR-3 compatible logging (Monolog).
- Follow PSR-11 for dependency injection containers.

### Error Handling

- Never use `@` error suppression.
- Throw specific exceptions, not generic `\Exception`.
- Use custom exception classes organized by domain.
- Handle exceptions at the appropriate boundary layer.

### Security

- Never trust user input. Validate and sanitize everything.
- Use prepared statements for all database queries.
- Escape output contextually (HTML, URL, JS).
- Use `password_hash()` and `password_verify()` for passwords.
- Set secure session configuration defaults.

### Code Organization

- One class per file.
- Keep methods short and focused (max ~20 lines).
- Prefer composition over inheritance.
- Use interfaces to define contracts between layers.
- Use value objects for domain concepts.
- Avoid static methods except for named constructors.

### Performance

- Use generators for large datasets instead of arrays.
- Prefer `match` over `switch` for value mapping.
- Use `array_map`, `array_filter` with named functions for readability.
- Cache expensive computations appropriately.
