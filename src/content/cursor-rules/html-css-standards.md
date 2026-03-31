---
title: "HTML & CSS Standards"
description: "Semantic HTML, accessible markup, and modern CSS patterns with custom properties and layout"
author: "iO Digital"
tags: ["html", "css", "accessibility", "frontend"]
difficulty: "beginner"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert frontend developer focused on semantic HTML and modern CSS.

### Semantic HTML

- Use semantic elements: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Use headings (`h1`-`h6`) in logical order. One `h1` per page.
- Use `button` for actions, `a` for navigation. Never use `div` for either.
- Use `fieldset` and `legend` to group related form controls.
- Use `figure` and `figcaption` for images with captions.
- Use `time` element with `datetime` attribute for dates.
- Use lists (`ul`, `ol`, `dl`) for list-like content.

### Accessibility

- Every `img` must have an `alt` attribute. Decorative images use `alt=""`.
- All form inputs need associated `label` elements (use `for`/`id` or nesting).
- Use `aria-label` or `aria-labelledby` when visible labels are not possible.
- Ensure keyboard navigability: visible focus styles, logical tab order.
- Use `role` attributes only when native semantics are insufficient.
- Maintain color contrast ratio of at least 4.5:1 for text.
- Test with screen readers. Use `aria-live` for dynamic content updates.

```html
<form>
  <fieldset>
    <legend>Contact Information</legend>
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" required autocomplete="email" />
  </fieldset>
</form>
```

### Modern CSS

- Use CSS custom properties for theming and reusable values.
- Use `clamp()` for fluid typography and spacing.
- Use logical properties (`inline`, `block`) over physical (`left`, `right`).
- Use `color-mix()` for color variations.
- Use `container` queries for component-level responsive design.
- Prefer `gap` over margins for spacing in flex/grid layouts.

```css
:root {
  --color-primary: oklch(0.55 0.2 250);
  --space-m: clamp(1rem, 2vw + 0.5rem, 2rem);
  --text-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
}

.card {
  display: grid;
  gap: var(--space-m);
  padding-inline: var(--space-m);
  container-type: inline-size;
}
```

### Layout

- Use CSS Grid for two-dimensional layouts.
- Use Flexbox for one-dimensional alignment and distribution.
- Use `min()`, `max()`, `clamp()` for intrinsic sizing.
- Avoid fixed widths. Use `max-width` with fluid defaults.
- Use `auto-fit` / `auto-fill` with `minmax()` in grid for responsive grids without media queries.

### Naming and Organization

- Use BEM naming convention: `.block__element--modifier`.
- Keep specificity low. Avoid nesting deeper than 3 levels.
- Group related properties logically (layout, box model, typography, visual).
- Use `@layer` for managing cascade priority across stylesheets.
- Scope component styles to avoid leaking.

### Performance

- Use `content-visibility: auto` for off-screen content.
- Prefer CSS animations over JavaScript animations.
- Use `will-change` sparingly and only before animation starts.
- Inline critical CSS, lazy-load the rest.
- Use modern image formats (`avif`, `webp`) with `picture` fallbacks.
