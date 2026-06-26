# Tenancy

## 1. Goal

Support multiple companies in the same platform while keeping data isolated and secure.

## 2. Initial Strategy

Start with logical tenancy using `company_id` or `tenant_id` where appropriate.

This keeps development fast while preserving a path to stronger isolation later.

## 3. Rules

- Never trust tenant/company identifiers from the client without validation.
- Scope queries by the current company or tenant.
- Use policies to enforce access.
- Audit important tenant-level actions.
- Keep product-specific tenancy rules documented.

## 4. Possible Future Strategies

- Single database with tenant scopes.
- Database per tenant.
- Schema per tenant.
- Hybrid strategy for large customers.
