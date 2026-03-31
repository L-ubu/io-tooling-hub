---
title: "Symfony Best Practices"
description: "Symfony framework conventions for services, controllers, Doctrine, and project structure"
author: "iO Digital"
tags: ["symfony", "php", "backend", "doctrine"]
difficulty: "intermediate"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert Symfony developer following official Symfony best practices.

### Project Structure

- Use the default Symfony directory structure (`src/`, `config/`, `templates/`, `migrations/`).
- Organize code by feature or domain, not by technical layer, in larger projects.
- Keep `Controller/`, `Entity/`, `Repository/`, `Service/`, `Event/`, `Form/` namespaces.
- Use `config/packages/` for bundle configuration. Use YAML for config, PHP attributes for routing.

### Controllers

- Keep controllers thin. They should only coordinate, not contain business logic.
- Use PHP attributes for routing: `#[Route('/api/users', methods: ['GET'])]`.
- Use constructor injection via autowiring for dependencies.
- Return early for validation failures and error cases.
- Use `#[MapRequestPayload]` and `#[MapQueryString]` for request mapping.

```php
#[Route('/api/users', name: 'api_users_')]
class UserController extends AbstractController
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    #[Route('', methods: ['POST'])]
    public function create(#[MapRequestPayload] CreateUserDto $dto): JsonResponse
    {
        $user = $this->userService->create($dto);
        return $this->json($user, Response::HTTP_CREATED);
    }
}
```

### Services and Dependency Injection

- Use autowiring and autoconfiguration. Avoid manual service definitions when possible.
- Use interface bindings for swappable implementations.
- Keep services stateless.
- Use `#[AsDecorator]` for the decorator pattern.
- Tag services with `#[AutoconfigureTag]` for extension points.

### Doctrine ORM

- Use PHP attributes for entity mapping, not XML or YAML.
- Keep entities as plain objects. No service dependencies in entities.
- Use custom repository classes extending `ServiceEntityRepository`.
- Write DQL or QueryBuilder for complex queries. Avoid raw SQL.
- Always use migrations for schema changes (`make:migration`).
- Use lifecycle callbacks sparingly. Prefer Doctrine event listeners.

```php
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    private string $email;
}
```

### Forms and Validation

- Use Symfony Form component for data-bound forms.
- Apply validation constraints via PHP attributes on DTOs or entities.
- Use validation groups for context-specific validation.
- Create custom constraints for domain-specific rules.

### Security

- Use Symfony Security component. Define voters for authorization logic.
- Use `#[IsGranted]` attribute on controller methods.
- Hash passwords with the `UserPasswordHasherInterface`.
- Use CSRF protection for all non-API forms.
- Configure firewalls properly in `security.yaml`.

### Testing

- Use `WebTestCase` for functional tests with the built-in HTTP client.
- Use `KernelTestCase` for integration tests needing the container.
- Prefer Foundry or Fixtures for test data over manual entity creation.
- Test services in isolation with PHPUnit and mock dependencies.

### Performance

- Use Symfony Cache component with proper cache pool configuration.
- Enable OPcache in production.
- Use Messenger for async processing of heavy tasks.
- Profile with Symfony Profiler and Blackfire.
