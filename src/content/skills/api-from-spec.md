---
title: "Generate API from Spec"
description: "Turn an OpenAPI or Swagger specification into a fully typed, production-ready API implementation with validation, error handling, and route definitions."
author: "Luca"
tags: ["api", "openapi", "codegen"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill takes an OpenAPI (v3) or Swagger (v2) specification and generates a working API implementation. It produces route handlers, request/response types, input validation, error responses, and middleware scaffolding for your framework of choice (Express, Fastify, Hono, Flask, FastAPI, etc.). The output is structured to match production codebases — not a single giant file, but organized by resource with proper separation of concerns.

## How to use

1. Have your OpenAPI spec ready — either as a YAML/JSON file in your project or pasted directly.
2. Specify your target framework and language in the prompt.
3. Run the prompt. The AI will parse every path, method, schema, and parameter.
4. Review the generated files, wire them into your existing project structure, and implement the business logic stubs.

If your spec is large, consider running this skill per-resource (e.g., "generate only the /users endpoints") to keep the output manageable.

## The Skill/Prompt

````markdown
You are a backend engineer generating a production-ready API from an OpenAPI specification.

**OpenAPI Spec:**
```yaml
{{PASTE_YOUR_OPENAPI_SPEC_OR_REFERENCE_THE_FILE}}
```

**Target framework:** {{EXPRESS / FASTIFY / HONO / FASTAPI / FLASK / OTHER}}
**Language:** {{TYPESCRIPT / PYTHON / GO / OTHER}}

**Generate the following:**

1. **Route definitions**: One file per resource/tag grouping. Each route should:
   - Use the correct HTTP method and path
   - Reference the handler function
   - Apply authentication middleware where the spec defines security schemes

2. **Request/Response types**: Strongly typed interfaces or classes derived from the spec's schemas, including:
   - Request body types
   - Query parameter types
   - Path parameter types
   - Response types for each status code

3. **Input validation**: Validate request bodies, query params, and path params using:
   - Zod (TypeScript) / Pydantic (Python) / struct tags (Go) or equivalent
   - Return 400 errors with descriptive messages on validation failure

4. **Handler stubs**: For each endpoint, generate a handler function with:
   - Typed parameters extracted from the request
   - A TODO comment for business logic
   - Proper error handling returning the correct status codes from the spec

5. **Error handling middleware**: A centralized error handler that:
   - Catches validation errors and returns 400
   - Catches not-found errors and returns 404
   - Catches unexpected errors and returns 500 with a safe message

Output the file structure as a tree, then produce each file's full contents.
````

## Tips

- **Validate your spec first**: Run your spec through the Swagger Editor or `openapi-lint` before feeding it to this skill. A malformed spec produces malformed code.
- **Generate incrementally**: For large APIs (50+ endpoints), generate one tag/resource group at a time and integrate each batch.
- **Add the business logic**: The generated handlers are stubs. The value is in the boilerplate (types, validation, routing) so you can focus on logic.
- **Keep types in sync**: If your spec evolves, re-run this skill and diff the output against your existing types to catch schema drift.
- **Combine with database schema skill**: Use the "Design Database Schema" skill to generate models that align with your API types.
