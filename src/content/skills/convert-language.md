---
title: "Convert Between Languages"
description: "Convert code from one programming language to another while preserving logic, adapting to idiomatic patterns, and handling ecosystem differences."
author: "Luca"
tags: ["conversion", "migration", "polyglot"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill converts source code from one programming language to another. It goes beyond a naive line-by-line translation: it adapts the code to the target language's idioms, standard library, error handling patterns, and type system. A Python script becomes idiomatic Go, not Go that reads like Python. It handles differences in concurrency models, collection types, null safety, and dependency ecosystems.

## How to use

1. Paste the source code you want to convert.
2. Specify the source and target languages.
3. Optionally mention any target framework or library preferences (e.g., "use Axios instead of fetch" or "use the standard library only").
4. Run the prompt and review the output for correctness and idiom.

For large codebases, convert one module at a time and validate each conversion before moving on.

## The Skill/Prompt

````markdown
You are an expert polyglot developer. Convert the following code from one language to another, producing idiomatic output.

**Source language:** {{SOURCE_LANGUAGE}}
**Target language:** {{TARGET_LANGUAGE}}
**Target framework/library preferences (optional):** {{PREFERENCES}}

**Source code:**
```
{{PASTE_YOUR_CODE_HERE}}
```

**Conversion requirements:**

1. **Preserve behavior**: The converted code must produce the same outputs for the same inputs. Document any behavioral differences that are unavoidable due to language semantics.

2. **Use idiomatic patterns**:
   - Error handling: exceptions vs. error returns vs. Result types — use what is natural in the target language
   - Collections: use the target language's standard collection types and iteration patterns
   - Concurrency: map threads/async/goroutines to the target equivalent
   - Null safety: adapt to Option/Maybe types, nullable annotations, or nil checks as appropriate

3. **Map dependencies**: For each external dependency in the source, suggest the equivalent library in the target ecosystem. If no equivalent exists, implement the functionality inline and mark it with a TODO.

4. **Preserve structure**: Keep the same logical organization (functions, classes, modules) unless the target language strongly favors a different structure.

5. **Add conversion notes**: At the top of the output, add comments listing:
   - Any semantic differences between the source and target versions
   - Dependencies that need to be installed
   - Configuration or build setup required

Output the converted code in a single code block, ready to use.
````

## Tips

- **Test both versions**: Run the original and converted code with the same inputs to verify identical behavior. Differences in floating-point handling, string encoding, or sort stability can cause subtle mismatches.
- **Handle ecosystem gaps**: Some libraries have no direct equivalent. When the AI marks a TODO, evaluate whether to find a third-party package or implement the functionality yourself.
- **Watch for concurrency differences**: Async/await in JavaScript is fundamentally different from goroutines in Go or threading in Python. Review concurrent sections carefully.
- **Convert tests too**: Run the "Generate Tests from Code" skill on the original code, then convert those tests along with the source. This gives you an automatic validation suite.
- **Iterate on idiom**: The first pass may be correct but not idiomatic. Ask the AI to review the output for "code that looks like {{source language}} written in {{target language}}" and fix those spots.
