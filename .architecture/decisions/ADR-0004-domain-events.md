# ADR-0004: Use Domain Events for Cross-Product Workflows

## Status

Proposed

## Context

Products need to react to important business actions without becoming tightly coupled.

## Decision

Use domain events for asynchronous workflows and cross-product reactions.

## Consequences

Positive:

- Lower coupling.
- Better extensibility.
- Easier automation.
- Better auditability of business flows.

Tradeoffs:

- Event payloads need stability.
- Debugging asynchronous flows requires observability.
