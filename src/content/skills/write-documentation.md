---
title: "Auto-Generate Documentation"
description: "Generate comprehensive documentation from source code, including JSDoc comments, README sections, API references, and usage examples."
author: "Luca"
tags: ["documentation", "jsdoc", "readme"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill reads source code and generates multiple forms of documentation: inline JSDoc/docstring comments, API reference pages, usage examples, and getting-started guides. It infers parameter descriptions, return types, side effects, and error conditions from the implementation. The output follows the conventions of your ecosystem — JSDoc for JavaScript, docstrings for Python, GoDoc comments for Go, and so on.

## How to use

1. Paste the code you want documented, or point the AI at a file or directory.
2. Specify which type of documentation you need (inline comments, API reference, usage guide, or all of them).
3. Run the prompt.
4. Review the output, verify the descriptions are accurate, and merge the documentation into your project.

For inline comments (JSDoc/docstrings), the AI will return the code with comments added. For standalone docs, it will produce Markdown files.

## The Skill/Prompt

````markdown
You are a technical writer generating documentation from source code.

**Code to document:**
```
{{PASTE_YOUR_CODE_OR_SPECIFY_FILE_PATH}}
```

**Documentation type:** {{INLINE_COMMENTS / API_REFERENCE / USAGE_GUIDE / ALL}}
**Target audience:** {{DEVELOPERS_USING_THIS_LIBRARY / NEW_TEAM_MEMBERS / END_USERS}}

**Generate the following based on the selected type:**

### Inline Comments (JSDoc / Docstrings)
- Add documentation comments to every exported function, class, method, and type
- Include: description, @param with types and descriptions, @returns, @throws, @example
- For complex parameters (objects, callbacks), document each property
- Add @deprecated tags where applicable with migration notes

### API Reference
- Produce a Markdown document organized by module/class
- For each exported member: signature, description, parameters table, return value, examples
- Include a table of contents at the top
- Note any side effects or important behavioral details

### Usage Guide
- Write a getting-started section with installation and basic setup
- Show 3-5 common use cases with complete, runnable code examples
- Include a troubleshooting section for common mistakes
- Add configuration options if applicable

**Rules:**
- Derive descriptions from the code logic, not generic filler ("This function does what it does")
- Every parameter description should explain what the parameter controls, not just its type
- Examples should be realistic and runnable, not pseudocode
- Keep language concise — developers skim documentation
````

## Tips

- **Start with inline comments**: JSDoc and docstrings live next to the code and are the most likely to stay up-to-date. Standalone docs drift.
- **Verify accuracy**: AI-generated descriptions are inferred from code patterns. Double-check edge cases, default values, and error conditions.
- **Add examples from real usage**: After generating the docs, enrich the examples with actual patterns from your codebase or test files.
- **Set up doc generation**: Use tools like TypeDoc, Sphinx, or GoDoc to turn inline comments into browsable HTML docs automatically.
- **Review with fresh eyes**: Have someone unfamiliar with the code read the generated docs and flag anything confusing. That feedback is gold.
