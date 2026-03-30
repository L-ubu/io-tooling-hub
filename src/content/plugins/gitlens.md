---
title: "GitLens"
description: "Supercharges your editor's Git capabilities with blame annotations, history exploration, and powerful diff views."
author: "Luca"
tags: ["git", "blame", "history"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "eamodio.gitlens"
---

## What it does

GitLens shows who changed each line of code and when, directly in the editor gutter. It adds a rich sidebar for browsing commit history, comparing branches, and exploring file changes over time. It turns your editor into a full Git investigation tool without leaving your workflow.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension eamodio.gitlens`
- **Cursor**: Search "GitLens" in the extensions panel

GitLens activates automatically in any workspace that contains a `.git` directory.

## Setup

GitLens works well with default settings, but here are some useful tweaks:

```json
{
  "gitlens.currentLine.enabled": true,
  "gitlens.codeLens.enabled": true,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.blame.avatars": false
}
```

## Tips

- Use the "GitLens: Open File History" command to see every commit that touched the current file.
- Right-click any line and select "Open Changes with Previous Revision" to see exactly what changed and when.
- If the inline blame annotations feel distracting, switch to `"gitlens.currentLine.enabled": false` and rely on the hover instead.
- GitLens pairs well with conventional commits -- the history views become much easier to scan when commit messages are consistent.
