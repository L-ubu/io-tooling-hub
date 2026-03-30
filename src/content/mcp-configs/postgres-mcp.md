---
title: "PostgreSQL MCP Server"
description: "Query and manage PostgreSQL databases directly from your AI assistant. Run read-only queries, inspect schemas, and analyze data without leaving your editor."
author: "Luca"
tags: ["database", "postgresql", "sql", "data"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=postgres&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItcG9zdGdyZXMiLCJwb3N0Z3Jlc3FsOi8vbG9jYWxob3N0L215ZGIiXX0K"
externalUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres"
---

## What it does

Connects your AI assistant directly to a PostgreSQL database, enabling it to:
- Run read-only SQL queries against your database
- Inspect table schemas, indexes, and relationships
- Analyze data patterns and generate reports
- Help debug data issues by querying live data

## Prerequisites

1. A running PostgreSQL instance accessible from your machine
2. A connection string in the format `postgresql://user:password@host:port/database`
3. It is strongly recommended to use a **read-only** database user to prevent accidental data modification

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/mydb"
      ]
    }
  }
}
```

Replace `postgresql://localhost/mydb` with your actual connection string.

## Claude Code command

```bash
claude mcp add postgres npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
```

## Tips

- Always use a read-only database user to prevent accidental writes
- Ask your AI to "describe the schema of the users table" to explore unfamiliar databases
- Great for generating migration scripts by letting the AI inspect current table structures
- You can point it at a staging database to safely explore production-like data
- Combine with the GitHub MCP to have the AI cross-reference code with actual database schemas
