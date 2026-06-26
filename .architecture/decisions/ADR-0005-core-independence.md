# ADR-0005: Keep Core Independent from Product-Specific Logic

## Status

Proposed

## Context

The Core must serve multiple products and remain stable over time.

## Decision

The Core must not depend on Wizzy Manager, We Move Connect, We Move Experience, Wizzy Calendar or We Move Network.

## Consequences

Positive:

- Clean dependencies.
- Easier reuse.
- More stable platform foundation.

Tradeoffs:

- Product logic cannot be placed in Core for convenience.
- Shared abstractions must be carefully designed.
