---
title: "GitLab MCP"
description: "MCP server for GitLab integration: issues, merge requests, pipelines, and repository management"
author: "iO Digital"
tags: ["gitlab", "git", "ci-cd", "mcp"]
difficulty: "beginner"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "mcp"
installCommand: "npx @anthropic/create-mcp --preset gitlab"
---

## Overview

Connect your AI assistant to GitLab for managing repositories, issues, merge requests, and CI/CD pipelines directly from your editor.

## Setup

Add to your MCP config (`.cursor/mcp.json` or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gitlab"],
      "env": {
        "GITLAB_TOKEN": "<your-gitlab-personal-access-token>",
        "GITLAB_URL": "https://gitlab.com"
      }
    }
  }
}
```

## Token Setup

1. Go to GitLab > Preferences > Access Tokens
2. Create a personal access token with scopes: `api`, `read_repository`, `write_repository`
3. For self-hosted GitLab, update `GITLAB_URL` to your instance URL

## Capabilities

- **Issues**: create, list, search, comment on, and close issues
- **Merge Requests**: create MRs, review diffs, approve, and merge
- **Pipelines**: view pipeline status, trigger pipelines, read job logs
- **Repository**: browse files, read file contents, search code
- **Projects**: list projects, view project details and members

## Usage Examples

- "Create a merge request from my current branch to main"
- "List all open issues assigned to me in project X"
- "Show the last failed pipeline and its job logs"
- "Search for all files containing the database connection string"
