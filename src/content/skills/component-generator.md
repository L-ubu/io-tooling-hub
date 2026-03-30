---
title: "React Component Generator"
description: "Generate complete, production-ready React components from a description, including types, styles, tests, stories, and accessibility."
author: "Luca"
tags: ["react", "components", "frontend"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill generates a complete React component from a plain-language description. It produces the component file, TypeScript props interface, styles (CSS Modules, Tailwind, or styled-components), unit tests, a Storybook story, and accessibility attributes. The component follows modern React patterns: function components, hooks, proper memoization, and ref forwarding when appropriate.

## How to use

1. Describe the component you need: what it looks like, what it does, and how users interact with it.
2. Specify your project's styling approach and any design system or component library you use.
3. Run the prompt.
4. Review the output, adjust the styles to match your design system tokens, and integrate it into your component library.

For complex components, describe the full behavior including loading states, error states, empty states, and responsive behavior.

## The Skill/Prompt

````markdown
You are a senior frontend developer. Generate a complete React component from the following description.

**Component description:** {{DESCRIBE_WHAT_THE_COMPONENT_DOES_AND_LOOKS_LIKE}}
**Styling approach:** {{TAILWIND / CSS_MODULES / STYLED_COMPONENTS / VANILLA_CSS}}
**Design system/library (optional):** {{e.g., shadcn/ui, MUI, Radix, none}}
**State management (optional):** {{LOCAL_STATE / ZUSTAND / CONTEXT / REDUX}}

**Generate the following files:**

### 1. Component File (`ComponentName.tsx`)
- Function component with TypeScript
- Properly typed props interface with JSDoc descriptions
- Forward ref if the component wraps a native element
- Handle all visual states: default, hover, focus, disabled, loading, error, empty
- Use semantic HTML elements
- Include ARIA attributes for accessibility
- Memoize callbacks and derived values where appropriate

### 2. Props Interface
- Export the props interface separately for consumers
- Use discriminated unions for mutually exclusive prop combinations
- Document each prop with JSDoc, including default values
- Provide sensible defaults with defaultProps or destructuring defaults

### 3. Styles
- Use the specified styling approach
- Support a `className` prop for style overrides
- Implement responsive behavior (mobile-first)
- Use CSS variables or design tokens for colors, spacing, and typography

### 4. Tests (`ComponentName.test.tsx`)
- Test rendering with default props
- Test each interactive behavior (click, hover, keyboard)
- Test accessibility: focus management, ARIA attributes, keyboard navigation
- Test edge cases: empty data, very long text, missing optional props

### 5. Story (`ComponentName.stories.tsx`)
- Default story showing the most common usage
- Stories for each major variant or state
- Args table with all controllable props
- Include a playground story with all args exposed

**Rules:**
- No `any` types. Every prop, state, and callback must be typed.
- No inline styles. Use the specified styling approach consistently.
- The component must be keyboard navigable.
- Follow the WAI-ARIA design patterns for the component type.
````

## Tips

- **Be specific about behavior**: "A dropdown" is vague. "A searchable dropdown that supports multi-select, async loading of options, and keyboard navigation" produces a much better component.
- **Mention your design system**: If you use shadcn/ui or Radix primitives, say so. The AI will compose existing primitives rather than building from scratch.
- **Review accessibility**: Run the generated component through an accessibility checker. The AI adds ARIA attributes, but real assistive technology testing is irreplaceable.
- **Extract reusable hooks**: If the generated component has complex state logic, ask the AI to extract it into a custom hook for reuse and testability.
- **Iterate on states**: After the initial generation, ask specifically about edge cases: "What happens when the data is loading? When there is an error? When the list is empty?"
