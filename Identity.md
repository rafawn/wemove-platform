# Identity

**Version:** 0.1
**Status:** Draft
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> Identity defines who can access We Move Platform.

## Purpose

Identity provides the platform capability for representing, authenticating and managing users.

It answers:

- Who is this person?
- Can this person access the platform?
- How is this person authenticated?
- Is this identity active, verified or disabled?

## Vision

Identity should become a stable platform capability that can support all current and future We Move products.

It should be able to evolve toward:

- password authentication,
- email verification,
- password reset,
- external identity providers,
- MFA,
- passkeys,
- SSO.

Architecture v1.0 will begin with the smallest useful behavior.

## Responsibilities

Identity owns:

- Users
- Credentials
- Authentication
- Sessions
- Email verification
- Password reset
- User status
- Future MFA
- Future SSO

## Non Responsibilities

Identity does not own:

- Company membership
- Roles
- Permissions
- CRM contacts
- Customers without platform access
- Social profiles
- Product-specific access rules

## Public Concepts

- User
- Credential
- Session
- Email Verification
- Password Reset
- User Status

## Building Blocks

Initial expected building blocks:

### Entities

- User

### Value Objects

- EmailAddress

### Actions

- RegisterUser
- AuthenticateUser
- VerifyEmail
- RequestPasswordReset
- ResetPassword
- DisableUser

### Events

- UserRegistered
- UserAuthenticated
- EmailVerified
- PasswordResetRequested
- PasswordReset
- UserDisabled

### Policies

To be defined when authorization behavior appears.

### DTOs

- RegisterUserData
- AuthenticateUserData

### Enums

- UserStatus

## Public API

Identity should eventually provide the platform with the ability to:

- register a user,
- authenticate a user,
- verify a user's email,
- reset a password,
- disable a user,
- determine whether a user can access the platform.

## Dependencies

Identity depends on:

- Foundation

Identity must not depend on:

- Organization
- Authorization
- CRM
- Scheduling
- Product applications

## Dependents

Expected dependents:

- Organization
- Authorization
- Audit
- Notifications
- Storage
- Integrations
- Business capabilities
- Product experiences

## Invariants

- A User must have a unique email address.
- A User must have a valid status.
- A disabled User cannot authenticate.
- Authentication must never bypass Identity.
- Product access must not be decided by Identity alone.

## Domain Events

Initial planned events:

- UserRegistered
- UserAuthenticated
- EmailVerified
- UserDisabled

## Integration Events

None in the first iteration.

## Testing Strategy

First behaviors to protect:

1. A user can be registered with a valid email.
2. A user cannot be registered twice with the same email.
3. A disabled user cannot authenticate.
4. A user can verify their email.
5. A password reset can be requested.

## First TDD Target

The first Identity behavior should be:

> A user can be registered with a valid email address.

## Related ADRs

- ADR-0000: Domain-First Architecture
- ADR-0004: Test Driven Development
- ADR-0005: Ubiquitous Language

## Related Documents

- PLATFORM_PRINCIPLES.md
- BUILDING_BLOCKS.md
- CAPABILITY_TEMPLATE.md
- CODEBASE_ARCHITECTURE.md
- UBIQUITOUS_LANGUAGE.md

## Architecture Review Checklist

Before Identity becomes Active:

- Does it have one clear purpose?
- Are its responsibilities explicit?
- Are its boundaries protected?
- Does it respect Foundation dependency rules?
- Does it avoid Organization and Authorization logic?
- Are the first behaviors tested?
- Are public concepts aligned with the Ubiquitous Language?
