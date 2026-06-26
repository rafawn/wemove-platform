# Contributing

## 1. General Principles

- Keep code simple.
- Prefer explicit behavior over hidden magic.
- Respect module boundaries.
- Write tests for important business logic.
- Document architectural decisions.

## 2. Branch Naming

Suggested format:

```txt
feature/core-auth
feature/manager-leads
fix/calendar-conflicts
refactor/core-permissions
docs/architecture
```

## 3. Commit Style

Suggested format:

```txt
feat(core): add company membership model
fix(auth): prevent inactive users from logging in
docs(architecture): add initial product boundaries
refactor(manager): extract lead assignment action
```

## 4. Pull Requests

Each PR should explain:

- What changed.
- Why it changed.
- How it was tested.
- Whether documentation or ADRs were updated.

## 5. Testing

Backend:

- Feature tests for flows.
- Unit tests for domain rules.
- Policy tests for authorization.
- Integration tests for external services when possible.

Frontend:

- Component tests where useful.
- End-to-end tests for critical flows.

## 6. Documentation

Documentation is part of the product.

If a change affects architecture, APIs, tenancy, security, events or data ownership, update the corresponding documentation.
