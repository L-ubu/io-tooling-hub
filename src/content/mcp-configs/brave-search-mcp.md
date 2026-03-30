---
title: "Brave Search MCP Server"
description: "Enable web search capabilities in your AI assistant using the Brave Search API for real-time information retrieval."
author: "Luca"
tags: ["search", "web", "brave", "research"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-brave-search"
---

## What it does

Lets your AI assistant search the web in real-time using Brave Search. Perfect for:
- Looking up current documentation
- Researching error messages
- Finding latest package versions
- Checking API status pages

## Prerequisites

1. Get a free API key at [brave.com/search/api](https://brave.com/search/api/)
2. Free tier includes 2,000 queries/month

## Config

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<your-api-key>"
      }
    }
  }
}
```
