---
title: "Thunder Client"
description: "A lightweight REST API client built into your editor, perfect for testing endpoints without switching to an external tool."
author: "Luca"
tags: ["api", "testing", "rest"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "rangav.vscode-thunder-client"
---

## What it does

Thunder Client is a lightweight alternative to Postman that runs entirely inside your editor. It lets you send HTTP requests, inspect responses, organize requests into collections, and share them with your team via version-controlled JSON files.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension rangav.vscode-thunder-client`
- **Cursor**: Search "Thunder Client" in the extensions panel

After installing, a thunder bolt icon appears in the activity bar.

## Setup

For team collaboration, enable Git-based syncing of your collections:

```json
{
  "thunder-client.saveToWorkspace": true
}
```

This saves all collections and environments into a `thunder-tests` folder in your workspace root, which you can commit to version control.

## Tips

- Use environment variables to switch between local, staging, and production endpoints without editing each request.
- Collections can be exported and imported as JSON, making it easy to share API test suites with teammates.
- Thunder Client supports GraphQL queries -- select "GraphQL" as the body type when creating a request.
- Chain requests together using the "Tests" tab to extract values from one response and inject them into the next.
