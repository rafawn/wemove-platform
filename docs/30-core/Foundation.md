# Foundation

**Version:** 1.0
**Status:** Draft
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> Foundation provides the shared low-level capabilities that support every domain and product in We Move Platform.

## Purpose

Define the base platform capabilities that must exist before business domains such as Identity, Organization, CRM or Scheduling.

## Responsibilities

Foundation owns:

- Clock
- Identifiers
- Countries
- Currencies
- Timezones
- Locales
- Settings
- Feature Flags
- Shared Value Objects
- Base Exceptions

## Non Responsibilities

Foundation does not own:

- Authentication
- Authorization
- Company membership
- CRM workflows
- Booking rules
- Payment rules
- Document workflows
- Social network behavior

## First Approved Building Blocks

The first approved implementation targets are:

1. Clock
2. Identifier
3. Money
4. Timezone
5. CurrencyCode
6. LocaleCode

## First TDD Target

The first behavior to test:

> The platform can resolve the current time through a controllable Clock.

## First Code Permission

The first allowed production API is:

```php
Clock::now();
