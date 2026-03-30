---
title: "Security-Focused Coding Rules"
description: "Cursor rule enforcing OWASP-aligned security practices for input validation, authentication, XSS, and CSRF prevention."
author: "Luca"
tags: ["security", "owasp", "best-practices"]
difficulty: "advanced"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: true
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to generate secure code by default, covering the most critical web application vulnerabilities from the OWASP Top 10.

## Setup

Copy into `.cursor/rules/security.mdc` in your project.

## Rule Content

````markdown
# Security-Focused Coding Rules

## Input Validation
- Validate ALL user input on the server side — never trust client-side validation alone
- Use strict schema validation (zod, joi) with explicit allow-lists for expected values
- Validate data types, lengths, ranges, and formats before processing
- Reject unexpected fields — use `.strict()` mode in your schema library
- Sanitize file uploads: validate MIME types, enforce size limits, and rename files with random identifiers
- Never interpolate user input into SQL queries — always use parameterized queries or an ORM:
  ```ts
  // WRONG
  db.query(`SELECT * FROM users WHERE id = ${userId}`);
  // RIGHT
  db.query("SELECT * FROM users WHERE id = $1", [userId]);
  ```

## Authentication Patterns
- Use bcrypt or argon2 for password hashing — never MD5 or SHA-256 for passwords
- Enforce minimum password length of 12 characters; check against breached password lists
- Implement rate limiting on login endpoints (e.g., 5 attempts per minute per IP)
- Use short-lived JWTs (15 minutes) with secure, httpOnly refresh tokens
- Always validate the JWT signature and expiration on every request
- Implement proper session invalidation on logout — revoke refresh tokens server-side
- Use `Secure`, `HttpOnly`, `SameSite=Strict` flags on all authentication cookies

## Authorization
- Check permissions on every request — never rely on hiding UI elements for access control
- Use role-based (RBAC) or attribute-based (ABAC) access control, implemented as middleware
- Verify resource ownership: ensure the authenticated user has access to the specific resource, not just the resource type
- Log all authorization failures for security monitoring

## XSS Prevention
- Use a framework that auto-escapes output by default (React, Astro, Vue)
- Never use `dangerouslySetInnerHTML` or `v-html` with user-supplied content
- If you must render user HTML, sanitize it with DOMPurify on the server before storing
- Set the `Content-Security-Policy` header to restrict inline scripts and untrusted sources:
  ```
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
  ```
- Encode user data before inserting into HTML attributes, JavaScript, or URLs

## CSRF Prevention
- Use anti-CSRF tokens for all state-changing requests from forms
- Set `SameSite=Strict` or `SameSite=Lax` on session cookies
- Validate the `Origin` and `Referer` headers on state-changing API requests
- For SPAs using JWT in headers, CSRF is largely mitigated — but never store tokens in localStorage (use httpOnly cookies)

## Secrets and Configuration
- Never commit secrets to version control — use environment variables or a secrets manager
- Add `.env` to `.gitignore` and provide a `.env.example` with placeholder values
- Rotate secrets regularly and use different values per environment
- Use the `server-only` package in Next.js to prevent secrets from leaking to the client bundle

## Security Headers
Always set these response headers:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Dependency Security
- Run `npm audit` or `pnpm audit` in CI and fail on high/critical vulnerabilities
- Pin dependency versions and use a lockfile
- Review new dependencies before adding — check download counts, maintenance status, and known issues
- Use Dependabot or Renovate for automated security updates
````
