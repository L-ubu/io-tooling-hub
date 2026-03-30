---
title: "Playwright MCP Server"
description: "Run browser automation and end-to-end tests with Playwright through your AI assistant. Navigate pages, interact with elements, and capture screenshots."
author: "Luca"
tags: ["playwright", "browser", "testing", "e2e", "automation"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @anthropic/playwright-mcp-server"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=playwright&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBhbnRocm9waWMvcGxheXdyaWdodC1tY3Atc2VydmVyIl19Cg=="
---

## What it does

Gives your AI assistant a full Playwright-powered browser to interact with web pages:
- Navigate to any URL and interact with page elements
- Take screenshots for visual verification
- Click buttons, fill inputs, and submit forms
- Extract page content and accessibility snapshots
- Run complex multi-step browser workflows

Built on Playwright, it provides more reliable element targeting and cross-browser support compared to Puppeteer-based alternatives.

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/playwright-mcp-server"]
    }
  }
}
```

## Claude Code command

```bash
claude mcp add playwright npx -y @anthropic/playwright-mcp-server
```

## Tips

- Ask "open localhost:3000 and screenshot the homepage" to visually verify your local dev environment
- Use it for quick QA: "navigate through the checkout flow and tell me if anything looks broken"
- The AI uses accessibility snapshots by default, which makes element targeting fast and reliable
- Great for generating end-to-end test scripts: "navigate the login flow and generate a Playwright test for it"
- Combine with the Figma MCP to compare your live implementation against the design
- Works in headless mode by default, keeping things fast and non-intrusive
