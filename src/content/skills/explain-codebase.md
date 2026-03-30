---
title: "Explain Codebase Architecture"
description: "Ask AI to analyze an entire codebase and produce a clear architectural overview with diagrams, dependency maps, and onboarding notes."
author: "Luca"
tags: ["documentation", "architecture", "onboarding"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill guides the AI to explore a codebase systematically and produce a structured architectural document. It covers the project's directory layout, key modules, data flow, external dependencies, and design decisions. The output is perfect for onboarding new team members, writing architecture decision records, or simply understanding an unfamiliar project you just inherited.

## How to use

1. Open the project root in Cursor or navigate to it in Claude Code.
2. Run the prompt below. The AI will read directory structures, key files, and configuration to build its understanding.
3. Optionally scope it to a specific subsystem by replacing the placeholder (e.g., "focus on the authentication module").
4. Review the output and ask follow-up questions to drill into specific areas.

This works best when the AI has access to the full project file tree. In Claude Code, it can read files directly. In Cursor, ensure the workspace is open at the project root.

## The Skill/Prompt

````markdown
You are a senior software architect performing a codebase review. Analyze this project and produce a comprehensive architectural overview.

**Focus area (optional):** {{ENTIRE_PROJECT_OR_SPECIFIC_MODULE}}

**Steps to follow:**
1. Examine the directory structure and identify the top-level organization pattern (monorepo, feature-based, layer-based, etc.)
2. Read package.json / requirements.txt / go.mod / Cargo.toml (whichever applies) to understand dependencies and scripts
3. Identify the entry points (main files, route definitions, CLI commands)
4. Trace the request/data flow from entry point through the major layers
5. Identify shared utilities, middleware, and cross-cutting concerns

**Produce the following sections:**

### 1. Project Overview
- Purpose, tech stack, and runtime environment
- Build and deployment tooling

### 2. Directory Structure
- Explain what each top-level directory contains and why

### 3. Architecture Diagram
- ASCII or Mermaid diagram showing major components and their relationships

### 4. Key Modules
- For each major module: purpose, public API, and dependencies

### 5. Data Flow
- How a typical request/action flows through the system end-to-end

### 6. External Dependencies
- Notable third-party libraries and why they are used

### 7. Patterns & Conventions
- Design patterns in use, naming conventions, error handling strategy

### 8. Potential Concerns
- Areas of technical debt, tight coupling, or missing abstractions
````

## Tips

- **Start broad, then zoom in**: Run it once for the whole project, then re-run with a focus area for modules that need deeper explanation.
- **Feed it context**: If there are architecture decision records (ADRs) or existing docs, mention them so the AI can reference and validate against them.
- **Use Mermaid output**: Ask specifically for Mermaid diagrams if your documentation platform renders them (GitHub, Notion, Confluence all support Mermaid).
- **Compare over time**: Re-run this skill periodically and diff the output to spot architectural drift.
- **Pair with onboarding**: Share the generated overview with new joiners and ask them to flag anything that is still unclear — then feed that feedback back into the prompt.
