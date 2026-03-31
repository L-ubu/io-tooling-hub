---
title: "AWS MCP"
description: "MCP server for AWS services: S3, Lambda, CloudWatch, and infrastructure management from your editor"
author: "iO Digital"
tags: ["aws", "cloud", "infrastructure", "mcp"]
difficulty: "intermediate"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "mcp"
---

## Overview

Interact with AWS services directly from your AI assistant. Query CloudWatch logs, manage S3 buckets, inspect Lambda functions, and troubleshoot infrastructure without leaving your editor.

## Setup

Add to your MCP config (`.cursor/mcp.json` or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "aws": {
      "command": "npx",
      "args": ["-y", "@anthropic/claude-code-mcp-server-aws"],
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "eu-west-1"
      }
    }
  }
}
```

## Prerequisites

- AWS CLI configured with valid credentials (`aws configure`)
- Appropriate IAM permissions for the services you want to access
- Set `AWS_PROFILE` to the correct profile if using multiple AWS accounts

## Capabilities

- **CloudWatch**: query log groups, search log streams, view metrics and alarms
- **S3**: list buckets, browse objects, read file contents, upload files
- **Lambda**: list functions, view configuration, read recent invocation logs
- **ECS**: list clusters, services, and tasks, view task definitions
- **IAM**: inspect roles and policies
- **CloudFormation / CDK**: view stack status, outputs, and resources

## Usage Examples

- "Show me the last 50 error logs from the production API Lambda"
- "List all S3 buckets and their sizes"
- "What CloudWatch alarms are currently in ALARM state?"
- "Show the environment variables for the user-service Lambda"
- "Which ECS services are running in the production cluster?"
