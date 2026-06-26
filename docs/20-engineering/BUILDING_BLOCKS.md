# Building Blocks

**Version:** 1.0
**Status:** Active
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> Architecture gives us permission to write code.

## 1. Purpose

This document defines the official architectural building blocks of We Move Platform.

Before creating classes, folders, tests or modules, we must understand which building block we are using and why it exists.

The goal is to avoid accidental architecture.

A class should not exist only because Laravel allows it.

A class should exist because it represents a clear architectural or business responsibility.

## 2. Core Principle

Every building block must answer:

```txt
What responsibility does this object have?
Why does it exist?
Which domain owns it?
How is it tested?
```

If we cannot answer those questions, the object probably should not exist yet.

## 3. Summary

| Building Block | Purpose |
|---|---|
| Action | Executes a business operation |
| Entity | Represents a persisted domain concept |
| Value Object | Represents an immutable meaningful value |
| Domain Event | Describes something meaningful that happened inside a domain |
| Integration Event | Describes something shared across products or systems |
| Job | Executes background work |
| Policy | Authorizes an action |
| DTO | Carries structured data across boundaries |
| Query | Encapsulates read logic |
| Enum | Represents a closed set of valid values |
| Contract | Defines a stable interface between boundaries |
| Specification | Encapsulates a reusable business rule |
| Service | Coordinates technical or domain behavior when no better block fits |

## 4. Action

## Definition

An Action represents a business operation.

It should be named as a command in business language.

Examples:

```txt
RegisterUser
CreateCompany
InviteMember
AcceptInvitation
CreateLead
MoveLeadToStage
CreateServiceOrder
RequestDocument
CreateBooking
PublishPost
```

## When To Use

Use an Action when:

- A user or system performs a meaningful operation.
- The operation changes state.
- The behavior deserves a test.
- The operation has a business name.

## When Not To Use

Do not create an Action for:

- Trivial getters.
- Simple formatting.
- Pure read queries.
- Framework glue code.

## Naming

Use verb + noun:

```txt
RegisterUser
CreateCompany
InviteMember
ApproveDocument
ConfirmPayment
```

Avoid vague names:

```txt
UserService
CompanyManager
DataHandler
Processor
```

## Laravel Shape

```php
final class RegisterUser
{
    public static function handle(RegisterUserData $data): User
    {
        // Business operation
    }
}
```

## Testing

Actions should be directly testable.

Example:

```php
it('registers a user with a verified email pending state', function () {
    $user = RegisterUser::handle(...);

    expect($user)->toBeInstanceOf(User::class);
});
```

## 5. Entity

## Definition

An Entity is a domain concept with identity.

In Laravel, most persisted Entities will be Eloquent models.

Examples:

```txt
User
Company
Membership
Lead
ServiceOrder
Booking
Post
```

## When To Use

Use an Entity when:

- The concept has identity.
- It has a lifecycle.
- It may be persisted.
- Other objects reference it.

## When Not To Use

Do not create an Entity for:

- Simple values.
- Temporary request data.
- Calculated values without identity.

## Rule

Entities should not become containers for every workflow.

Complex behavior belongs in Actions, Policies, Events or domain-specific objects.

## 6. Value Object

## Definition

A Value Object represents an immutable meaningful value.

It is defined by its value, not by identity.

Examples:

```txt
EmailAddress
PhoneNumber
Money
DateRange
TimeRange
Timezone
CurrencyCode
LocaleCode
```

## When To Use

Use a Value Object when:

- A primitive value has domain meaning.
- Invalid states should be prevented.
- The same validation appears in several places.
- Behavior belongs to the value itself.

## When Not To Use

Do not wrap every string or integer.

Avoid Value Objects when they add ceremony without clarity.

## Example

```php
final readonly class Money
{
    public function __construct(
        public int $amount,
        public string $currency,
    ) {
        if ($amount < 0) {
            throw new InvalidArgumentException('Money amount cannot be negative.');
        }
    }
}
```

## Rule

A Value Object should make illegal states harder to represent.

## 7. Domain Event

## Definition

A Domain Event describes something meaningful that happened inside a domain.

It is written in past tense.

Examples:

```txt
UserRegistered
CompanyCreated
MemberInvited
LeadCreated
BookingCreated
DocumentApproved
PaymentConfirmed
PostPublished
```

## When To Use

Use a Domain Event when:

- Something meaningful happened.
- Other parts of the same product may react.
- Side effects should be decoupled.
- The event is part of the business language.

## When Not To Use

Do not use events for:

- Simple method calls.
- Immediate required responses.
- Hiding unclear control flow.
- Technical operations with no business meaning.

## Naming

Use past tense:

```txt
LeadCreated
BookingCancelled
PaymentConfirmed
```

Avoid:

```txt
CreateLead
NewBooking
ProcessPayment
```

## 8. Integration Event

## Definition

An Integration Event is an event designed to cross product or system boundaries.

It is more stable and explicit than an internal Domain Event.

Examples:

```txt
LeadCreatedIntegrationEvent
BookingCreatedIntegrationEvent
PaymentConfirmedIntegrationEvent
```

## When To Use

Use an Integration Event when:

- Another product needs to react.
- The event crosses application boundaries.
- The payload must remain stable over time.
- The event becomes part of a contract.

## Difference From Domain Event

```txt
Domain Event = internal domain reaction
Integration Event = cross-product contract
```

A product may translate a Domain Event into an Integration Event.

## 9. Job

## Definition

A Job performs work asynchronously.

Examples:

```txt
SendInvitationEmail
SyncGoogleCalendarEvent
ProcessPaymentWebhook
GenerateDocumentPreview
SendBookingReminder
```

## When To Use

Use a Job when:

- Work is slow.
- Work calls an external service.
- Work can be retried.
- Work does not need to block the request.

## When Not To Use

Do not use a Job to hide business logic.

Business decision first.

Background execution second.

## Rule

Jobs execute work.

Actions decide business behavior.

## 10. Policy

## Definition

A Policy authorizes whether a user can perform an action.

Examples:

```txt
CompanyPolicy
MembershipPolicy
LeadPolicy
BookingPolicy
DocumentPolicy
```

## When To Use

Use a Policy when:

- Access depends on user, company, role or ownership.
- A sensitive operation needs authorization.
- A product resource must be protected.

## When Not To Use

Do not use frontend checks as security.

Frontend permissions improve UX.

Backend Policies enforce security.

## 11. DTO

## Definition

A DTO carries structured data across boundaries.

Examples:

```txt
RegisterUserData
CreateCompanyData
InviteMemberData
CreateBookingData
PaymentWebhookData
```

## When To Use

Use a DTO when:

- Data has several fields.
- Data crosses boundaries.
- Raw arrays become unclear.
- The same input shape is reused.
- Validation and construction deserve explicitness.

## When Not To Use

Avoid DTOs for very simple operations where explicit arguments are clearer.

## Rule

DTOs carry data.

They should not become business services.

## 12. Query

## Definition

A Query encapsulates read logic.

Examples:

```txt
SearchLeads
ListCompanyMembers
FindAvailableTimeSlots
GetUserNotifications
```

## When To Use

Use a Query when:

- Read logic becomes complex.
- Filters are reusable.
- The query belongs to a domain.
- Controllers or components are becoming query-heavy.

## When Not To Use

Do not create Query classes for simple model lookups.

## Rule

Actions change state.

Queries read state.

## 13. Enum

## Definition

An Enum represents a closed set of valid values.

Examples:

```txt
UserStatus
CompanyStatus
MembershipStatus
LeadStatus
BookingStatus
PaymentStatus
DocumentStatus
```

## When To Use

Use an Enum when:

- The possible values are known.
- The value has business meaning.
- The value appears in multiple places.
- Invalid strings would create risk.

## When Not To Use

Do not use Enums for values that are user-defined or frequently changing.

## 14. Contract

## Definition

A Contract defines a stable interface between boundaries.

Examples:

```txt
CalendarProvider
PaymentGateway
FileStorage
NotificationChannel
InternalApiClient
```

## When To Use

Use a Contract when:

- Multiple implementations may exist.
- A domain depends on an external service.
- You need to test behavior without real providers.
- A boundary must stay stable.

## When Not To Use

Do not create interfaces for every class by default.

Contracts should protect meaningful boundaries.

## 15. Specification

## Definition

A Specification encapsulates a reusable business rule.

Examples:

```txt
CanInviteMember
CanCreateBooking
CanApproveDocument
IsCompanyActive
```

## When To Use

Use a Specification when:

- A business rule is reused.
- A rule is complex.
- A rule needs isolated tests.
- A rule should be composed with other rules.

## When Not To Use

Avoid Specifications for simple one-line conditions.

## Status

Specifications are allowed but not a default pattern.

Use them only when they clearly improve the design.

## 16. Service

## Definition

A Service coordinates behavior that does not naturally belong to another building block.

Examples:

```txt
CalendarSyncService
PaymentGatewayService
DocumentPreviewService
```

## When To Use

Use a Service when:

- The behavior is technical or infrastructural.
- It coordinates several low-level operations.
- It wraps an external provider.
- No better building block fits.

## When Not To Use

Do not use Services as generic containers for business logic.

Avoid names like:

```txt
UserService
CompanyService
LeadService
```

Prefer Actions with business names.

## 17. Aggregate

## Definition

An Aggregate is a cluster of domain objects that must be changed consistently.

Possible future examples:

```txt
Company + Memberships
ServiceOrder + DocumentRequests
Booking + CalendarEvents
```

## Current Rule

Do not introduce Aggregates as a default pattern in Architecture v1.0.

Use them only when consistency boundaries become clear and useful.

## 18. Command

## Definition

A Command represents an intention to perform an operation.

In Architecture v1.0, Actions usually cover command behavior.

## Current Rule

Do not introduce separate Command objects unless we later adopt a command bus or a clearer CQRS structure.

## 19. Event Listener

## Definition

A Listener reacts to an Event.

Examples:

```txt
SendWelcomeEmail
CreateDefaultCompanyRole
NotifyOwnerAboutNewLead
SyncBookingToExternalCalendar
```

## Rules

- Listeners should react to events.
- Listeners should not decide the original business operation.
- Slow listeners should be queued.
- Listeners should be idempotent when possible.

## 20. Notification

## Definition

A Notification represents a message delivered to a user.

Examples:

```txt
MemberInvitedNotification
BookingConfirmedNotification
PaymentConfirmedNotification
DocumentRejectedNotification
```

## Rule

Notifications deliver messages.

They should not decide business rules.

## 21. Exception

## Definition

An Exception represents an invalid or unexpected situation.

Prefer domain-specific exceptions when they improve clarity.

Examples:

```txt
CompanyIsInactive
InvitationAlreadyAccepted
BookingTimeNotAvailable
PaymentAlreadyConfirmed
```

## Rule

Exceptions should communicate domain meaning when possible.

## 22. Folder Guidance

Example domain folder:

```txt
app/Core/Organization/
├── Actions/
├── Models/
├── Data/
├── Events/
├── Jobs/
├── Policies/
├── Queries/
├── Enums/
├── Exceptions/
├── Notifications/
└── Support/
```

Do not create empty folders just to satisfy structure.

Folders appear when the domain needs them.

## 23. Decision Checklist

Before creating a new class, ask:

```txt
1. Which domain owns this class?
2. Which building block is it?
3. What responsibility does it have?
4. What should it not do?
5. What test proves it works?
6. Does its name use the Ubiquitous Language?
7. Does it introduce a new concept that must be documented?
```

## 24. First Approved Building Blocks for Architecture v1.0

Architecture v1.0 approves the following as default building blocks:

- Action
- Entity
- Value Object
- Domain Event
- Job
- Policy
- DTO
- Query
- Enum
- Contract
- Notification
- Exception

Allowed with caution:

- Specification
- Service
- Aggregate
- Command

## 25. Final Rule

A building block is not architecture because it exists.

It becomes architecture when it has a clear responsibility, a clear name, a clear owner and a clear test.
