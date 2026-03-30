---
title: "CLAUDE.md Project Context Template"
description: "A comprehensive CLAUDE.md template that gives Claude Code full context about your project structure, conventions, and preferences."
author: "Luca"
tags: ["claude-code", "context", "template", "productivity"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE.md"
---

## What it does

A ready-to-use `CLAUDE.md` template that you drop into your project root. It tells Claude Code about your project structure, tech stack, coding conventions, and workflow preferences so it can assist you more effectively from the first prompt.

## Template

````markdown
# Project: [Your Project Name]

## Overview
[Brief description of what this project does]

## Tech Stack
- **Framework**: [e.g., Next.js 14, Astro, SvelteKit]
- **Language**: [e.g., TypeScript 5.x]
- **Styling**: [e.g., Tailwind CSS v4]
- **Database**: [e.g., PostgreSQL via Prisma]
- **Testing**: [e.g., Vitest + Playwright]

## Project Structure
- `src/` — Application source code
- `src/components/` — Reusable UI components
- `src/lib/` — Shared utilities and helpers
- `src/pages/` or `src/app/` — Routes/pages
- `tests/` — Test files

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run test` — Run tests
- `npm run lint` — Lint and format

## Conventions
- [List your coding conventions here]
- [e.g., Use functional components, prefer composition over inheritance]
- [e.g., All API responses follow { data, error, meta } shape]

## Important Notes
- [Any gotchas or special considerations]
- [e.g., Auth tokens are stored in httpOnly cookies, not localStorage]
````

## Tips

- Keep it updated as your project evolves
- Add specific instructions for areas where AI often gets things wrong
- Include links to relevant docs or ADRs
