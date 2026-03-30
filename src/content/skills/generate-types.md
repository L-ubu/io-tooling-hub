---
title: "Generate TypeScript Types"
description: "Generate accurate TypeScript types and interfaces from JSON data, API responses, database schemas, or plain-language descriptions."
author: "Luca"
tags: ["typescript", "types", "codegen"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill generates TypeScript type definitions from various input sources. Paste a JSON response from an API, a database table definition, a GraphQL schema, or even a plain-language description of a data structure, and get back properly typed interfaces with optional fields, union types, enums, and utility types. It handles nested objects, arrays, nullable fields, and discriminated unions automatically.

## How to use

1. Choose your input source: JSON data, API response, database schema, GraphQL types, or a description.
2. Paste it into the prompt below.
3. Optionally specify naming conventions (PascalCase interfaces, camelCase properties) or preferences (type vs. interface, branded types, Zod schemas alongside types).
4. Run the prompt and add the generated types to your project.

For API responses, paste multiple response examples if possible — this helps the AI identify which fields are optional versus always present.

## The Skill/Prompt

````markdown
You are a TypeScript type architect. Generate precise type definitions from the following input.

**Input type:** {{JSON_DATA / API_RESPONSE / DATABASE_SCHEMA / GRAPHQL_SCHEMA / DESCRIPTION}}

**Input:**
```
{{PASTE_YOUR_INPUT_HERE}}
```

**Preferences (optional):**
- Naming convention: {{PascalCase / camelCase}}
- Style: {{interface / type alias}}
- Also generate: {{Zod schema / io-ts codec / none}}
- Enum style: {{string enum / const object / union type}}

**Requirements:**

1. **Accurate types**: Infer the most specific type possible. Use `string` only if the values are truly arbitrary. Prefer literal unions (e.g., `"active" | "inactive"`) when the values are from a known set.

2. **Optional fields**: Mark fields as optional (`?`) if they are not present in all examples or if they are nullable in the schema. Distinguish between `undefined` and `null` where it matters.

3. **Nested types**: Extract nested objects into their own named interfaces rather than inlining them. Use descriptive names based on the parent field name.

4. **Arrays and unions**: Type arrays with their element type. If an array contains mixed types, use a discriminated union if a discriminator field exists.

5. **Utility types**: Use `Readonly<>`, `Partial<>`, `Pick<>`, `Omit<>`, and `Record<>` where they reduce duplication.

6. **Documentation**: Add JSDoc comments to each interface and to any non-obvious fields explaining what they represent.

7. **Export**: Export all types. Group them logically with section comments.

Output the complete type file, ready to save as `types.ts`.
````

## Tips

- **Paste multiple examples**: If you have two or three different API responses from the same endpoint, paste them all. The AI can diff them to identify optional fields and polymorphic responses.
- **Generate Zod schemas too**: Zod schemas give you runtime validation that matches your static types. Ask for them when the data crosses a trust boundary (API responses, user input, file parsing).
- **Use branded types for IDs**: Ask the AI to generate branded types (`type UserId = string & { __brand: "UserId" }`) for identifiers to prevent accidentally passing a PostId where a UserId is expected.
- **Keep types close to usage**: Put types in the same module that uses them, or in a shared `types.ts` only if they are used across multiple modules.
- **Regenerate when APIs change**: Re-run this skill when you notice a new field in an API response. Keeping types in sync prevents `any` casts from creeping in.
