---
title: "Debugging Instructions"
description: "A Claude Code instruction file that guides structured debugging sessions, helping you isolate and fix bugs methodically."
author: "Luca"
tags: ["claude-code", "debugging", "troubleshooting"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-DEBUG.md"
---

## What it does

Drop this file into your project root and Claude Code will follow a structured debugging workflow whenever you ask it to help fix a bug. Instead of jumping to conclusions, it walks through reproduction, isolation, root cause analysis, and verification steps.

## File Content

````markdown
# Debugging Instructions

When asked to debug an issue, follow this structured approach:

## 1. Reproduce
- Confirm the exact steps to reproduce the bug
- Note the expected vs actual behavior
- Identify the environment (browser, Node version, OS)

## 2. Isolate
- Find the smallest reproducible case
- Check if the issue is in our code or a dependency
- Use git bisect or recent commits to narrow the timeframe

## 3. Diagnose
- Read the error message and stack trace carefully
- Check logs at all levels (browser console, server, database)
- Add temporary logging if needed to trace data flow
- Verify assumptions about input data and state

## 4. Fix
- Make the minimal change that addresses the root cause
- Avoid band-aid fixes that mask the real problem
- Consider edge cases the fix might introduce

## 5. Verify
- Confirm the original reproduction case now passes
- Run the existing test suite to check for regressions
- Add a test that covers this specific bug to prevent recurrence
````

## Tips

- Pair this with the testing instructions file so Claude Code automatically writes a regression test after each fix.
- Works best when you paste the error message or stack trace directly into your prompt.
- For frontend bugs, include the browser and relevant console output for more targeted debugging.
