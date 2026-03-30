---
title: "Refactor to Design Patterns"
description: "Analyze code for structural issues and apply appropriate design patterns to improve maintainability and extensibility."
author: "Luca"
tags: ["refactoring", "patterns", "clean-code"]
difficulty: "advanced"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill examines existing code for common structural problems — long conditionals, duplicated logic, tight coupling, god classes — and recommends specific design patterns to address them. It then produces the refactored code with clear explanations of what changed and why. It covers patterns like Strategy, Factory, Observer, Decorator, Repository, and more, choosing based on the actual problem rather than applying patterns for their own sake.

## How to use

1. Paste the code you suspect could benefit from a design pattern, or point the AI at a file in your project.
2. Optionally describe the pain point you are experiencing (e.g., "adding a new payment method requires changing five files").
3. Run the prompt below.
4. Review the suggested pattern, understand the trade-offs, and apply the refactored code incrementally.

For larger refactors, work module by module rather than trying to restructure everything at once.

## The Skill/Prompt

````markdown
You are a senior software engineer specializing in code design and refactoring. Analyze the following code and suggest design pattern improvements.

**Code to analyze:**
```
{{PASTE_YOUR_CODE_HERE}}
```

**Known pain point (optional):** {{DESCRIBE_THE_PROBLEM}}

**Your analysis should:**

1. **Identify code smells**: List specific problems (e.g., switch/if chains that grow with new types, duplicated validation logic, classes with too many responsibilities).

2. **Recommend patterns**: For each smell, suggest a design pattern that addresses it. Explain:
   - Which pattern and why it fits this specific case
   - What problem it solves here (not a textbook definition)
   - The trade-off: what complexity it adds vs. what flexibility it gives

3. **Show the refactored code**: Produce the full refactored implementation with:
   - Clear file/class separation
   - Inline comments marking where the pattern is applied
   - A migration note explaining how to transition from the old code

4. **Provide a before/after comparison**: Summarize what changed and how the new structure handles the pain point better (e.g., "adding a new payment method now requires only adding one new class").

**Rules:**
- Do NOT apply patterns just for elegance. Every suggestion must solve a concrete problem.
- Prefer simplicity. If the code is fine as-is, say so.
- Consider the language's idioms (e.g., prefer composition in Go, use protocols in Python).
````

## Tips

- **Name the pain**: Providing a concrete pain point ("every new report type requires editing three files") helps the AI pick the right pattern rather than defaulting to generic advice.
- **One pattern at a time**: If multiple patterns are suggested, apply them in separate commits so you can test each refactor independently.
- **Watch for over-engineering**: If the codebase is small and unlikely to grow in the dimension the pattern addresses, the refactor may not be worth it. Use your judgment.
- **Test first**: Make sure you have good test coverage before refactoring. Run the "Generate Tests from Code" skill first if needed.
- **Learn the patterns**: The explanations in the output are a great learning tool. Save them for team knowledge sharing.
