---
title: "Notion MCP Server"
description: "Access Notion pages, databases, and wikis from your AI assistant. Search documentation, read specs, and manage content without switching context."
author: "Luca"
tags: ["notion", "documentation", "wiki", "knowledge-base", "productivity"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @notionhq/mcp-server"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=notion&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBub3Rpb25ocS9tY3Atc2VydmVyIl0sImVudiI6eyJOT1RJT05fQVBJX0tFWSI6InlvdXIta2V5In19Cg=="
---

## What it does

Connects your AI assistant to your Notion workspace, enabling it to:
- Search across pages and databases
- Read page content, including nested blocks
- Query databases with filters and sorts
- Create and update pages
- Access your team's documentation and wikis directly

## Prerequisites

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create a new integration
2. Copy the **Internal Integration Secret** (starts with `ntn_`)
3. Share the Notion pages or databases you want the AI to access with your integration (click "..." on a page, then "Connections", then add your integration)

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server"],
      "env": {
        "NOTION_API_KEY": "<your-notion-integration-secret>"
      }
    }
  }
}
```

## Claude Code command

```bash
claude mcp add notion -e NOTION_API_KEY=ntn_your-secret -- npx -y @notionhq/mcp-server
```

## Tips

- Ask "search Notion for our API design guidelines" to quickly find internal documentation
- Have the AI read a product spec from Notion and then implement it directly
- Use it to keep documentation in sync: "update the Notion architecture page with the new auth flow"
- Query Notion databases for project tracking: "list all open RFCs in the engineering database"
- Remember to share each page or database with your integration -- it cannot access unshared content
