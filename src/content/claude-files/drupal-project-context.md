---
title: "Drupal Project Context"
description: "CLAUDE.md template for Drupal projects with module development conventions and Drush commands"
author: "iO Digital"
tags: ["drupal", "php", "claude-file"]
difficulty: "beginner"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "claude-file"
---

## CLAUDE.md Template for Drupal Projects

```markdown
# Project Context

This is a Drupal 10/11 application.

## Tech Stack
- PHP 8.2+ with strict_types
- Drupal 10.x / 11.x
- Composer for dependency management
- Drush for CLI operations
- PHPUnit for testing

## Project Structure
- `web/` — Drupal docroot
- `web/modules/custom/` — Custom modules (our code lives here)
- `web/themes/custom/` — Custom themes
- `web/sites/default/settings.php` — Site configuration
- `config/sync/` — Exported configuration YAML
- `composer.json` — Project dependencies

## Module Development Conventions
- Use services and dependency injection via `.services.yml`
- Use Plugin API for extensible components (Blocks, Field types, etc.)
- Use PHP attributes for plugin definitions where supported
- Keep `.module` files minimal — only hook implementations
- Use `hook_entity_*` for entity lifecycle logic
- Use Render arrays, never raw HTML in PHP
- Follow Drupal Coding Standards (phpcs --standard=Drupal)

## Commands
- `composer install` — install dependencies
- `drush cr` — clear/rebuild cache
- `drush cex` — export configuration
- `drush cim` — import configuration
- `drush updb` — run database updates
- `drush en module_name` — enable a module
- `drush uli` — generate one-time login link
- `phpunit web/modules/custom/my_module` — run module tests

## Configuration Management
- All config changes must be exported with `drush cex`
- Never edit config YAML manually unless necessary
- Use config_split for environment-specific config

## Testing
- Unit tests extend `UnitTestCase`
- Kernel tests extend `KernelTestBase` (needs database)
- Functional tests extend `BrowserTestBase`
- Run: `phpunit --group my_module`
```
