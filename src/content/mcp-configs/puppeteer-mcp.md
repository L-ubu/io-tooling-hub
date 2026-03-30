---
title: "Puppeteer MCP Server"
description: "Automate browser interactions with Puppeteer. Navigate pages, take screenshots, fill forms, and scrape content through your AI assistant."
author: "Luca"
tags: ["browser", "automation", "puppeteer", "scraping", "testing"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-puppeteer"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=puppeteer&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItcHVwcGV0ZWVyIl19Cg=="
externalUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer"
---

## What it does

Launches a real browser instance that your AI assistant can control, enabling it to:
- Navigate to URLs and interact with web pages
- Take screenshots of pages or specific elements
- Click buttons, fill forms, and submit data
- Extract text content and page structure
- Debug frontend issues by inspecting live pages

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

## Claude Code command

```bash
claude mcp add puppeteer npx -y @modelcontextprotocol/server-puppeteer
```

## Tips

- Ask "take a screenshot of localhost:3000" to visually verify your local dev server
- Useful for debugging CSS or layout issues: "screenshot the login page and tell me what looks off"
- Can automate repetitive browser tasks like filling out test forms
- The browser runs in headless mode by default -- set `PUPPETEER_HEADLESS=false` in env to watch it in action
- For more robust testing workflows, consider the Playwright MCP server instead
- Be cautious when pointing it at authenticated pages -- avoid exposing credentials
