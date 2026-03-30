---
title: "Claude Code CLI"
description: "Install and configure Claude Code, Anthropic's AI-powered CLI assistant that integrates with your editor and terminal."
author: "Luca"
tags: ["claude-code", "cli", "ai", "setup"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "plugin"
installTarget: ["cursor", "vscode"]
installCommand: "npm install -g @anthropic-ai/claude-code"
externalUrl: "https://claude.ai/code"
---

## What it does

Claude Code is a command-line AI assistant built by Anthropic that lives in your terminal. It can read your codebase, write and edit files, run commands, search across your project, and help you with everything from debugging to writing pull request descriptions. It integrates with VS Code and Cursor via the terminal.

## Install

Install Claude Code globally via npm:

```bash
npm install -g @anthropic-ai/claude-code
```

Then launch it from any project directory:

```bash
cd your-project
claude
```

On first run, it will guide you through authentication and setup.

## Setup

Claude Code works out of the box, but you can customize its behavior:

- **Project instructions**: Add a `CLAUDE.md` file to your project root with conventions and context Claude should follow.
- **User settings**: Run `claude config` to set global preferences like your preferred model and output style.
- **Editor integration**: In VS Code or Cursor, open the integrated terminal and run `claude` to start an interactive session alongside your code.

For team-wide conventions, commit your `CLAUDE.md` files to version control so every developer gets the same AI behavior.

## Tips

- Use `claude "your question here"` for one-shot queries without entering interactive mode.
- Pipe output into Claude for quick analysis: `git diff | claude "review these changes"`.
- Drop specialized instruction files (like the ones in this hub) into your project to teach Claude Code domain-specific workflows.
- Claude Code respects `.gitignore` and avoids reading sensitive files by default.
- Run `claude update` to upgrade to the latest version.
