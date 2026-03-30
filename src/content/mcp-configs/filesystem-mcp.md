---
title: "Filesystem MCP Server"
description: "Give your AI assistant safe, sandboxed access to read and write files on your local filesystem."
author: "Luca"
tags: ["filesystem", "local", "files", "productivity"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir"
---

## What it does

Provides sandboxed filesystem access to your AI assistant. It can read, write, search, and manage files within directories you explicitly allow.

## Config

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    }
  }
}
```

## Security Note

The server only has access to directories you specify in the args. Always scope it to the minimum necessary directory.
