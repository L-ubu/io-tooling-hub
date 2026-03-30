---
title: "Prettier Extension"
description: "Automatically formats your code on save using Prettier, ensuring a consistent style across your entire team."
author: "Luca"
tags: ["formatting", "prettier", "code-style"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "esbenp.prettier-vscode"
---

## What it does

The Prettier extension integrates the Prettier code formatter into your editor. It automatically formats JavaScript, TypeScript, CSS, JSON, Markdown, and many other languages on save, eliminating style debates and keeping every file consistent across your team.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension esbenp.prettier-vscode`
- **Cursor**: Search "Prettier" in the extensions panel

Then install Prettier as a project dependency:

```bash
npm install -D prettier
```

## Setup

Add these settings to your workspace `.vscode/settings.json` to enable format-on-save:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

Create a `.prettierrc` in your project root to define your team's style:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

## Tips

- Always install Prettier as a local dependency rather than relying on the globally bundled version, so every team member uses the same version.
- Add a `.prettierignore` file to skip generated files, build output, and lock files.
- If Prettier conflicts with ESLint, install `eslint-config-prettier` to turn off the overlapping ESLint rules.
- Use `npx prettier --check .` in CI to catch unformatted files before they reach main.
