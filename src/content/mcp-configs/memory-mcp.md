---
title: "Memory MCP Server"
description: "Give your AI assistant persistent memory using a local knowledge graph. Store facts, relationships, and context that survive across sessions."
author: "Luca"
tags: ["memory", "knowledge-graph", "persistence", "context"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-memory"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=memory&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItbWVtb3J5Il19Cg=="
externalUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory"
---

## What it does

Provides your AI assistant with a persistent knowledge graph that retains information across conversations:
- Store entities (people, projects, concepts) and their properties
- Define relationships between entities
- Query stored knowledge in future sessions
- Build up a growing understanding of your codebase and preferences over time

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## Claude Code command

```bash
claude mcp add memory npx -y @modelcontextprotocol/server-memory
```

## Tips

- Tell your AI "remember that our API uses camelCase for all response fields" to persist project conventions
- Great for onboarding: have the AI store key architecture decisions as you explain them
- Ask "what do you know about our auth system?" to recall previously stored information
- The knowledge graph is stored locally in a JSON file -- you can back it up or share it with your team
- Use it to maintain a living architecture document that the AI can reference and update
- Pair with the GitHub MCP so the AI can cross-reference stored knowledge with actual code
