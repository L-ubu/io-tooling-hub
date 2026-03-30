---
title: "Linear MCP Server"
description: "Manage Linear issues, projects, and cycles from your AI assistant. Create tickets, update statuses, and search across your workspace."
author: "Luca"
tags: ["linear", "project-management", "issues", "planning"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @linear/mcp-server"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=linear&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsaW5lYXIvbWNwLXNlcnZlciJdfQo="
externalUrl: "https://linear.app"
---

## What it does

Connects your AI assistant to your Linear workspace, enabling it to:
- Search and read issues, projects, and cycles
- Create new issues with proper labels and assignments
- Update issue statuses and priorities
- Browse team workflows and backlogs
- Help with sprint planning and ticket grooming

## Prerequisites

1. Authenticate via the browser-based OAuth flow when prompted (the server will open a browser window)
2. Ensure you have the appropriate permissions in your Linear workspace

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"]
    }
  }
}
```

## Claude Code command

```bash
claude mcp add linear npx -y @linear/mcp-server
```

## Tips

- Ask "create a bug ticket for the login timeout issue" to quickly file issues without leaving your editor
- Have the AI read a Linear ticket and start implementing it right away
- Use "what are my assigned issues this sprint?" to plan your day
- Combine with the GitHub MCP: the AI can read a Linear ticket, write the code, and open a PR referencing the issue
- Great for backlog grooming: "list all unestimated tickets in the current cycle"
