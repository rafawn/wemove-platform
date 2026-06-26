# Capability Template

**Version:** 1.0
**Status:** Active
**Architecture Version:** 1.0 – Foundation
**Owner:** Platform Architecture

> This document defines the standard structure for every capability in We Move Platform.

---

# Purpose

A Capability describes **what the platform is able to do**.

Capabilities are the primary architectural building blocks of We Move Platform.

They are not Laravel modules.

They are not folders.

They are not packages.

They are business or platform capabilities with clearly defined responsibilities and boundaries.

Every capability must follow this template.

---

# Capability Metadata

| Field                | Description                                           |
| -------------------- | ----------------------------------------------------- |
| Name                 | Official capability name.                             |
| Version              | Current capability version.                           |
| Status               | Draft, Active, Deprecated or Archived.                |
| Architecture Version | Architecture version in which this capability exists. |
| Owner                | Team or person responsible for its evolution.         |

---

# Purpose

Why does this capability exist?

Describe its mission in one or two paragraphs.

A capability should exist because it solves a specific platform or business problem.

---

# Vision

What long-term responsibility should this capability have?

Describe how it is expected to evolve over the coming years.

---

# Responsibilities

List everything this capability owns.

Only include responsibilities that belong exclusively to this capability.

Example:

* User authentication
* Company memberships
* Booking scheduling

---

# Non Responsibilities

Equally important.

List everything this capability must **never** own.

This section protects architectural boundaries.

Example:

* CRM workflows
* Marketing campaigns
* Payment processing

---

# Public Concepts

Describe the concepts exposed by this capability.

Example:

* User
* Membership
* Company
* Booking

These concepts become part of the Ubiquitous Language.

---

# Building Blocks

Describe the architectural elements owned by this capability.

## Actions

Business operations.

## Entities

Persisted concepts.

## Value Objects

Immutable concepts.

## Domain Events

Internal business events.

## Integration Events

Cross-capability or cross-product events.

## Policies

Authorization rules.

## Queries

Read operations.

## DTOs

Boundary data objects.

## Enums

Closed business values.

## Exceptions

Capability-specific failures.

---

# Public API

Describe what this capability promises to the rest of the platform.

Think in terms of capabilities rather than implementation.

Example:

* Register users.
* Invite members.
* Resolve current time.
* Create bookings.

---

# Dependencies

List every capability this one depends on.

Explain why.

---

# Dependents

List every capability or product that depends on this capability.

---

# Invariants

Describe the rules that must always remain true.

These rules define the integrity of the capability.

Examples:

* A Membership always belongs to exactly one Company.
* Money cannot be negative.
* A Booking always has a valid time range.

---

# Domain Events

List the events this capability publishes.

---

# Integration Events

List the events shared with other capabilities or products.

---

# Testing Strategy

Describe the most important behaviors that must always be protected by tests.

Prefer behavior over implementation.

---

# Future Evolution

Describe known future extensions.

Do not describe implementation details.

---

# Related ADRs

List architectural decisions affecting this capability.

---

# Related Documents

Reference the documents that help understand this capability.

Examples:

* DOMAIN_MAP.md
* DOMAIN_MODEL.md
* BUILDING_BLOCKS.md
* UBIQUITOUS_LANGUAGE.md

---

# Architecture Review Checklist

Before a capability becomes **Active**, answer:

* Does it have one clear purpose?
* Are its responsibilities explicit?
* Are its boundaries protected?
* Does it respect the Platform Principles?
* Does it use the Ubiquitous Language?
* Are the Building Blocks appropriate?
* Are the invariants documented?
* Is the testing strategy defined?
* Are related ADRs referenced?
* Can another architect understand it without reading the code?

Only after every answer is **Yes** should the capability be considered ready for implementation.

---

# Final Rule

A capability is not defined by its code.

It is defined by its purpose, its responsibilities, its boundaries and its promises to the rest of the platform.
