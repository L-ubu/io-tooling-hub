---
title: "Refactoring Guide"
description: "Instruction file that guides Claude Code through safe, incremental refactoring with a focus on preserving behavior and improving readability."
author: "Luca"
tags: ["claude-code", "refactoring", "code-quality"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-REFACTOR.md"
---

## What it does

Place this file in your project and Claude Code will follow a disciplined refactoring process. It focuses on small, safe transformations that keep your tests green at every step, rather than rewriting large sections of code at once.

## File Content

````markdown
# Refactoring Guidelines

When refactoring code, follow these principles:

## Before You Start
- Ensure existing tests pass before making any changes
- Identify the specific code smell or problem you are addressing
- Define a clear goal: reduce duplication, improve naming, simplify logic, etc.

## Safe Refactoring Steps
1. **Extract**: Pull repeated logic into a named function or shared module
2. **Rename**: Use descriptive names that reveal intent, not implementation
3. **Simplify**: Replace nested conditionals with early returns or guard clauses
4. **Inline**: Remove unnecessary abstractions that add indirection without value
5. **Move**: Relocate code to the module where it logically belongs

## Rules
- Make one change at a time; run tests after each change
- Never change behavior and structure in the same commit
- Preserve the public API unless explicitly asked to change it
- Keep functions under 30 lines and files under 300 lines where possible
- Replace magic numbers and strings with named constants

## Common Smells to Address
- Duplicated logic across files
- Functions with more than 3 parameters
- Deeply nested callbacks or conditionals
- God objects or files that handle too many concerns
- Unused imports, variables, or dead code paths
````

## Tips

- Start by asking Claude Code to "identify code smells in this file" before jumping into refactoring.
- Use this alongside the testing instructions file to make sure coverage stays intact during refactoring.
- For large refactors, ask Claude Code to break the work into multiple small commits.
