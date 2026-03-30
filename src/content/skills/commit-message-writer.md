---
title: "Smart Commit Messages"
description: "Generate clear, conventional commit messages from diffs, with proper type prefixes, scopes, and breaking change annotations."
author: "Luca"
tags: ["git", "commits", "automation"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill analyzes a git diff and generates a commit message following the Conventional Commits specification. It determines the correct type (feat, fix, refactor, docs, test, chore, etc.), infers the scope from the changed files, writes a concise subject line, and adds a body that explains the "why" behind the change. It also detects breaking changes and formats them properly with the `BREAKING CHANGE:` footer.

## How to use

1. Stage your changes with `git add`.
2. Run `git diff --cached` to get the staged diff.
3. Paste the diff into the prompt below (or, in Claude Code, let the AI run the command directly).
4. Review the generated message, adjust if needed, and commit.

In Claude Code, you can combine this into a single workflow: the AI reads the diff, generates the message, and creates the commit.

## The Skill/Prompt

````markdown
You are a commit message expert following the Conventional Commits specification. Generate a commit message from the following diff.

**Staged diff:**
```diff
{{PASTE_GIT_DIFF_OR_LET_AI_RUN_git_diff_--cached}}
```

**Additional context (optional):** {{WHY_YOU_MADE_THIS_CHANGE}}

**Rules:**

1. **Format**: Follow Conventional Commits strictly:
   ```
   <type>(<scope>): <subject>

   <body>

   <footer>
   ```

2. **Type**: Choose the most appropriate:
   - `feat` — new feature visible to users
   - `fix` — bug fix
   - `refactor` — code change that neither fixes a bug nor adds a feature
   - `docs` — documentation only
   - `test` — adding or fixing tests
   - `chore` — build, CI, dependencies, tooling
   - `perf` — performance improvement
   - `style` — formatting, whitespace (no logic change)

3. **Scope**: Infer from the changed files (e.g., `auth`, `api`, `ui`, `db`). Omit if changes span too many areas.

4. **Subject line**:
   - Imperative mood ("add", not "added" or "adds")
   - No capitalization of first word
   - No period at the end
   - Maximum 50 characters

5. **Body**:
   - Explain WHY the change was made, not WHAT was changed (the diff shows what)
   - Wrap at 72 characters
   - Use bullet points for multiple reasons
   - Reference related issues if context is provided

6. **Footer**:
   - Add `BREAKING CHANGE: <description>` if the diff changes public API, removes exports, changes function signatures, or alters default behavior
   - Add `Closes #<issue>` if an issue reference is provided

**Output ONLY the commit message, nothing else. No code fences.**
````

## Tips

- **Provide the "why"**: The diff shows what changed, but only you know why. Adding "I made this change because the old approach caused N+1 queries" gives the AI the context to write a meaningful body.
- **Keep commits atomic**: This skill works best when each commit does one thing. If you have unrelated changes staged, split them into separate commits.
- **Review the type**: The AI usually gets it right, but double-check. A change that adds a new API endpoint is `feat`, not `refactor`, even if you also restructured some code along the way.
- **Automate it**: In Claude Code, you can create a custom slash command that runs `git diff --cached`, generates the message, and prompts you to confirm before committing.
- **Use with changelogs**: If your project generates changelogs from commit messages (e.g., with `conventional-changelog`), consistent commit formatting becomes especially valuable.
- **Breaking changes matter**: If you changed a function signature or removed an export, always include the `BREAKING CHANGE` footer. Downstream consumers depend on this information.
