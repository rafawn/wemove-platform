# Authentication and Authorization

## 1. Goal

Provide a unified identity and authorization foundation for all We Move products.

## 2. Responsibilities

The auth layer should handle:

- User registration.
- Login.
- Password reset.
- Email verification.
- Company membership.
- Roles.
- Permissions.
- Session management.
- API tokens or service credentials.
- Future SSO.

## 3. Core Concepts

### User

A person with access to the platform.

### Company

An organization using the platform.

### Membership

The relationship between a user and a company.

### Role

A named group of permissions.

### Permission

A specific ability to perform an action.

## 4. Authorization Rule

Never authorize only from the frontend.

Every sensitive backend action must be protected with policies, gates or explicit authorization checks.

## 5. Future SSO

The platform should be designed so that products can eventually authenticate through a central identity provider.
