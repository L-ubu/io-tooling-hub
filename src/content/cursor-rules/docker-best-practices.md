---
title: "Docker Best Practices"
description: "Cursor rule for writing efficient, secure Dockerfiles and container orchestration patterns."
author: "Luca"
tags: ["docker", "devops", "containers"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to produce optimized, secure Docker configurations with proper multi-stage builds, caching strategies, and production-ready patterns.

## Setup

Copy into `.cursor/rules/docker.mdc` in your project.

## Rule Content

````markdown
# Docker Best Practices

## Multi-Stage Builds
- Always use multi-stage builds to keep final images small:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```
- Name each stage clearly: `builder`, `runner`, `deps`, `test`
- Copy only what is needed into the final stage — never copy the entire build context

## Layer Caching
- Order Dockerfile instructions from least to most frequently changing
- Copy dependency manifests first, install, then copy source code:
  ```dockerfile
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  COPY . .
  ```
- Use `.dockerignore` to exclude `node_modules`, `.git`, `.env`, `dist`, and test files from the build context
- Pin base image versions with a specific tag or SHA digest — never use `latest`

## Security
- Run the application as a non-root user:
  ```dockerfile
  RUN addgroup -S appgroup && adduser -S appuser -G appgroup
  USER appuser
  ```
- Never store secrets in the image or Dockerfile — use build-time secrets (`--mount=type=secret`) or runtime environment variables
- Scan images for vulnerabilities in CI with `trivy` or `docker scout`
- Use minimal base images: prefer `alpine` or `distroless` variants
- Set `HEALTHCHECK` instructions for production containers:
  ```dockerfile
  HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
  ```

## Compose Patterns
- Use `docker-compose.yml` for local development with all dependent services:
  ```yaml
  services:
    app:
      build: .
      ports:
        - "3000:3000"
      environment:
        - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
      depends_on:
        db:
          condition: service_healthy
    db:
      image: postgres:16-alpine
      environment:
        POSTGRES_PASSWORD: postgres
        POSTGRES_DB: app
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U postgres"]
        interval: 5s
        timeout: 3s
        retries: 5
      volumes:
        - pgdata:/var/lib/postgresql/data
  volumes:
    pgdata:
  ```
- Use `depends_on` with health checks to control startup order
- Use named volumes for persistent data — never bind-mount into production containers

## Image Optimization
- Keep images under 200MB where possible — check with `docker images`
- Remove package manager caches in the same `RUN` layer:
  ```dockerfile
  RUN apk add --no-cache curl
  ```
- Combine related `RUN` instructions to reduce layers
- Use `COPY --link` (BuildKit) for better cache efficiency when copying files
- Set meaningful labels for image metadata:
  ```dockerfile
  LABEL org.opencontainers.image.source="https://github.com/org/repo"
  LABEL org.opencontainers.image.version="1.0.0"
  ```

## Environment Configuration
- Use `ENV` for non-sensitive defaults, override with runtime `-e` flags
- Use `ARG` for build-time variables (e.g., `NODE_ENV`, build version)
- Always set `NODE_ENV=production` in the runner stage
- Expose the correct port with `EXPOSE` for documentation — it does not publish the port
````
