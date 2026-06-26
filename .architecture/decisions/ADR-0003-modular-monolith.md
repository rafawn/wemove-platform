# ADR-0003: Start with Modular Monoliths Instead of Microservices

## Status

Proposed

## Context

The platform will have multiple products, but starting with microservices would increase operational complexity too early.

## Decision

Start with modular monoliths per product and clear module boundaries.

## Consequences

Positive:

- Faster development.
- Easier debugging.
- Lower operational overhead.
- Clear path to extract services later.

Tradeoffs:

- Requires discipline to maintain boundaries.
- Some modules may eventually need extraction.
