---
title: "REST API Design Patterns"
description: "Cursor rule for designing consistent REST APIs with proper naming, error handling, pagination, and versioning."
author: "Luca"
tags: ["api", "rest", "backend", "design"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to generate REST API endpoints that follow consistent conventions for naming, response shapes, error handling, and pagination.

## Setup

Copy into `.cursor/rules/api-design.mdc` in your project.

## Rule Content

````markdown
# REST API Design Patterns

## Naming Conventions
- Use plural nouns for resource collections: `/users`, `/orders`, `/products`
- Use kebab-case for multi-word resources: `/order-items`, `/user-profiles`
- Nest resources to express relationships: `/users/:id/orders`
- Use query parameters for filtering, sorting, and pagination — not path segments
- Avoid verbs in URLs — let HTTP methods express the action:
  - `GET /users` (list), `POST /users` (create), `GET /users/:id` (read), `PUT /users/:id` (update), `DELETE /users/:id` (delete)

## Response Format
- Always return a consistent JSON envelope:
```json
{
  "data": { ... },
  "meta": { "requestId": "abc-123" }
}
```
- For collections, wrap in an array with pagination metadata:
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 142,
    "totalPages": 8
  }
}
```
- Return `201 Created` with the created resource for POST requests
- Return `204 No Content` for successful DELETE requests

## Error Responses
- Use standard HTTP status codes consistently:
  - `400` — Validation error or malformed request
  - `401` — Not authenticated
  - `403` — Authenticated but not authorized
  - `404` — Resource not found
  - `409` — Conflict (e.g., duplicate resource)
  - `422` — Unprocessable entity (valid JSON but semantic errors)
  - `429` — Rate limited
  - `500` — Internal server error
- Return a structured error body:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "must be a valid email address" }
    ]
  }
}
```

## Pagination
- Use cursor-based pagination for large or frequently changing datasets:
  - `GET /orders?cursor=abc123&limit=20`
  - Return `nextCursor` in the response meta
- Use offset-based pagination for simpler use cases:
  - `GET /products?page=2&pageSize=20`
- Always set a default and maximum page size (e.g., default 20, max 100)
- Include total count only when explicitly requested via `?includeTotalCount=true` for performance

## Versioning
- Prefix the URL with the API version: `/api/v1/users`
- Only bump the version for breaking changes
- Support the previous version for a documented deprecation period
- Include a `Sunset` header on deprecated endpoints with the retirement date

## Validation and Security
- Validate all input with a schema library (zod, joi) at the handler level
- Sanitize string inputs to prevent injection attacks
- Use rate limiting on all public endpoints
- Return only the fields the client needs — never expose internal IDs, passwords, or tokens
````
