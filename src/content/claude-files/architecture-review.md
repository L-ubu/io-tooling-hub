---
title: "Architecture Review"
description: "Instruction file that guides Claude Code through a comprehensive architecture review covering structure, dependencies, scalability, and maintainability."
author: "Luca"
tags: ["claude-code", "architecture", "review"]
difficulty: "advanced"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "claude-file"
installTarget: ["claude-code"]
downloadFile: "CLAUDE-ARCHITECTURE.md"
---

## What it does

Drop this file into your repo and ask Claude Code to review the architecture. It will examine your project structure, dependency graph, separation of concerns, and potential scaling issues, then produce a structured report with actionable recommendations.

## File Content

````markdown
# Architecture Review Guidelines

When asked to review the architecture of a project, follow this framework:

## 1. Project Structure
- Is the folder structure logical and consistent?
- Are concerns separated (UI, business logic, data access)?
- Can a new developer navigate the codebase without a guide?

## 2. Dependency Analysis
- Are external dependencies up to date and actively maintained?
- Is the dependency count justified or is there bloat?
- Are internal dependencies flowing in the right direction (no circular imports)?
- Is there a clear boundary between framework code and business logic?

## 3. Data Flow
- Is state management predictable and traceable?
- Are API contracts well-defined (types, validation, error shapes)?
- Is data fetched at the right level of the component tree?
- Are side effects contained and testable?

## 4. Scalability
- Will the current approach handle 10x traffic or data volume?
- Are there obvious bottlenecks (N+1 queries, blocking I/O, large payloads)?
- Is caching used where appropriate?
- Can components or services be scaled independently?

## 5. Maintainability
- Is the code testable without excessive mocking?
- Are patterns consistent across the codebase?
- Is configuration externalized (env vars, config files)?
- Is there adequate error handling and logging?

## Output Format
Produce a report with:
1. **Summary**: One paragraph overview
2. **Strengths**: What is working well
3. **Concerns**: Issues ranked by severity (critical, moderate, minor)
4. **Recommendations**: Concrete next steps with effort estimates
````

## Tips

- This works best on entire repositories. Run `claude "review the architecture of this project"` from the project root.
- For large codebases, scope the review by asking about a specific layer: "review the data access architecture" or "review the frontend component structure."
- Pair with the refactoring guide to act on the recommendations immediately.
