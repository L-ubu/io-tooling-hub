---
title: "Slack MCP Server"
description: "Read and send Slack messages, search conversations, and manage channels directly from your AI assistant."
author: "Luca"
tags: ["slack", "messaging", "communication", "collaboration"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "mcp"
installTarget: ["cursor", "claude-code"]
installCommand: "npx -y @modelcontextprotocol/server-slack"
cursorDeepLink: "cursor://anysphere.cursor-deeplink/mcp/install?name=slack&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZXJ2ZXItc2xhY2siXSwiZW52Ijp7IlNMQUNLX0JPVF9UT0tFTiI6InlvdXItdG9rZW4ifX0K"
externalUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack"
---

## What it does

Gives your AI assistant access to your Slack workspace, enabling it to:
- Read messages from channels and threads
- Post messages and replies
- Search conversation history
- List channels and users
- Summarize long threads or catch you up on missed discussions

## Prerequisites

1. Create a Slack App at [api.slack.com/apps](https://api.slack.com/apps)
2. Add the following Bot Token Scopes:
   - `channels:history` - Read messages in public channels
   - `channels:read` - View basic channel info
   - `chat:write` - Send messages
   - `users:read` - View user profiles
3. Install the app to your workspace
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

## Config

Add to your `.cursor/mcp.json` or Claude Code settings:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "<your-xoxb-token>"
      }
    }
  }
}
```

## Claude Code command

```bash
claude mcp add slack -e SLACK_BOT_TOKEN=xoxb-your-token -- npx -y @modelcontextprotocol/server-slack
```

## Tips

- Ask "summarize the last 20 messages in #engineering" to catch up quickly
- Use it to draft messages before sending: "write a release announcement for v2.3"
- Be mindful of which channels the bot has been invited to -- it can only read channels it has access to
- Combine with other MCPs: have the AI read a GitHub PR, then post a summary to Slack
- Consider limiting write scopes if you only need read access
