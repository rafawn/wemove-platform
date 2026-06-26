# Database Strategy

## 1. Primary Database

PostgreSQL is the preferred database for We Move Platform.

## 2. General Rules

- Use foreign keys when possible.
- Add indexes for frequently queried columns.
- Store timestamps in UTC.
- Avoid nullable columns unless the domain allows absence.
- Use enums carefully.
- Prefer explicit status fields for business workflows.
- Store money in integer minor units when precision matters.

## 3. Data Ownership

Core owns platform-level shared data.

Products own their domain-specific data.

## 4. Naming Conventions

- Tables: plural snake_case.
- Columns: snake_case.
- Foreign keys: `{model}_id`.
- Boolean fields: `is_*`, `has_*`, `can_*`.
- Timestamps: `*_at`.
