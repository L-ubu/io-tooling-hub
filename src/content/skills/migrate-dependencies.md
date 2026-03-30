---
title: "Migrate Dependencies"
description: "Upgrade or migrate packages that have breaking changes, with step-by-step migration plans and automated code transformations."
author: "Luca"
tags: ["migration", "dependencies", "upgrade"]
difficulty: "advanced"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill helps you navigate breaking changes when upgrading dependencies. Given a package name and the version range you are migrating between, it produces a detailed migration plan: what changed, which of your files are affected, the exact code transformations needed, and a testing checklist. It covers renamed APIs, removed features, changed defaults, and new required configuration.

## How to use

1. Identify the dependency you need to upgrade and the current vs. target version.
2. Fill in the prompt below with those details.
3. Optionally point the AI at your project so it can scan for actual usage of the deprecated APIs.
4. Run the prompt and follow the step-by-step migration plan.

For major framework upgrades (e.g., Next.js 14 to 15, React Router v5 to v6), run this per-package rather than trying to upgrade everything simultaneously.

## The Skill/Prompt

````markdown
You are a migration specialist. Help me upgrade a dependency with breaking changes.

**Package:** {{PACKAGE_NAME}}
**Current version:** {{CURRENT_VERSION}}
**Target version:** {{TARGET_VERSION}}
**Project language/framework:** {{e.g., TypeScript + React, Python + Django}}

**Steps to perform:**

1. **Changelog analysis**: Summarize every breaking change between the current and target versions. For each breaking change, explain:
   - What was the old behavior
   - What is the new behavior
   - Why the change was made

2. **Impact assessment**: Scan the project for usage of affected APIs. List each file and line that needs to change. If you cannot scan the project, list the API surfaces to search for with grep commands.

3. **Migration plan**: Provide an ordered list of steps. For each step:
   - The file(s) to change
   - The old code pattern
   - The new code pattern
   - A brief explanation

4. **Configuration changes**: Any new required config (tsconfig, babel, webpack, vite, environment variables).

5. **Peer dependency updates**: Other packages that need to be updated simultaneously to maintain compatibility.

6. **Testing checklist**: Specific behaviors to test after the migration, focusing on areas where the breaking changes could cause subtle bugs.

7. **Rollback plan**: How to safely revert if something goes wrong (branch strategy, version pinning).

**Rules:**
- Be specific to the exact version range. Do not include changes from versions outside the range.
- If an official codemod or migration CLI exists, mention it first.
- Prefer incremental migration over big-bang rewrites.
````

## Tips

- **Read the official migration guide first**: If one exists, paste its URL into the prompt. The AI will cross-reference it with your actual codebase usage.
- **Migrate one major dependency at a time**: Upgrading React, your router, and your state management library simultaneously makes it impossible to isolate which change broke something.
- **Use codemods when available**: Many popular libraries ship migration CLIs (e.g., `next-codemod`, `react-codemod`). These handle the mechanical changes and let you focus on the nuanced ones.
- **Pin and test**: After migrating, pin the exact version in your lockfile and run your full test suite before merging.
- **Track progress**: For large migrations, create a checklist issue and check off each file as you update it.
