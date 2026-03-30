---
title: "Tailwind CSS IntelliSense"
description: "Autocomplete, linting, and class sorting for Tailwind CSS directly in your editor."
author: "Luca"
tags: ["tailwind", "css", "autocomplete"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "bradlc.vscode-tailwindcss"
---

## What it does

Tailwind CSS IntelliSense gives you autocomplete suggestions for every Tailwind utility class as you type, along with hover previews showing the generated CSS. It also highlights invalid or conflicting classes and can automatically sort your class lists on save.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension bradlc.vscode-tailwindcss`
- **Cursor**: Search "Tailwind CSS IntelliSense" in the extensions panel

The extension activates automatically when it detects a `tailwind.config.js` or `tailwind.config.ts` file in your workspace.

## Setup

For the best experience, add these settings to your workspace `.vscode/settings.json`:

```json
{
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "editor.quickSuggestions": {
    "strings": "on"
  },
  "tailwindCSS.classAttributes": ["class", "className", "tw"]
}
```

## Tips

- If autocomplete stops working, run the command palette action "Tailwind CSS: Restart IntelliSense Server."
- The extension reads your Tailwind config, so custom colors and utilities appear in autocomplete automatically.
- Enable `tailwindCSS.experimental.classRegex` if you use a utility like `clsx` or `cva` to compose class names.
