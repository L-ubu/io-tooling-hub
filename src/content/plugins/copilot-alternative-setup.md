---
title: "Cursor AI Setup Guide"
description: "Complete Cursor IDE setup guide with recommended extensions, settings, and AI configuration for maximum productivity."
author: "Luca"
tags: ["cursor", "ide", "setup", "productivity"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "plugin"
installTarget: ["cursor"]
---

## What it does

A comprehensive setup guide for Cursor IDE that gets you productive with AI-assisted development in minutes.

## Recommended Settings

Add to your Cursor settings (`.cursor/settings.json`):

```json
{
  "cursor.ai.model": "claude-sonnet-4-20250514",
  "cursor.ai.enableAutocompletion": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on"
}
```

## Essential Extensions

1. **Prettier** — Code formatting
2. **ESLint** — Linting
3. **Tailwind CSS IntelliSense** — Tailwind autocomplete
4. **Error Lens** — Inline error display
5. **GitLens** — Git blame and history

## Tips for AI-Assisted Coding

- Use `Cmd+K` for inline edits
- Use `Cmd+L` to open the AI chat
- Reference files with `@filename` in chat
- Add `.cursor/rules/` files for project-specific AI behavior
- Use `@codebase` to search across your entire project
