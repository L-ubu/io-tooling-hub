---
title: "Performance Optimization Audit"
description: "Analyze code for performance bottlenecks, memory leaks, unnecessary re-renders, and inefficient algorithms, with prioritized optimization recommendations."
author: "Luca"
tags: ["performance", "optimization", "audit"]
difficulty: "advanced"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill performs a systematic performance review of your code. It identifies algorithmic inefficiencies, memory issues, unnecessary computation, N+1 queries, unoptimized renders, and resource leaks. Each finding includes an explanation of the impact, a severity rating, and a concrete fix with before/after code. Findings are prioritized by impact so you fix the biggest bottlenecks first.

## How to use

1. Paste the code you want audited, or point the AI at a module in your project.
2. Specify the runtime environment (Node.js server, React frontend, Python data pipeline, etc.) so the AI applies relevant heuristics.
3. Run the prompt.
4. Review the findings, implement the high-priority fixes first, and measure the impact before moving on.

For best results, share any profiling data you have (flame graphs, slow query logs, Lighthouse scores). This helps the AI focus on confirmed bottlenecks rather than theoretical ones.

## The Skill/Prompt

````markdown
You are a performance engineer conducting a code audit. Analyze the following code for performance issues.

**Code to audit:**
```
{{PASTE_YOUR_CODE_HERE}}
```

**Runtime environment:** {{NODE_SERVER / REACT_FRONTEND / PYTHON_API / OTHER}}
**Known performance symptoms (optional):** {{e.g., "API response times spike under load", "page takes 4s to become interactive"}}
**Profiling data (optional):** {{PASTE_OR_DESCRIBE_PROFILING_RESULTS}}

**For each issue found, provide:**

1. **Issue**: One-line description
2. **Severity**: Critical / High / Medium / Low
3. **Impact**: What this costs in terms of time, memory, or user experience
4. **Location**: Which lines or functions are affected
5. **Explanation**: Why this is slow and how the current approach works
6. **Fix**: The optimized code with an explanation of why it is faster
7. **Expected improvement**: Rough estimate of the performance gain

**Categories to check:**

- **Algorithmic complexity**: O(n^2) or worse where O(n) or O(n log n) is possible
- **Memory**: Unbounded caches, large object cloning, memory leaks from unclosed resources
- **I/O**: Sequential operations that could be parallel, missing caching, N+1 queries
- **Rendering** (frontend): Unnecessary re-renders, layout thrashing, large bundle sizes, unoptimized images
- **Data structures**: Using arrays where sets or maps would be faster for lookups
- **Serialization**: Redundant JSON.parse/stringify, large payload transfers
- **Resource management**: Unclosed connections, missing cleanup in useEffect, leaked event listeners

**Output format**: List findings sorted by severity (critical first), then provide a summary of the top 3 fixes that would have the most impact.
````

## Tips

- **Measure before optimizing**: Profiling data turns guesswork into precision. Run a profiler first and share the results for a much more targeted audit.
- **Fix one thing at a time**: Implement one optimization, measure the improvement, then move on. Batching changes makes it impossible to know what helped.
- **Watch for premature optimization**: Not every O(n^2) loop matters. If n is always 10, the readability cost of a more complex algorithm is not worth it.
- **Frontend-specific**: For React, check for missing keys, inline object/function props, and components that re-render without prop changes. Ask the AI to suggest `memo`, `useMemo`, and `useCallback` placements.
- **Backend-specific**: Focus on database queries and I/O first. They are almost always the bottleneck, not CPU-bound code.
