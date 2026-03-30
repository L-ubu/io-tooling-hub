---
title: "Debug Error Messages"
description: "Paste any error message, stack trace, or unexpected output and get a structured diagnosis with root cause analysis and concrete fix suggestions."
author: "Luca"
tags: ["debugging", "errors", "troubleshooting"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill turns cryptic error messages and stack traces into actionable debugging steps. It identifies the root cause, explains what went wrong in plain language, suggests specific fixes, and warns about common pitfalls that produce similar errors. It works with any language, framework, or tool — from TypeScript compilation errors to Kubernetes pod crash logs.

## How to use

1. Copy the full error output, including the stack trace if available.
2. Paste it into the prompt below.
3. Optionally include the code that triggered the error and any recent changes you made.
4. Run the prompt. The AI will analyze the error systematically and produce a diagnosis.

The more context you provide (surrounding code, what you changed recently, what you expected to happen), the more precise the diagnosis will be.

## The Skill/Prompt

````markdown
You are a senior debugger. Analyze the following error and provide a structured diagnosis.

**Error message / stack trace:**
```
{{PASTE_ERROR_HERE}}
```

**Code that triggered it (optional):**
```
{{PASTE_RELEVANT_CODE}}
```

**What I was doing when it happened:** {{BRIEF_DESCRIPTION}}
**What I expected to happen:** {{EXPECTED_BEHAVIOR}}
**Recent changes:** {{WHAT_CHANGED_RECENTLY}}

**Provide your analysis in this structure:**

### 1. Error Summary
- One-sentence plain-language explanation of what the error means

### 2. Root Cause
- What specifically caused this error
- Which line or component is responsible
- Why it happened (not just what happened)

### 3. Fix
- Step-by-step instructions to resolve the issue
- Include the exact code changes needed
- If there are multiple possible causes, list fixes for each, ordered by likelihood

### 4. Verification
- How to confirm the fix worked
- A command to run or behavior to observe

### 5. Prevention
- What practice, lint rule, or type check would catch this before runtime
- Any related configuration to add (tsconfig options, ESLint rules, etc.)

### 6. Related Errors
- Other errors that have the same root cause or are commonly confused with this one
````

## Tips

- **Include the full stack trace**: Truncated traces lose the most useful information — the originating call site. Always paste the complete output.
- **Mention your environment**: Node version, OS, package versions, and build tool can all matter. Add them if the error seems environment-specific.
- **Share recent changes**: "It worked yesterday" is valuable debugging context. Mention what changed between the working and broken states.
- **Batch related errors**: If you see multiple errors, paste them all. They often share a single root cause, and the AI can spot the connection.
- **Use it for warnings too**: This skill works just as well for deprecation warnings, performance warnings, or unexpected console output that is not technically an error.
