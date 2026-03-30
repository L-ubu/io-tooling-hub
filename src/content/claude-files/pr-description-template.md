---
title: "PR Description Template"
description: "Instruction file that tells Claude Code how to generate clear, consistent pull request descriptions with context, changes, and testing notes."
author: "Luca"
tags: ["claude-code", "git", "pull-requests"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-PR.md"
---

## What it does

Add this file to your project and ask Claude Code to write a PR description. It will analyze the diff, summarize the changes, and output a structured description ready to paste into GitHub, GitLab, or Azure DevOps.

## File Content

````markdown
# PR Description Guidelines

When asked to write a pull request description, follow this template:

## Title
- Use a short, imperative sentence: "Add user avatar upload" not "Added some avatar stuff"
- Prefix with a type if the team uses conventional commits: feat:, fix:, chore:, docs:

## Description Template

### What
One or two sentences explaining what changed and why.

### Why
Link to the ticket or issue. Explain the business or technical motivation.

### How
Bullet list of the key changes:
- Files added or removed
- Architecture decisions made
- Third-party libraries added

### Testing
- Describe how you tested the changes
- List any manual verification steps
- Note which automated tests cover this

### Screenshots
Include before/after screenshots for UI changes.

### Checklist
- [ ] Tests pass locally
- [ ] No new warnings or lint errors
- [ ] Documentation updated if needed
- [ ] Migration steps documented (if applicable)
````

## Tips

- Run `claude "write a PR description for my staged changes"` and it will read your git diff automatically.
- For best results, make sure your commits have descriptive messages so Claude Code can summarize the overall intent.
- Customize the template sections to match your team's PR review conventions.
