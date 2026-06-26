# Engineering Manifesto

**Version:** 1.0
**Status:** Active
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> We don't write code. We evolve the platform.

## 1. Purpose

This manifesto defines the engineering culture of We Move Platform.

It explains how we think, how we make decisions, how we write code, how we test behavior and how we protect the platform over time.

Technology will change.

The culture defined here should remain.

## 2. We Build Platforms, Not Features

A feature solves a need.

A platform creates the conditions for many needs to be solved consistently.

We do not optimize only for the next ticket.

We optimize for the next decade.

## 3. The Platform Comes First

No individual product is more important than the coherence of We Move Platform.

Wizzy Manager, We Move Connect, We Move Experience, Wizzy Calendar and We Move Network exist because the platform exists.

The platform must never be compromised to accelerate a single product.

## 4. Architecture Gives Us Permission To Write Code

We do not write code just because we can.

We write code when:

- the capability is understood,
- the behavior is clear,
- the test can be written,
- the building block is appropriate,
- the architecture gives the class a place.

## 5. Behavior Comes Before Implementation

Every meaningful behavior starts as a test.

The test is the promise.

The implementation is how the promise is kept.

## 6. We Practice TDD By Default

TDD is not a ceremony.

It is how we protect confidence.

The preferred flow is:

```txt
Behavior
↓
Failing Test
↓
Minimal Code
↓
Refactor
↓
Documentation Review
```

## 7. The Domain Comes Before The Framework

Laravel is important.

But Laravel is not the architecture.

The architecture is defined by capabilities, responsibilities, boundaries and behavior.

The framework serves the platform.

## 8. Names Are Architecture

A good name reduces confusion.

A bad name creates future bugs.

We protect the Ubiquitous Language.

If a word is not part of the language, we discuss it before putting it into code.

## 9. We Prefer Explicitness

We prefer:

```php
Clock::now();
RegisterUser::handle(...);
CreateCompany::handle(...);
```

Over hidden shortcuts when the behavior has architectural meaning.

Explicit code tells a better story.

## 10. Simplicity Wins

We prefer boring, reliable, understandable solutions.

Patterns are tools.

Not trophies.

Every abstraction must justify its existence.

## 11. Documentation Is Part Of The Product

A feature is not finished just because the code works.

Important changes may require:

- tests,
- documentation updates,
- ADRs,
- architecture review.

## 12. Every Class Belongs Somewhere

No orphan classes.

No random helpers.

No miscellaneous folders.

Every file must belong to a capability.

Every capability must have a reason to exist.

## 13. We Review Decisions, Not Only Code

Code review is not enough.

We also review:

- ownership,
- dependencies,
- naming,
- boundaries,
- test behavior,
- long-term consequences.

## 14. We Change Our Minds With Evidence

Architecture is not dogma.

If a better decision appears, we change direction.

But important changes must be documented.

We do not rewrite history silently.

## 15. Pressure Does Not Cancel Principles

The real test of architecture happens when there is pressure.

When deadlines appear, we return to the Constitution.

When speed is needed, we simplify without corrupting the platform.

## 16. The Founder Protects Vision

The founder protects the long-term purpose of the platform.

The founder asks:

> Does this move We Move Platform closer to what it is meant to become?

## 17. The Architect Protects Coherence

The architect protects the consistency of the platform.

The architect asks:

> Does this decision make the platform more coherent or more fragile?

## 18. The Engineer Protects Behavior

The engineer protects the system through tests, clarity and discipline.

The engineer asks:

> What behavior are we protecting?

## 19. Our Working Rhythm

```txt
Idea
↓
Architecture
↓
Capability
↓
Behavior
↓
Test
↓
Code
↓
Review
↓
Documentation
↓
History
```

We do not start with files.

We start with meaning.

## 20. Final Rule

Good software is written one class at a time.

Great platforms are built one decision at a time.
