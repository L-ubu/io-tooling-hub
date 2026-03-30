---
title: "Docker Extension"
description: "Manage Docker containers, images, and compose stacks directly from your editor with a visual interface."
author: "Luca"
tags: ["docker", "containers", "devops"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "plugin"
installTarget: ["vscode", "cursor"]
extensionId: "ms-azuretools.vscode-docker"
---

## What it does

The Docker extension adds a dedicated sidebar for browsing running containers, images, networks, and volumes. It provides IntelliSense for Dockerfiles and docker-compose files, one-click container management (start, stop, restart, logs), and the ability to attach a shell or debugger to any running container.

## Install

Install the extension in your editor:
- **VS Code**: `code --install-extension ms-azuretools.vscode-docker`
- **Cursor**: Search "Docker" in the extensions panel (look for the one by Microsoft)

Requires Docker Desktop or Docker Engine to be installed and running on your machine.

## Setup

The extension works out of the box. For docker-compose projects, point it to your compose file:

```json
{
  "docker.dockerComposeBuild": true,
  "docker.dockerComposeDetached": true
}
```

## Tips

- Right-click any container in the sidebar and select "View Logs" to stream logs without switching to a terminal.
- Use "Attach Shell" to open an interactive terminal inside a running container directly from the editor.
- The extension provides syntax highlighting and autocomplete for Dockerfiles, including multi-stage build directives.
- If you use docker-compose, right-click the `docker-compose.yml` file in the explorer and select "Compose Up" to start all services.
