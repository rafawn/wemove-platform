# We Move Platform Engineering Guide

> Connecting people, opportunities and services without borders.

## 1. Purpose

This guide defines how We Move Platform should be engineered.

It is not only a coding standard. It is the practical engineering handbook for building a long-term product ecosystem with Laravel, Vue, Inertia and a domain-first mindset.

This document should be read together with:

- VISION.md
- ARCHITECTURE.md
- DOMAIN_MODEL.md
- ROADMAP.md
- AGENTS.md
- DECISIONS.md

## 2. Engineering Manifesto

### 2.1 Domain First

We do not start with tables.

We do not start with controllers.

We do not start with framework features.

We start with the domain.

Before creating code, we ask:

- What business behavior are we modeling?
- Who performs this action?
- What rules must be protected?
- Which domain owns this behavior?
- Is this Core or product-specific?

### 2.2 Behavior Before Implementation

Every important behavior should start as a test.

The preferred flow is:

```txt
Domain discussion
↓
Expected behavior
↓
Failing test
↓
Minimal implementation
↓
Refactor
↓
Documentation update if needed
```

### 2.3 Intention Over Implementation

Prefer business language over technical shortcuts.

Avoid:

```php
User::create($data);
```

Prefer:

```php
RegisterUser::handle(...);
```

Avoid:

```php
Company::create($data);
```

Prefer:

```php
CreateCompany::handle(...);
```

The code should communicate intent.

### 2.4 Laravel Executes the Domain

Laravel is the delivery mechanism.

The domain should not be designed around Laravel folders.

The domain should be designed around business capabilities.

### 2.5 Names Are Architecture

Names are not cosmetic.

Good names reduce confusion, comments and bugs.

Use names that describe business intent:

- RegisterUser
- InviteMember
- AcceptInvitation
- SuspendCompany
- AssignRole
- GrantPermission
- CreateLead
- MoveLeadToStage
- RequestDocument
- ConfirmPayment
- CreateBooking

### 2.6 Avoid Architecture Ceremony

Do not create abstractions only because a pattern exists.

Use patterns when they solve real problems.

Recommended defaults:

- Actions: yes, for meaningful business operations.
- Form Requests: yes, for HTTP validation.
- Policies: yes, for authorization.
- Events: yes, when something meaningful happened.
- Jobs: yes, for background work.
- DTOs: when data crosses boundaries or becomes complex.
- Value Objects: when they clarify domain rules.
- Repositories: only when they provide real value, not by default.

## 3. Application Structure

Recommended structure:

```txt
app/
├── Core/
│   ├── Foundation/
│   ├── Identity/
│   ├── Organization/
│   ├── Authorization/
│   ├── Audit/
│   ├── Notifications/
│   ├── Storage/
│   ├── Integrations/
│   └── Platform/
│
├── Products/
│   ├── WizzyManager/
│   ├── WeMoveConnect/
│   ├── WeMoveExperience/
│   ├── WizzyCalendar/
│   └── WeMoveNetwork/
│
└── Support/
```

Tests remain in the Laravel root `tests/` directory:

```txt
tests/
├── Feature/
│   ├── Core/
│   └── Products/
└── Unit/
    ├── Core/
    └── Products/
```

## 4. Domain Folder Convention

Each domain may contain:

```txt
Identity/
├── Actions/
├── Models/
├── Data/
├── Events/
├── Jobs/
├── Policies/
├── Rules/
├── QueryBuilders/
├── Notifications/
└── Support/
```

Not every domain needs every folder.

Create folders only when needed.

## 5. Actions

Actions represent business operations.

Examples:

```txt
RegisterUser
CreateCompany
InviteMember
AcceptInvitation
AssignRole
CreateLead
MoveLeadToStage
CreateBooking
RequestDocument
ConfirmPayment
```

Recommended shape:

```php
final class RegisterUser
{
    public static function handle(/* explicit arguments */): User
    {
        // business operation
    }
}
```

Rules:

- Use explicit arguments when possible.
- Avoid passing raw Request objects.
- Keep controllers thin.
- Actions may dispatch events.
- Actions may call other actions when the workflow is clear.
- Actions should be easy to test directly.

## 6. Controllers

Controllers coordinate HTTP requests and responses.

They should not contain business logic.

Preferred style:

```php
public function store(StoreCompanyRequest $request)
{
    $company = CreateCompany::handle(
        owner: $request->user(),
        name: $request->string('name'),
        timezone: $request->string('timezone'),
    );

    return redirect()->route('companies.show', $company);
}
```

Controller responsibilities:

- Receive request.
- Authorize when appropriate.
- Validate through Form Request.
- Call an Action.
- Return response.

## 7. Form Requests

Use Form Requests for HTTP validation.

Form Requests should validate input shape.

They should not contain deep business rules that belong to the domain.

Good:

```txt
name is required
email must be valid
timezone must exist
```

Domain rule examples:

```txt
user cannot invite members to an inactive company
owner role cannot be removed from the last owner
booking cannot overlap another confirmed booking
```

These belong in Actions, domain services or policies.

## 8. Policies and Authorization

Every sensitive action must be authorized.

Use Policies for model/resource authorization.

Examples:

```txt
CompanyPolicy
MembershipPolicy
LeadPolicy
BookingPolicy
DocumentPolicy
```

Authorization must be backend-enforced.

Never trust frontend-only permissions.

## 9. Events

Events describe something that already happened.

Use past tense.

Good:

```txt
UserRegistered
CompanyCreated
MemberInvited
InvitationAccepted
LeadCreated
BookingCreated
PaymentConfirmed
DocumentApproved
```

Avoid imperative event names:

```txt
CreateUser
SendEmail
ProcessPayment
```

Rules:

- Keep payloads stable.
- Prefer IDs and essential data.
- Dispatch events after state changes.
- Use listeners for side effects.
- Queue listeners when work is slow or external.

## 10. Jobs

Use Jobs for background work.

Examples:

```txt
SendInvitationEmail
SyncGoogleCalendarEvent
GenerateDocumentPreview
ProcessPaymentWebhook
SendBookingReminder
```

Rules:

- Jobs should be retry-safe when possible.
- External API calls should usually happen in Jobs.
- Jobs should log meaningful failures.
- Jobs should avoid receiving huge model payloads.

## 11. DTOs

Use DTOs when data crosses boundaries or becomes complex.

Good candidates:

```txt
RegisterUserData
CreateCompanyData
InviteMemberData
CreateBookingData
PaymentWebhookData
```

Avoid DTOs for very simple operations unless they improve clarity.

## 12. Value Objects

Use Value Objects when they protect domain meaning.

Good candidates:

```txt
EmailAddress
PhoneNumber
Money
DateRange
TimeRange
Timezone
CurrencyCode
```

Avoid wrapping every primitive value.

A Value Object should make illegal states harder to represent.

## 13. Models

Models represent persisted domain entities.

Rules:

- Keep models focused.
- Avoid turning models into huge service containers.
- Relationships are allowed.
- Simple scopes are allowed.
- Complex workflows should live in Actions.
- Authorization should not live in models.

## 14. Migrations

Migrations should be production-conscious.

Rules:

- Use clear table names.
- Add foreign keys where appropriate.
- Add indexes intentionally.
- Store timestamps in UTC.
- Prefer integer minor units for money.
- Avoid destructive migrations without a safe plan.
- Never add columns without understanding ownership.

## 15. Testing Strategy

We Move Platform follows TDD.

Important behavior starts with tests.

Recommended test names:

```php
it('allows a company owner to invite a member');
it('prevents inactive members from accessing a company');
it('records an audit log when a role is changed');
it('prevents overlapping confirmed bookings');
```

Preferred organization:

```txt
tests/
├── Feature/
│   ├── Core/
│   │   ├── Identity/
│   │   ├── Organization/
│   │   ├── Authorization/
│   │   └── Tenancy/
│   └── Products/
│       ├── WizzyManager/
│       ├── WeMoveConnect/
│       ├── WeMoveExperience/
│       ├── WizzyCalendar/
│       └── WeMoveNetwork/
└── Unit/
    ├── Core/
    └── Products/
```

Testing priorities:

1. Tenant isolation.
2. Authorization.
3. Authentication.
4. Payments.
5. Bookings.
6. Document workflows.
7. Lead lifecycle.
8. Cross-product events.
9. External integrations.
10. Critical UI flows.

## 16. Frontend Rules

Preferred stack:

- Vue 3
- Inertia
- TypeScript
- TailwindCSS
- shadcn-vue

Rules:

- Keep pages thin.
- Extract reusable components.
- Prefer typed props.
- Avoid business logic in components.
- Keep UI language consistent across products.
- Do not duplicate permission logic as if it were security.
- Use frontend permissions only for experience, not enforcement.

## 17. API Rules

Internal and external APIs must be explicit.

Rules:

- Validate input.
- Authorize actions.
- Rate limit sensitive endpoints.
- Avoid leaking internal IDs when not appropriate.
- Use stable response shapes.
- Version public APIs when needed.
- Protect internal APIs with signed requests or service credentials.

## 18. Documentation Rules

Documentation is part of the product.

Update documentation when changing:

- Domain boundaries.
- Auth rules.
- Tenancy strategy.
- Event contracts.
- API contracts.
- Security-sensitive behavior.
- Product ownership of data.

## 19. ADR Rules

Create an ADR when a decision affects the platform long-term.

Examples:

- Choosing PostgreSQL.
- Choosing Laravel.
- Choosing modular monoliths.
- Choosing UUIDs or ULIDs.
- Choosing tenancy strategy.
- Extracting a service.
- Changing product ownership of a domain.

ADR location:

```txt
.architecture/decisions/
```

## 20. First Engineering Standard

Before implementing any important feature, answer:

```txt
1. Which domain owns this behavior?
2. Is this Core or product-specific?
3. What is the expected behavior?
4. What test proves it?
5. What action expresses the business intent?
6. Does this need an event?
7. Does this affect documentation or ADRs?
```

## 21. Core Development Sequence

Initial Core development should follow this sequence:

```txt
1. Identity
2. Organization
3. Authorization
4. Tenancy
5. Audit
6. Notifications
7. Storage
8. Integrations
9. Platform APIs
```

## 22. Guiding Sentence

> We design first. We test behavior. We implement with intention. We refactor without fear.
