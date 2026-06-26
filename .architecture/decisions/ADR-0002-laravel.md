# ADR-0002: Use Laravel as the Primary Backend Framework

## Status

Proposed

## Context

The team has strong Laravel experience and the platform needs fast development, maintainability and a mature ecosystem.

## Decision

Use Laravel as the primary backend framework for We Move Platform products.

## Consequences

Positive:

- High development speed.
- Strong ecosystem.
- Excellent queue, event, notification and auth support.
- Familiarity for the team.

Tradeoffs:

- Requires discipline to keep domains modular.
- Large applications can become messy without clear boundaries.
