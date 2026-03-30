---
title: "Design Database Schema"
description: "Design normalized database schemas from plain-language requirements, with migrations, indexes, and ORM model definitions."
author: "Luca"
tags: ["database", "schema", "prisma", "sql"]
difficulty: "intermediate"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "skill"
installTarget: ["cursor", "claude-code"]
---

## What it does

This skill takes business requirements or a feature description and produces a complete database schema. It outputs table definitions with proper data types, relationships, indexes, constraints, and sensible defaults. You can choose your output format: raw SQL, Prisma schema, Drizzle schema, SQLAlchemy models, or TypeORM entities. It also generates the initial migration file and seed data.

## How to use

1. Describe the data you need to store in plain language, or paste existing requirements or user stories.
2. Specify your database engine (PostgreSQL, MySQL, SQLite) and preferred ORM or schema format.
3. Run the prompt.
4. Review the schema for correctness against your domain, adjust naming to match your conventions, and apply the migration.

For evolving schemas, you can paste an existing schema alongside new requirements and ask the AI to generate an incremental migration.

## The Skill/Prompt

````markdown
You are a database architect. Design a schema from the following requirements.

**Requirements:**
{{DESCRIBE_WHAT_DATA_YOU_NEED_TO_STORE_AND_THE_RELATIONSHIPS}}

**Database engine:** {{POSTGRESQL / MYSQL / SQLITE}}
**Output format:** {{RAW_SQL / PRISMA / DRIZZLE / SQLALCHEMY / TYPEORM}}
**Existing schema (for incremental changes):**
```
{{PASTE_EXISTING_SCHEMA_OR_LEAVE_EMPTY}}
```

**Design the following:**

### 1. Entity Relationship Diagram
- ASCII or Mermaid diagram showing all tables, their columns, and relationships
- Mark primary keys, foreign keys, and relationship cardinality (1:1, 1:N, M:N)

### 2. Schema Definition
- Full table/model definitions in the requested format
- Use appropriate data types (e.g., `uuid` for IDs, `timestamptz` for timestamps, `text` vs `varchar`)
- Include: NOT NULL constraints, DEFAULT values, CHECK constraints, UNIQUE constraints
- Add `created_at` and `updated_at` timestamps on all tables

### 3. Indexes
- Primary key indexes (automatic)
- Foreign key indexes for join performance
- Indexes on columns frequently used in WHERE clauses or ORDER BY
- Composite indexes where queries filter on multiple columns
- Unique indexes for business-rule uniqueness

### 4. Migration File
- A migration that creates or alters the schema
- Include both `up` and `down` directions
- Safe for production (use IF NOT EXISTS, transactions where supported)

### 5. Seed Data
- Realistic sample data for development and testing (5-10 rows per table)
- Maintain referential integrity

**Rules:**
- Normalize to 3NF by default. Denormalize only with explicit justification.
- Use soft deletes (deleted_at column) unless the requirements specify hard deletes.
- Prefer UUIDs over auto-increment for primary keys (unless SQLite).
- Name tables in snake_case plural (e.g., user_accounts). Name columns in snake_case singular.
````

## Tips

- **Start with the domain model**: Describe entities and their relationships in business language ("a user can have many orders, each order has multiple line items") rather than jumping to table names.
- **Think about queries early**: If you know your main query patterns (e.g., "list all orders for a user sorted by date"), mention them. The AI will add appropriate indexes.
- **Review join tables**: Many-to-many relationships need junction tables. Check that they have the right composite keys and any additional metadata columns (e.g., `role` on a user-organization join table).
- **Plan for scale**: If a table will have millions of rows, mention it. The AI will suggest partitioning strategies and avoid expensive default indexes.
- **Iterate incrementally**: For existing projects, always paste the current schema and ask for an incremental migration rather than regenerating from scratch.
