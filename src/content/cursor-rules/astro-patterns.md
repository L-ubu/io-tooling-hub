---
title: "Astro Framework Patterns"
description: "Cursor rule for Astro projects covering islands architecture, content collections, and layout patterns."
author: "Luca"
tags: ["astro", "ssg", "content", "islands"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to follow Astro best practices including the islands architecture, content collections for type-safe content, and consistent layout and component patterns.

## Setup

Copy into `.cursor/rules/astro.mdc` in your project.

## Rule Content

````markdown
# Astro Framework Patterns

## Islands Architecture
- Default to zero JavaScript. Astro components ship no JS to the client by default. This is the framework's core strength
- Only add `client:*` directives on components that genuinely need client-side interactivity (click handlers, form state, animations triggered by user input)
- Choose the right hydration directive based on when the component needs to become interactive:

| Directive         | When it hydrates                     | Use for                                              |
|-------------------|--------------------------------------|------------------------------------------------------|
| `client:load`     | Immediately on page load             | Above-the-fold interactive elements (nav dropdowns, hero CTAs) |
| `client:idle`     | When the browser is idle             | Below-the-fold interactive elements (comment forms, chat widgets) |
| `client:visible`  | When the component scrolls into view | Lazy-loaded widgets, infinite scroll triggers         |
| `client:media`    | When a CSS media query matches       | Mobile-only hamburger menus, touch-specific UI        |
| `client:only="react"` | Client-only, no SSR              | Components that rely on browser APIs (window, localStorage) |

- Keep interactive islands small. Extract the interactive piece into its own component rather than hydrating an entire page section:
  ```astro
  ---
  // Bad: hydrating a large section for one button
  ---
  <HeroSection client:load />

  ---
  // Good: only hydrate the interactive part
  ---
  <section>
    <h1>Welcome to our site</h1>
    <p>Static content that doesn't need JS</p>
    <NewsletterForm client:idle />
  </section>
  ```
- Never use `client:load` on components that are below the fold. Use `client:idle` or `client:visible` instead
- Audit your islands periodically. Run `astro build` and check the output for unexpected JS chunks. Every island adds to the client bundle

## SSR vs SSG Decision Guide
- Use Static Site Generation (SSG) as the default. It produces the fastest possible pages:
  - Marketing pages, blogs, documentation, portfolios
  - Content that changes infrequently (deploy to update)
  - Pages that are the same for all users
- Use Server-Side Rendering (SSR) when you need:
  - Personalized content (user dashboards, authenticated pages)
  - Data that changes frequently and must be fresh on every request
  - Dynamic routes that cannot be pre-rendered (too many permutations)
  - API routes that interact with databases or external services
- Use hybrid rendering (per-route) to get the best of both:
  ```ts
  // astro.config.mjs
  export default defineConfig({
    output: 'hybrid', // SSG by default, opt-in SSR per page
  });
  ```
  ```astro
  ---
  // src/pages/dashboard.astro
  export const prerender = false; // This page uses SSR
  ---
  ```
  ```astro
  ---
  // src/pages/about.astro
  // No export needed — defaults to SSG with hybrid mode
  ---
  ```
- For pages with mostly static content and a small dynamic part, prefer SSG with a `client:*` island that fetches data on the client

## Content Collections
- Define all content schemas in `src/content.config.ts` using zod for full type safety:
  ```ts
  import { defineCollection, z } from "astro:content";

  const blog = defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().max(160), // SEO-friendly length
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      author: z.string(),
    }),
  });

  const authors = defineCollection({
    type: "data", // JSON/YAML data, not Markdown content
    schema: z.object({
      name: z.string(),
      bio: z.string(),
      avatar: z.string(),
      social: z.object({
        twitter: z.string().optional(),
        github: z.string().optional(),
      }).optional(),
    }),
  });

  export const collections = { blog, authors };
  ```
- Use `getCollection()` and `getEntry()` for type-safe content queries:
  ```astro
  ---
  import { getCollection } from "astro:content";

  const posts = await getCollection("blog", ({ data }) => {
    // Filter out drafts in production
    return import.meta.env.PROD ? !data.draft : true;
  });

  // Sort by date, newest first
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  ---
  ```
- Use `slug` from the collection entry for URL-safe paths
- Reference between collections using the collection entry ID:
  ```ts
  // In your blog schema
  author: z.string(), // matches an entry ID in the authors collection

  // In a page
  const post = await getEntry("blog", slug);
  const author = await getEntry("authors", post.data.author);
  ```
- Validate schemas early: run `astro check` in CI to catch frontmatter errors before deployment

## Layouts
- Create a `BaseLayout.astro` with the full HTML shell (`<html>`, `<head>`, `<body>`) and shared meta:
  ```astro
  ---
  interface Props {
    title: string;
    description?: string;
    ogImage?: string;
  }
  const { title, description = 'Default site description', ogImage } = Astro.props;
  const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
  ---
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <slot name="head" />
    </head>
    <body>
      <slot name="header" />
      <main>
        <slot />
      </main>
      <slot name="footer" />
    </body>
  </html>
  ```
- Compose layouts by nesting. A `BlogPostLayout` wraps `BaseLayout` and adds article-specific markup:
  ```astro
  ---
  import BaseLayout from './BaseLayout.astro';
  interface Props {
    title: string;
    pubDate: Date;
    author: string;
  }
  const { title, pubDate, author } = Astro.props;
  ---
  <BaseLayout title={title}>
    <article class="prose mx-auto max-w-3xl px-4 py-12">
      <h1>{title}</h1>
      <time datetime={pubDate.toISOString()}>{pubDate.toLocaleDateString()}</time>
      <p class="text-gray-500">By {author}</p>
      <slot />
    </article>
  </BaseLayout>
  ```
- Use named slots to allow pages to inject content into specific layout regions (head, sidebar, footer)

## Component Organization
- Use `.astro` components for static markup. They render to HTML with zero JS overhead
- Use framework components (React, Vue, Svelte) only when you need client-side interactivity or state
- Organize components by type:
  ```
  src/components/
    ui/               # Generic, reusable UI components
      Button.astro
      Card.astro
      Badge.astro
    layout/           # Layout building blocks
      Header.astro
      Footer.astro
      Sidebar.astro
    content/          # Content-specific display components
      PostCard.astro
      AuthorBio.astro
      TagList.astro
    interactive/      # Client-side framework components (React, etc.)
      SearchBar.tsx
      ThemeToggle.tsx
      CommentForm.tsx
  ```
- Keep component props typed with TypeScript interfaces in the frontmatter:
  ```astro
  ---
  interface Props {
    title: string;
    href: string;
    isExternal?: boolean;
  }
  const { title, href, isExternal = false } = Astro.props;
  ---
  <a href={href} {...isExternal && { target: '_blank', rel: 'noopener noreferrer' }}>
    {title}
    {isExternal && <span class="sr-only">(opens in new tab)</span>}
  </a>
  ```
- Prefer Astro's built-in `<Image />` component for optimized images with automatic format conversion and lazy loading

## Data Fetching
- Fetch data in the frontmatter (component script) during build time for SSG or request time for SSR:
  ```astro
  ---
  // Runs at build time (SSG) or request time (SSR)
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();
  ---
  <ul>
    {posts.map((post) => <li>{post.title}</li>)}
  </ul>
  ```
- For SSG sites, all `fetch` calls happen at build time. Data is baked into static HTML. This is ideal for content from a CMS or API that does not change between deploys
- For frequently changing data on SSG sites, use a client-side island:
  ```tsx
  // LiveStockPrice.tsx (React component)
  const LiveStockPrice = ({ symbol }: { symbol: string }) => {
    const { data } = useQuery(['stock', symbol], () => fetchPrice(symbol), {
      refetchInterval: 5000,
    });
    return <span>{data?.price ?? '...'}</span>;
  };
  ```
  ```astro
  <LiveStockPrice client:idle symbol="AAPL" />
  ```
- Use `Astro.cookies` and `Astro.request` for SSR pages that need request-specific data:
  ```astro
  ---
  // Only works with SSR (prerender = false)
  const sessionToken = Astro.cookies.get('session')?.value;
  if (!sessionToken) return Astro.redirect('/login');

  const user = await getUser(sessionToken);
  ---
  <h1>Welcome, {user.name}</h1>
  ```
- Cache expensive API calls using `Astro.locals` or an external cache layer in SSR mode

## SEO Patterns
- Every page must have a unique `<title>` and `<meta name="description">`. Use the layout to enforce this:
  ```astro
  <BaseLayout title="Blog | My Site" description="Read our latest articles">
  ```
- Generate a sitemap with `@astrojs/sitemap`:
  ```ts
  // astro.config.mjs
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://www.example.com',
    integrations: [sitemap()],
  });
  ```
- Add structured data (JSON-LD) for blog posts and other rich content:
  ```astro
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: pubDate.toISOString(),
    author: { "@type": "Person", name: author },
    description: description,
  })} />
  ```
- Use canonical URLs to prevent duplicate content issues:
  ```astro
  <link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />
  ```
- Generate an RSS feed with `@astrojs/rss` for blog content:
  ```ts
  // src/pages/rss.xml.ts
  import rss from '@astrojs/rss';
  import { getCollection } from 'astro:content';

  export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
      title: 'My Blog',
      description: 'A blog about things',
      site: context.site,
      items: posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
    });
  }
  ```
- Optimize images: always set `width` and `height` attributes (or use `<Image />`) to prevent layout shift. Use descriptive `alt` text

## Project Structure
Follow Astro's conventions for predictable project organization:
```
src/
  pages/            # File-based routing (.astro, .md, .mdx, .ts for API routes)
  layouts/          # Reusable page layouts (BaseLayout, BlogLayout)
  components/       # UI components (Astro and framework components)
    ui/             # Generic reusable components
    layout/         # Header, Footer, Nav
    content/        # Content display components
    interactive/    # React/Vue/Svelte components needing client:*
  content/          # Content collections with frontmatter schemas
    blog/           # Markdown/MDX blog posts
    authors/        # Author data (JSON/YAML)
  styles/           # Global CSS, Tailwind base styles
  lib/              # Shared utilities, API clients, helpers
  types/            # Shared TypeScript types
public/             # Static assets served as-is (favicons, robots.txt, og-images)
```

## Performance Tips
- Audit your build output: check `.astro/` and `dist/` to understand what gets shipped to the client
- Use `<Image />` over raw `<img>` tags. Astro will optimize format, size, and generate srcset
- Prefer `client:visible` and `client:idle` over `client:load` to defer JavaScript hydration
- Use `transition:animate` for view transitions instead of heavy JS animation libraries
- Preload critical assets in the layout head:
  ```astro
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
  ```
- Set appropriate cache headers for SSR pages and use a CDN for static assets
````
