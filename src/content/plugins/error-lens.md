---
title: "Error Lens"
description: "Highlights errors and warnings inline next to the code that caused them, making diagnostics impossible to miss."
author: "Luca"
tags: ["errors", "diagnostics", "dx"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "usernamehw.errorlens"
---

## What it does

Error Lens enhances the built-in diagnostics by rendering error, warning, and info messages inline at the end of the line where they occur. No more squinting at squiggly underlines or opening the Problems panel -- you see the issue immediately as you type.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension usernamehw.errorlens`
- **Cursor**: Search "Error Lens" in the extensions panel

It works out of the box with no additional configuration.

## Setup

Optionally adjust the appearance in your settings:

```json
{
  "errorLens.fontStyleItalic": true,
  "errorLens.gutterIconsEnabled": true,
  "errorLens.messageMaxChars": 120,
  "errorLens.enabledDiagnosticLevels": ["error", "warning"]
}
```

## Tips

- If the inline messages feel noisy, limit them to errors only by removing `"warning"` from `enabledDiagnosticLevels`.
- Error Lens works with any language server or linter that provides diagnostics, including ESLint, TypeScript, and Stylelint.
- Use `errorLens.delay` to add a short delay (e.g., 500ms) so messages only appear after you stop typing.
