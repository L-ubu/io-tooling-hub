---
title: "Figma MCP Server"
description: "Give your AI assistant read access to Figma designs. Extract layout information, styles, and component structures to speed up design-to-code workflows."
author: "Luca"
tags: ["figma", "design", "ui", "frontend", "design-to-code"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @anthropic/figma-mcp-server"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=figma&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBhbnRocm9waWMvZmlnbWEtbWNwLXNlcnZlciJdLCJlbnYiOnsiRklHTUFfQUNDRVNTX1RPS0VOIjoieW91ci10b2tlbiJ9fQo="
externalUrl: "https://github.com/anthropics/figma-mcp-server"
---

## What it does

Gives your AI assistant read access to your Figma files, enabling it to:
- Read design file structures, frames, and components
- Extract layout properties, colors, typography, and spacing
- Understand component hierarchies and auto-layout settings
- Translate designs into code by reading the actual design specs

This bridges the gap between design and development, letting the AI generate code that closely matches your Figma mockups.

## Prerequisites

1. Go to your Figma account settings at [figma.com/settings](https://www.figma.com/settings)
2. Scroll to **Personal access tokens** and generate a new token
3. Grant the token read access to the files you want the AI to inspect

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "<your-figma-token>"
      }
    }
  }
}
```

## Claude Code command

```bash
claude mcp add figma -e FIGMA_ACCESS_TOKEN=your-token -- npx -y @anthropic/figma-mcp-server
```

## Tips

- Paste a Figma frame URL and ask "implement this design as a React component"
- Great for pixel-perfect implementations: the AI reads exact spacing, colors, and font sizes from the design
- Ask "compare my current component to the Figma design" to catch visual discrepancies
- Works best when Figma files use auto-layout and design tokens consistently
- Combine with the Playwright MCP to screenshot your implementation and compare it visually with the design
