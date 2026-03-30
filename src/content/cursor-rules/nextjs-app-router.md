---
title: "Next.js App Router Patterns"
description: "Cursor rule for Next.js App Router conventions including server/client components, data fetching, and route handling."
author: "Luca"
tags: ["nextjs", "react", "routing", "server-components"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to follow Next.js App Router best practices, ensuring correct use of server and client components, proper data fetching patterns, and consistent route organization.

## Setup

Copy into `.cursor/rules/nextjs-app-router.mdc` in your project.

## Rule Content

````markdown
# Next.js App Router Patterns

## Server vs Client Components
- Default to Server Components — only add `"use client"` when you need interactivity, browser APIs, or React hooks
- Never import server-only code (database, fs, env secrets) inside a `"use client"` component
- Move interactive pieces into small Client Components and compose them inside Server Components
- Use the `server-only` package to guard server modules from accidental client imports

## Data Fetching
- Fetch data directly in Server Components using `async/await` — no need for `useEffect` or client-side fetching for initial data
- Use `fetch()` with Next.js extended options for caching and revalidation:
  - `{ cache: "force-cache" }` for static data
  - `{ next: { revalidate: 60 } }` for time-based ISR
  - `{ cache: "no-store" }` for dynamic data
- Colocate data fetching with the component that uses it — Next.js deduplicates `fetch` calls automatically
- Prefer Server Actions (`"use server"`) for mutations over API routes

## Loading and Error States
- Add `loading.tsx` files for route-level Suspense boundaries
- Add `error.tsx` files for route-level error boundaries — must be a Client Component
- Use `not-found.tsx` with `notFound()` for 404 states
- Wrap specific sections in `<Suspense fallback={...}>` for granular loading states

## Route Handlers
- Place API routes in `app/api/*/route.ts` files
- Export named functions matching HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- Return `NextResponse.json()` with appropriate status codes
- Use `NextRequest` for typed request handling
- Validate request bodies with zod before processing

## Metadata and SEO
- Export a `metadata` object or `generateMetadata` function in `layout.tsx` and `page.tsx`
- Always include `title`, `description`, and `openGraph` properties
- Use `generateStaticParams` for static generation of dynamic routes
- Add `robots.ts` and `sitemap.ts` at the app root for SEO

## Route Organization
- Use route groups `(groupName)` for logical organization without affecting the URL
- Use parallel routes `@slot` for complex layouts with independent loading states
- Use intercepting routes `(.)`, `(..)` for modal patterns
- Keep `layout.tsx` lean — avoid data fetching in root layout when possible
````
