---
title: "Git Commit Message Conventions"
description: "Cursor rule enforcing conventional commit messages with proper scope, type, and breaking change formatting."
author: "Luca"
tags: ["git", "conventions", "workflow"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to generate git commit messages following the Conventional Commits specification, ensuring consistent and parseable commit history.

## Setup

Copy into `.cursor/rules/git-commits.mdc` in your project.

## Rule Content

````markdown
# Git Commit Message Conventions

Follow the Conventional Commits specification (https://www.conventionalcommits.org). This enables automatic changelog generation, semantic versioning, and a readable git history.

## Message Format
Every commit message must follow this structure:
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```
- The first line (header) must not exceed 72 characters
- The body and footer are separated from the header and from each other by a blank line
- Wrap body text at 80 characters per line

## Commit Types

| Type       | When to use                                                  | SemVer impact |
|------------|--------------------------------------------------------------|---------------|
| `feat`     | A new feature or capability visible to users                 | MINOR         |
| `fix`      | A bug fix                                                    | PATCH         |
| `docs`     | Documentation-only changes (README, JSDoc, comments)         | None          |
| `style`    | Code style changes (formatting, whitespace, semicolons)      | None          |
| `refactor` | Code restructuring that neither fixes a bug nor adds a feature | None        |
| `perf`     | A change that improves performance                           | PATCH         |
| `test`     | Adding, updating, or fixing tests                            | None          |
| `build`    | Changes to build system, bundler config, or dependencies     | None          |
| `ci`       | Changes to CI/CD configuration and scripts                   | None          |
| `chore`    | Maintenance tasks that do not touch src or test files         | None          |
| `revert`   | Reverts a previous commit                                    | Varies        |

## Scope
- Scope is a short noun in parentheses describing the area of the codebase affected
- Scope is optional but recommended, especially in larger projects
- Use consistent, lowercase scope names across the project

Common scope examples by project area:
```
feat(auth): add OAuth2 login with Google provider
fix(api): handle null response from payment gateway
docs(readme): add deployment instructions
refactor(db): extract connection pooling into utility
test(checkout): add e2e tests for guest checkout flow
build(deps): update React to v19
ci(github): add caching to Node.js CI workflow
style(lint): apply new Prettier config
perf(images): add lazy loading to product gallery
chore(scripts): add database seed script
```

Suggested scopes (adapt to your project):
- `auth`, `api`, `ui`, `db`, `config`, `deps`, `router`, `store`
- `checkout`, `dashboard`, `profile`, `search`, `notifications`
- Use the module or feature name. If a change spans many modules, omit the scope

## Subject Line Rules
- Use imperative, present tense: "add" not "added" or "adds"
- Do not capitalize the first letter of the subject
- Do not end the subject with a period
- Be specific: "fix login redirect loop" not "fix bug"
- Maximum 72 characters for the entire header line (type + scope + subject)

## Body Format
- Separate from subject with a blank line
- Explain **why** the change was made, not just what changed (the diff shows what)
- Explain how the behavior differs from the previous implementation when relevant
- Wrap lines at 80 characters
- Use bullet points for multiple items:
  ```
  feat(auth): add rate limiting to login endpoint

  Brute force login attempts were detected in production logs.
  This change adds progressive rate limiting:

  - 5 failed attempts: 30 second cooldown
  - 10 failed attempts: 5 minute lockout
  - 20 failed attempts: account locked, requires email verification

  Rate limit state is stored in Redis with a 1-hour TTL.
  ```

## Footer Format
- Used for metadata: issue references, breaking changes, co-authors
- Each footer is a `token: value` or `token #value` pair
- Common footer tokens:
  ```
  Closes #123
  Fixes #456
  Refs #789
  BREAKING CHANGE: description of the breaking change
  Reviewed-by: Name <email>
  Co-authored-by: Name <email>
  ```
- Multiple footers are allowed:
  ```
  fix(api): correct pagination offset calculation

  The offset was calculated as (page * size) instead of ((page - 1) * size),
  causing the first item of each page to duplicate the last item of the
  previous page.

  Fixes #234
  Reviewed-by: Jane Doe <jane@example.com>
  ```

## Breaking Changes
- Add `!` after the type/scope to flag a breaking change in the header:
  ```
  feat(api)!: change authentication to use Bearer tokens
  ```
- Always include a `BREAKING CHANGE:` footer that explains what changed and how to migrate:
  ```
  feat(api)!: remove v1 user endpoints

  The v1 user endpoints have been deprecated since March 2025 and are now
  removed. All consumers must migrate to the v2 API.

  BREAKING CHANGE: The /api/v1/users/* endpoints have been removed.
  Migrate to /api/v2/users which returns a paginated response format:
  { data: User[], meta: { page, pageSize, total } }

  Before: GET /api/v1/users -> User[]
  After:  GET /api/v2/users?page=1&pageSize=20 -> { data: User[], meta: {...} }
  ```
- Breaking changes always result in a MAJOR version bump in SemVer

## Good vs Bad Commit Messages

Good examples:
```
feat(search): add fuzzy matching for product search

fix(checkout): prevent duplicate order submission on double-click

refactor(auth): extract JWT validation into shared middleware

The same JWT validation logic was duplicated across 4 route handlers.
Extract it into a shared middleware to ensure consistent token handling
and make it easier to update the validation rules.

perf(dashboard): lazy-load chart components to reduce initial bundle size

Reduces the initial JS bundle from 450KB to 280KB by code-splitting
the chart library, which is only used on the analytics tab.

docs(api): document rate limiting headers in API reference
```

Bad examples:
```
fix stuff                           # No type, vague description
feat: Changes                       # Capitalized, completely vague
updated tests                       # No type, past tense
feat(auth): Add new feature.        # Capitalized, period at end, vague
WIP                                 # Not a valid commit message
fix: fix the bug in the thing       # Redundant, unspecific
refactor everything                 # No type, too broad
```

## Multi-line Commit Tips
- If you cannot explain the commit in a single subject line, the commit may be too large. Consider splitting it
- A commit should represent one logical change. If you find yourself writing "and" in the subject, split the commit
- Aim for commits that can be individually reverted, cherry-picked, or bisected

## PR Title Conventions
- PR titles should follow the same Conventional Commits format as the subject line:
  ```
  feat(auth): add OAuth2 login with Google provider
  fix(api): handle null response from payment gateway
  ```
- When a PR contains multiple commits, the title should describe the overall change, not list individual commits
- Squash-merged PRs use the PR title as the commit message, so it must be well-formed
- For draft PRs, prefix with `draft:` or use the GitHub draft PR feature rather than adding "WIP" to the title

## Tooling Integration
- Use commitlint with `@commitlint/config-conventional` to enforce these rules in CI:
  ```json
  // .commitlintrc.json
  { "extends": ["@commitlint/config-conventional"] }
  ```
- Use husky to run commitlint as a git hook:
  ```bash
  npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
  ```
- Use `standard-version` or `semantic-release` to automate changelog generation and version bumps from conventional commits
- Configure your IDE/editor to show a vertical ruler at column 72 for the subject line and column 80 for the body
````
