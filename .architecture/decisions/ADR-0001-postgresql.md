# ADR-0001: Use PostgreSQL as the Primary Relational Database

## Status

Proposed

## Context

We Move Platform needs a reliable relational database with strong consistency, good indexing, JSON support and long-term scalability.

## Decision

Use PostgreSQL as the preferred primary relational database for new We Move Platform products.

## Consequences

Positive:

- Strong relational integrity.
- Excellent JSON support.
- Good indexing options.
- Mature ecosystem.
- Suitable for SaaS and operational systems.

Tradeoffs:

- Some existing projects may use MySQL.
- Team conventions must be standardized around PostgreSQL behavior.
