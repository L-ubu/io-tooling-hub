---
title: "Tailwind CSS Best Practices"
description: "Cursor rule for Tailwind CSS patterns including responsive design, dark mode, and component extraction."
author: "Luca"
tags: ["tailwind", "css", "styling"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to produce clean, maintainable Tailwind CSS following a mobile-first approach with consistent patterns for dark mode, responsive design, and utility organization.

## Setup

Copy into `.cursor/rules/tailwind.mdc` in your project.

## Rule Content

````markdown
# Tailwind CSS Best Practices

## Class Ordering
- Follow a consistent ordering convention: layout > sizing > spacing > typography > visual > interactive
- Example: `flex items-center gap-4 w-full p-4 text-sm font-medium bg-white rounded-lg shadow-sm hover:bg-gray-50`
- Use Prettier with `prettier-plugin-tailwindcss` to auto-sort classes. Do not rely on manual ordering
- Group responsive and state variants logically after their base utility:
  ```
  text-sm md:text-base lg:text-lg
  bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800
  ```

## Responsive Design
- Always design mobile-first. Start with the base (mobile) styles, then layer on `sm:`, `md:`, `lg:`, `xl:`
- Use container queries (`@container`) for component-level responsiveness when the component may appear in different layout contexts
- Avoid fixed widths. Prefer `max-w-*`, `w-full`, and flex/grid layouts
- Common responsive patterns:
  ```html
  <!-- Stack on mobile, side-by-side on desktop -->
  <div class="flex flex-col gap-4 md:flex-row md:gap-8">
    <aside class="w-full md:w-64 shrink-0">Sidebar</aside>
    <main class="flex-1">Content</main>
  </div>

  <!-- Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <Card />
    <Card />
    <Card />
  </div>

  <!-- Hide/show elements at breakpoints -->
  <nav class="hidden md:flex">Desktop nav</nav>
  <button class="md:hidden">Mobile menu toggle</button>

  <!-- Responsive typography scale -->
  <h1 class="text-2xl font-bold sm:text-3xl lg:text-4xl">Page Title</h1>

  <!-- Responsive spacing -->
  <section class="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-20">
    Content with responsive padding
  </section>
  ```
- Test at actual breakpoints, not just "small screen." Resize your browser continuously to catch awkward in-between states

## Animation and Transition Classes
- Use Tailwind's built-in transition utilities for micro-interactions:
  ```html
  <!-- Smooth hover effect -->
  <button class="bg-blue-600 transition-colors duration-150 hover:bg-blue-700">
    Click me
  </button>

  <!-- Scale on hover with easing -->
  <div class="transition-transform duration-200 ease-out hover:scale-105">
    Card
  </div>

  <!-- Fade-in with translate for entrance animations -->
  <div class="animate-fade-in-up">
    Content that animates in
  </div>
  ```
- Keep durations short: `duration-150` for color/opacity changes, `duration-200` to `duration-300` for transforms and layout shifts
- Use `motion-safe:` and `motion-reduce:` variants to respect user preferences:
  ```html
  <div class="motion-safe:animate-bounce motion-reduce:animate-none">
    Bouncing element (respects reduced motion preference)
  </div>
  ```
- Define reusable keyframe animations in `tailwind.config.ts`:
  ```ts
  // tailwind.config.ts
  export default {
    theme: {
      extend: {
        keyframes: {
          'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(8px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          'fade-in-up': 'fade-in-up 0.3s ease-out',
        },
      },
    },
  };
  ```
- Avoid animating properties that trigger layout recalculations (width, height, top, left). Prefer `transform` and `opacity`

## Dark Mode Strategy
- Use the `dark:` variant consistently. Every color that changes between themes must have a dark counterpart
- Prefer `class` strategy in `tailwind.config.ts` for explicit control (works well with a theme toggle):
  ```ts
  export default {
    darkMode: 'class', // or 'media' for automatic OS-based switching
  };
  ```
- Define semantic color tokens in your config when the project uses many custom colors:
  ```ts
  // tailwind.config.ts
  export default {
    theme: {
      extend: {
        colors: {
          surface: {
            DEFAULT: '#ffffff',   // Used as bg-surface
            dark: '#111827',      // Used as dark:bg-surface-dark OR mapped via CSS vars
          },
          'on-surface': {
            DEFAULT: '#111827',
            dark: '#f9fafb',
          },
        },
      },
    },
  };
  ```
- Even better: use CSS custom properties so a single class works in both modes:
  ```css
  /* globals.css */
  :root {
    --color-surface: 255 255 255;
    --color-on-surface: 17 24 39;
  }
  .dark {
    --color-surface: 17 24 39;
    --color-on-surface: 249 250 251;
  }
  ```
  ```ts
  // tailwind.config.ts
  colors: {
    surface: 'rgb(var(--color-surface) / <alpha-value>)',
    'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
  }
  ```
  ```html
  <!-- Works in both light and dark mode automatically -->
  <div class="bg-surface text-on-surface">Content</div>
  ```
- Test both modes thoroughly. Never leave `dark:` variants incomplete
- Prefer `dark:bg-gray-900` over `dark:bg-black` for softer dark themes

## Component Extraction
- When a utility combination repeats 3+ times, extract it into a component or use `@apply` in a CSS file sparingly
- Prefer component extraction (React/Astro components) over `@apply`. This keeps the single source of truth in markup:
  ```tsx
  // Good: component extraction
  const Badge = ({ children, variant = 'default' }: BadgeProps) => (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variant === 'default' && 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      variant === 'success' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      variant === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    )}>
      {children}
    </span>
  );
  ```
- Use `clsx` or `cn` (from shadcn/ui) for conditional class merging. The `cn` utility wraps `clsx` with `tailwind-merge` to handle conflicting classes:
  ```tsx
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  // Usage: later classes override earlier ones correctly
  cn('px-4 py-2', 'px-8') // => 'py-2 px-8' (px-4 is removed, not duplicated)
  ```
- Reserve `@apply` for base styles that truly apply globally, like resetting link styles or form defaults:
  ```css
  /* globals.css */
  @layer base {
    a {
      @apply text-blue-600 underline hover:text-blue-800 dark:text-blue-400;
    }
  }
  ```

## Common Layout Patterns
- Sticky header with scrollable content:
  ```html
  <div class="flex h-screen flex-col">
    <header class="sticky top-0 z-10 shrink-0 border-b bg-white">Header</header>
    <main class="flex-1 overflow-y-auto">Scrollable content</main>
  </div>
  ```
- Sidebar layout:
  ```html
  <div class="flex h-screen">
    <aside class="w-64 shrink-0 overflow-y-auto border-r bg-gray-50">Sidebar</aside>
    <main class="flex-1 overflow-y-auto">Main content</main>
  </div>
  ```
- Centered content with max width:
  ```html
  <div class="mx-auto max-w-3xl px-4">Centered, readable content</div>
  ```
- Card grid with equal-height cards:
  ```html
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="flex flex-col rounded-lg border p-6">
      <h3 class="text-lg font-semibold">Title</h3>
      <p class="flex-1 text-gray-600">Description that may vary in length</p>
      <button class="mt-4">Action</button>
    </div>
  </div>
  ```
- Aspect ratio container (for images, videos, embeds):
  ```html
  <div class="aspect-video overflow-hidden rounded-lg">
    <img class="h-full w-full object-cover" src="..." alt="..." />
  </div>
  ```

## Custom Plugin and Theme Extension
- Extend the theme in `tailwind.config.ts` rather than using arbitrary values like `text-[13px]`:
  ```ts
  export default {
    theme: {
      extend: {
        fontSize: { '2xs': ['0.625rem', { lineHeight: '0.75rem' }] },
        spacing: { 18: '4.5rem', 112: '28rem' },
        borderRadius: { '4xl': '2rem' },
      },
    },
  };
  ```
- Define design tokens for colors, spacing, and typography in the config. This is your single source of truth
- Use CSS custom properties for values that change at runtime (theme switching, user preferences)
- Prefix custom utilities to avoid conflicts with future Tailwind updates: `io-shadow-card`, `io-gradient-brand`
- Write simple plugins for repeated patterns:
  ```ts
  // tailwind.config.ts
  import plugin from 'tailwindcss/plugin';

  export default {
    plugins: [
      plugin(({ addUtilities }) => {
        addUtilities({
          '.text-balance': { 'text-wrap': 'balance' },
          '.scrollbar-hidden': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        });
      }),
    ],
  };
  ```

## Accessibility Considerations
- Never rely on color alone to convey meaning. Add icons, text, or patterns alongside color:
  ```html
  <span class="text-red-600"><ExclamationIcon class="mr-1 inline h-4 w-4" /> Error</span>
  ```
- Ensure focus styles are always visible. Tailwind's `focus-visible:` variant is your friend:
  ```html
  <button class="rounded-lg bg-blue-600 px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
    Button
  </button>
  ```
- Use `sr-only` for screen-reader-only text:
  ```html
  <button><TrashIcon /><span class="sr-only">Delete item</span></button>
  ```

## Things to Avoid
- Inline styles (`style={{ ... }}`) except for truly dynamic values that cannot be expressed as utilities
- `!important` modifiers (`!text-red-500`). Restructure your markup or specificity instead
- Deeply nested `@apply` chains. They defeat the purpose of utility-first CSS
- Arbitrary values (`text-[13px]`, `bg-[#1a2b3c]`) for things that should be design tokens. Use them only for one-off values that genuinely do not belong in the design system
- Overly long class strings without extracting a component. If a class attribute exceeds roughly 10-12 utilities, consider whether a component or `cn()` composition would be clearer
````
