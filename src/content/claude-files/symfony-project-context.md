---
title: "Symfony Project Context"
description: "CLAUDE.md template for Symfony projects with framework conventions and common patterns"
author: "iO Digital"
tags: ["symfony", "php", "claude-file"]
difficulty: "beginner"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "claude-file"
---

## CLAUDE.md Template for Symfony Projects

```markdown
# Project Context

This is a Symfony application.

## Tech Stack
- PHP 8.3+ with strict_types
- Symfony 7.x
- Doctrine ORM with PostgreSQL
- Twig for templates
- PHPUnit for testing
- Composer for dependencies

## Project Structure
- `src/Controller/` — HTTP controllers (thin, delegate to services)
- `src/Entity/` — Doctrine entities (data + mapping only)
- `src/Repository/` — Doctrine repositories (queries)
- `src/Service/` — Business logic
- `src/Form/` — Form types
- `src/Event/` — Event classes and listeners
- `src/Command/` — Console commands
- `config/` — YAML configuration
- `templates/` — Twig templates
- `migrations/` — Doctrine migrations
- `tests/` — PHPUnit tests

## Conventions
- Use PHP attributes for routing, ORM mapping, and validation
- Use constructor injection via autowiring
- Use DTOs for request/response data, not entities
- Use Symfony Messenger for async jobs
- Follow PSR-12 code style (enforced via PHP-CS-Fixer)
- Database changes always go through migrations (`make:migration`)

## Commands
- `composer install` — install dependencies
- `php bin/console server:start` — start dev server
- `php bin/phpunit` — run tests
- `php bin/console make:migration` — generate migration
- `php bin/console doctrine:migrations:migrate` — run migrations
- `composer run lint` — run PHP-CS-Fixer
- `composer run analyse` — run PHPStan

## Testing
- Unit tests in `tests/Unit/`
- Functional tests in `tests/Functional/` using WebTestCase
- Use Foundry for test fixtures
- Run specific test: `php bin/phpunit --filter TestClassName`
```
