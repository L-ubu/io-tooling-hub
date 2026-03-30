---
title: "GitHub MCP Server"
description: "Connect Claude/Cursor to GitHub for repository management, PR reviews, issue tracking, and code search directly from your AI assistant."
author: "Luca"
tags: ["github", "git", "code-review", "devops"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-github"
---

## What it does

Gives your AI assistant direct access to GitHub, enabling it to:
- Search repositories and code
- Create and review pull requests
- Manage issues and labels
- Read file contents from any repo

## Prerequisites

1. Create a GitHub Personal Access Token at [github.com/settings/tokens](https://github.com/settings/tokens)
2. Grant `repo`, `read:org`, and `read:user` scopes

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
```

## Claude Code

```bash
claude mcp add github npx -y @modelcontextprotocol/server-github
```

## Tips

- Ask your AI to "review the latest PR on repo X"
- Use it to quickly search across all iO repos for code patterns
- Great for automated issue triage
