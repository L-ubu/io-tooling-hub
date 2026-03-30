---
title: "Sentry MCP Server"
description: "Connect your AI assistant to Sentry for real-time error tracking, issue investigation, and stack trace analysis directly in your editor."
author: "Luca"
tags: ["sentry", "errors", "monitoring", "debugging", "observability"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @sentry/mcp-server"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=sentry&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzZW50cnkvbWNwLXNlcnZlciJdfQo="
externalUrl: "https://docs.sentry.io/organization/integrations/ai-tools/"
---

## What it does

Gives your AI assistant direct access to your Sentry error tracking data, enabling it to:
- Search and list recent errors and issues
- Read full stack traces and error context
- Analyze error frequency and trends
- Help diagnose and fix bugs by correlating errors with code
- Retrieve breadcrumbs and event metadata for debugging

## Prerequisites

1. A Sentry account with an active project
2. Authenticate via the browser-based OAuth flow when prompted (the server will open a browser window)

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"]
    }
  }
}
```

## Claude Code command

```bash
claude mcp add sentry npx -y @sentry/mcp-server
```

## Tips

- Ask "what are the top unresolved errors in the frontend project this week?" for a quick health check
- Have the AI read a Sentry stack trace and then look at the relevant code to suggest a fix
- Combine with the GitHub MCP: the AI can find the error in Sentry, locate the code on GitHub, and draft a PR
- Useful during incident response: "summarize all new errors from the last 2 hours"
- Use it in post-mortems to have the AI analyze error patterns leading up to an incident
