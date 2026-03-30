---
title: "PR Review Assistant"
description: "Automated pull request review workflow that checks for bugs, security issues, style violations, and provides constructive feedback with suggested improvements."
author: "Luca"
tags: ["code-review", "git", "quality"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill provides a structured code review for pull requests. It examines the diff for bugs, security vulnerabilities, performance issues, maintainability concerns, and style inconsistencies. Each piece of feedback is categorized by severity and includes a constructive suggestion with example code. It is designed to catch the things that are easy to miss in manual review while keeping the feedback tone helpful and specific.

## How to use

1. Paste the PR diff or point the AI at a branch in your repository.
2. Optionally include the PR description and any linked issues for context.
3. Run the prompt. The AI will analyze every changed file systematically.
4. Use the output as a starting point for your review — verify the findings and add your own domain-specific feedback.

In Claude Code, you can run `git diff main...HEAD` and pipe the output directly. In Cursor, paste the diff into the prompt.

## The Skill/Prompt

````markdown
You are a thorough but constructive code reviewer. Review the following pull request diff.

**PR title:** {{PR_TITLE}}
**PR description:** {{PR_DESCRIPTION}}
**Related issue:** {{ISSUE_LINK_OR_DESCRIPTION}}

**Diff:**
```diff
{{PASTE_DIFF_OR_RUN_GIT_DIFF}}
```

**Review the diff for:**

### 1. Correctness
- Logic errors, off-by-one mistakes, race conditions
- Missing null/undefined checks
- Incorrect error handling (swallowed errors, wrong error types)
- State mutations that could cause unexpected behavior

### 2. Security
- SQL injection, XSS, path traversal, or other injection vulnerabilities
- Hardcoded secrets or credentials
- Missing input validation or sanitization
- Insecure defaults (CORS, auth, permissions)

### 3. Performance
- Unnecessary database queries or API calls
- Missing pagination on list endpoints
- O(n^2) operations on potentially large datasets
- Memory leaks or unbounded growth

### 4. Maintainability
- Functions that are too long or do too many things
- Magic numbers or strings that should be constants
- Missing or misleading type annotations
- Dead code or unused imports

### 5. Testing
- Are the changes covered by tests?
- Are edge cases tested?
- Are tests testing behavior (good) or implementation details (fragile)?

**For each finding, provide:**
- **File and line**: Where the issue is
- **Severity**: Blocker / Warning / Suggestion / Nitpick
- **Issue**: What is wrong
- **Suggestion**: How to fix it, with a code example if applicable

**End with:**
- A summary of the overall PR quality
- A list of things the PR does well (always include at least one positive note)
````

## Tips

- **Provide context**: The PR description and linked issue help the AI understand intent. Without context, it can only judge the code in isolation.
- **Calibrate severity**: "Blocker" means "this will break production." "Nitpick" means "I prefer it differently but it is fine." Use the output's severity levels to prioritize your review.
- **Do not auto-approve**: This skill is a review assistant, not a replacement for human judgment. It catches mechanical issues; you catch design and domain problems.
- **Use for self-review**: Run this on your own PRs before requesting review. It catches the embarrassing stuff so your reviewers can focus on architecture and design.
- **Combine with CI**: In Claude Code, you can script this to run on every PR as part of a pre-review check. Output the results as a PR comment using `gh pr comment`.
