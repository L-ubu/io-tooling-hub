---
title: "Drupal Development"
description: "Drupal module development patterns, hooks, services, and theming best practices"
author: "iO Digital"
tags: ["drupal", "php", "cms"]
difficulty: "intermediate"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert Drupal developer following Drupal coding standards and best practices.

### Module Structure

- Follow Drupal's module directory conventions: `modules/custom/my_module/`.
- Use `.info.yml` for module metadata, `.module` for hooks, `.services.yml` for DI.
- Prefer services and plugins over procedural hook implementations where possible.
- Use the Plugin API for extensible, swappable functionality.
- Keep `*.module` files thin — only hook implementations.

```
modules/custom/my_module/
  my_module.info.yml
  my_module.module
  my_module.services.yml
  my_module.routing.yml
  src/
    Controller/
    Form/
    Plugin/
    Service/
```

### Services and Dependency Injection

- Register services in `my_module.services.yml`.
- Use constructor injection. Access the container directly only in `.module` files via `\Drupal::service()`.
- Tag services appropriately (e.g., `event_subscriber`).
- Use `ContainerInjectionInterface` for form and controller classes.

### Entities and Fields

- Use config entities for admin-defined structures, content entities for user content.
- Define field types, widgets, and formatters as plugins.
- Use Entity API methods, not direct database queries.
- Use `hook_entity_presave`, `hook_entity_insert` for entity lifecycle logic.
- Prefer entity queries (`\Drupal::entityQuery()`) over direct DB queries.

### Routing and Controllers

- Define routes in `my_module.routing.yml`.
- Use `_controller` for page callbacks, `_form` for form routes.
- Apply access control via `_permission`, `_role`, or `_custom_access`.
- Return render arrays from controllers, not raw HTML.

### Theming and Rendering

- Use Twig templates. Never put HTML in PHP.
- Implement `hook_theme()` to register templates.
- Use render arrays with `#theme`, `#type`, or `#markup`.
- Attach libraries (CSS/JS) via `#attached` or `*.libraries.yml`.
- Use Twig namespaces for cross-module/theme template inclusion.
- Follow BEM naming convention for CSS classes.

### Configuration Management

- Export config with `drush config:export`.
- Use config/install for default config shipped with modules.
- Use config/optional for config that depends on other modules.
- Never modify active config directly in code — use config overrides or the API.

### Security

- Use `t()` and `@placeholder` for user-facing strings (auto-escaping).
- Use `Xss::filter()` for any user-provided HTML.
- Check permissions in access callbacks: `$account->hasPermission()`.
- Use Form API with CSRF tokens (built-in). Never process raw POST data.
- Sanitize all database inputs via the Database API's placeholder system.

### Coding Standards

- Follow Drupal Coding Standards (based on PSR-12 with Drupal-specific additions).
- Use `phpcs --standard=Drupal,DrupalPractice` for linting.
- Document all hooks and public methods with PHPDoc.
- Prefix custom database tables with module name.

### Performance

- Use Drupal Cache API with proper cache tags and contexts.
- Implement cache metadata on render arrays (`#cache`).
- Use lazy builders for personalized or uncacheable content.
- Aggregate CSS/JS in production.
