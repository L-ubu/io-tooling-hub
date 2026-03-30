---
title: "ESLint + Prettier Config"
description: "Shared ESLint and Prettier configuration matching iO Digital's code style standards."
author: "Luca"
tags: ["eslint", "prettier", "linting", "code-quality"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "dbaeumer.vscode-eslint"
installCommand: "npm install -D eslint prettier eslint-config-prettier"
---

## What it does

Installs and configures ESLint + Prettier with a shared config that matches iO's coding standards. Works in both VS Code and Cursor.

## Install Extension

Install the ESLint extension:
- **VS Code**: `code --install-extension dbaeumer.vscode-eslint`
- **Cursor**: Search "ESLint" in the extensions panel

## Setup

```bash
npm install -D eslint prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Recommended Config

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "no-console": "warn"
  }
}
```
