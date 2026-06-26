# Codebase Architecture

**Version:** 1.0
**Status:** Active
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> The codebase is the physical manifestation of the architecture.
> If the codebase becomes chaotic, the architecture no longer exists.

## 1. Purpose

This document defines how the We Move Platform architecture is represented physically in the codebase.

It answers:

- Where does each capability live?
- How are namespaces organized?
- Where do Actions, Entities, Events, Policies and Value Objects live?
- How are tests organized?
- When should a folder exist?
- Which folders are forbidden?
- How do documentation, tests and code stay synchronized?

This document is the bridge between architectural thinking and daily development.

## 2. Core Principle

The codebase must follow the architecture.

The architecture must not be reverse-engineered from random folders.

Every file must belong to a capability.

Every capability must have:

- Documentation
- Tests
- Code

A class without a capability is architectural debt.

## 3. The Laws of the Codebase

## Law 1: Code follows architecture

We do not move or create files because they are convenient.

We do it because the architecture gives them a place.

## Law 2: Every class belongs to a capability

No orphan classes.

If someone asks:

> Where does this class live?

The answer must be:

> It belongs to this capability.

## Law 3: Every folder represents a decision

Folders are not decorative.

Avoid folders that hide unclear thinking.

Forbidden folder names:

```txt
Helpers
Utils
Misc
Common
Temp
Other
Stuff
Managers
Handlers
```

Exceptions require an ADR.

## Law 4: The namespace tells a story

A namespace should reveal:

- Layer
- Capability
- Building block
- Class purpose

Example:

```php
App\Core\Identity\Actions\RegisterUser
```

This tells us:

- It belongs to the Core.
- It belongs to Identity.
- It is an Action.
- It registers a user.

## Law 5: Depth has a cost

Do not create deeply nested structures without a clear reason.

Avoid:

```txt
App/Modules/Core/Identity/Users/Actions/Internal/Register/Handlers
```

Prefer:

```txt
App/Core/Identity/Actions/RegisterUser.php
```

## Law 6: Capabilities may grow, but not prematurely

Do not create folders for future needs.

Structure must emerge from real behavior.

## Law 7: Laravel serves the platform

Laravel conventions are respected when useful.

But We Move Platform is organized by architecture, not by default framework folders.

## Law 8: Tests belong conceptually to capabilities

Tests live physically in `tests/`.

But conceptually, a test belongs to the capability it protects.

## Law 9: Documentation, tests and code evolve together

When a capability changes, review:

- Documentation
- Tests
- Code

Not every change modifies all three.

But all three must be considered.

## Law 10: No architecture by accident

If a structure appears repeatedly, we document it.

If a pattern becomes standard, we add it to the Engineering Guide or Building Blocks.

## 4. Root Structure

Recommended root structure:

```txt
wemove-platform/
├── app/
├── bootstrap/
├── config/
├── database/
├── docs/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── README.md
├── HANDBOOK.md
├── AGENTS.md
├── CONTRIBUTING.md
└── composer.json
```

Laravel remains recognizable.

But the application code inside `app/` follows the We Move architecture.

## 5. Application Structure

```txt
app/
├── Core/
├── Business/
├── Products/
└── Support/
```

## 5.1 Core

`Core` contains platform capabilities used by multiple products.

```txt
app/Core/
├── Foundation/
├── Identity/
├── Organization/
├── Authorization/
├── Audit/
├── Notifications/
├── Storage/
├── Integrations/
└── Platform/
```

Core capabilities must be product-agnostic.

A Core capability must not contain Wizzy Manager, We Move Connect, Wizzy Calendar, We Move Experience or We Move Network business rules.

## 5.2 Business

`Business` contains reusable business capabilities.

```txt
app/Business/
├── CRM/
├── Scheduling/
├── ServiceExecution/
├── Documents/
├── Payments/
├── Automation/
├── Marketing/
├── Community/
├── Messaging/
├── Reporting/
└── Analytics/
```

Business capabilities may be composed by multiple products.

Example:

- Scheduling may be used by Wizzy Calendar and We Move Connect.
- CRM may be used by Wizzy Manager and We Move Experience.
- Payments may be used by We Move Connect and future billing modules.

## 5.3 Products

`Products` contains user-facing product composition.

```txt
app/Products/
├── WizzyManager/
├── WeMoveConnect/
├── WeMoveExperience/
├── WizzyCalendar/
└── WeMoveNetwork/
```

Products compose capabilities.

Products should avoid owning reusable business logic that belongs in `Business`.

## 5.4 Support

`Support` contains framework-specific or application-level helpers that do not belong to a specific capability.

This folder must be used with caution.

Allowed examples:

```txt
Support/
├── ServiceProviders/
├── Middleware/
└── Bootstrap/
```

Not allowed:

```txt
Support/Helpers
Support/Utils
Support/Misc
```

If something in Support starts gaining business meaning, it must move to a capability.

## 6. Capability Structure

A capability should start small.

Do not create every possible folder in advance.

Possible folders:

```txt
CapabilityName/
├── Actions/
├── Models/
├── Data/
├── Events/
├── IntegrationEvents/
├── Jobs/
├── Policies/
├── Queries/
├── Enums/
├── Exceptions/
├── Notifications/
├── ValueObjects/
├── Contracts/
├── Listeners/
└── Support/
```

Only create folders when needed.

## 7. Foundation Example

Current Foundation structure:

```txt
app/Core/Foundation/
└── Clock/
    └── Clock.php
```

As it grows, it may become:

```txt
app/Core/Foundation/
├── Clock/
│   └── Clock.php
├── Identifiers/
│   └── Identifier.php
├── Money/
│   ├── Money.php
│   └── CurrencyCode.php
├── Localization/
│   ├── LocaleCode.php
│   └── Timezone.php
└── Exceptions/
    └── InvalidValueObject.php
```

Foundation must remain dependency-free.

## 8. Namespace Rules

Namespace must match the architecture.

Examples:

```php
App\Core\Foundation\Clock\Clock
App\Core\Identity\Actions\RegisterUser
App\Core\Organization\Models\Company
App\Business\Scheduling\Actions\CreateBooking
App\Business\Payments\Events\PaymentConfirmed
App\Products\WeMoveConnect\Http\Controllers\DashboardController
```

## 9. Actions

Actions live inside the capability that owns the behavior.

Example:

```txt
app/Core/Identity/Actions/RegisterUser.php
app/Core/Organization/Actions/InviteMember.php
app/Business/Scheduling/Actions/CreateBooking.php
app/Business/Payments/Actions/ConfirmPayment.php
```

Rules:

- Action names use business language.
- Actions change state.
- Actions should be testable directly.
- Controllers call Actions.
- Actions may dispatch events.

## 10. Models / Entities

Models live inside the capability that owns the entity.

Example:

```txt
app/Core/Identity/Models/User.php
app/Core/Organization/Models/Company.php
app/Business/CRM/Models/Lead.php
app/Business/Scheduling/Models/Booking.php
```

Rules:

- Models should not become workflow containers.
- Complex behavior belongs in Actions or domain-specific objects.
- Relationships are allowed.
- Simple scopes are allowed.
- Authorization does not belong in models.

## 11. Value Objects

Value Objects live inside the capability that owns their meaning.

Examples:

```txt
app/Core/Foundation/Money/Money.php
app/Core/Foundation/Localization/Timezone.php
app/Core/Foundation/Localization/CurrencyCode.php
app/Core/Identity/ValueObjects/EmailAddress.php
```

Rules:

- Value Objects are immutable.
- Value Objects protect meaning.
- Do not wrap every primitive.
- A Value Object should make illegal states harder to represent.

## 12. Events

Domain Events live inside the capability where the event happened.

```txt
app/Core/Identity/Events/UserRegistered.php
app/Core/Organization/Events/MemberInvited.php
app/Business/CRM/Events/LeadCreated.php
app/Business/Scheduling/Events/BookingCreated.php
```

Integration Events live in `IntegrationEvents`.

```txt
app/Business/Scheduling/IntegrationEvents/BookingCreatedIntegrationEvent.php
```

Rules:

- Events use past tense.
- Domain Events are internal.
- Integration Events are cross-boundary contracts.

## 13. Jobs

Jobs live inside the capability that owns the background work.

```txt
app/Core/Organization/Jobs/SendInvitationEmail.php
app/Business/Scheduling/Jobs/SyncGoogleCalendarEvent.php
app/Business/Payments/Jobs/ProcessPaymentWebhook.php
```

Rules:

- Jobs execute work.
- Jobs do not decide business behavior.
- Jobs should be retry-safe when possible.

## 14. Policies

Policies live inside the capability that owns the protected resource.

```txt
app/Core/Organization/Policies/CompanyPolicy.php
app/Business/CRM/Policies/LeadPolicy.php
app/Business/Scheduling/Policies/BookingPolicy.php
```

Rules:

- Backend authorization is mandatory.
- Frontend permissions are UX only.
- Policies should use the Ubiquitous Language.

## 15. DTOs / Data Objects

Data objects live inside `Data`.

```txt
app/Core/Identity/Data/RegisterUserData.php
app/Core/Organization/Data/InviteMemberData.php
app/Business/Scheduling/Data/CreateBookingData.php
```

Rules:

- Use DTOs when input shape is complex or crosses boundaries.
- Avoid DTOs when explicit arguments are clearer.
- DTOs carry data; they do not decide behavior.

## 16. Queries

Queries live inside the capability that owns the read behavior.

```txt
app/Core/Organization/Queries/ListCompanyMembers.php
app/Business/CRM/Queries/SearchLeads.php
app/Business/Scheduling/Queries/FindAvailableTimeSlots.php
```

Rules:

- Actions change state.
- Queries read state.
- Do not create Query classes for trivial lookups.

## 17. Controllers

Controllers should usually live in Product namespaces when they serve a product experience.

Example:

```txt
app/Products/WizzyManager/Http/Controllers/LeadsController.php
app/Products/WeMoveConnect/Http/Controllers/ServiceOrdersController.php
app/Products/WizzyCalendar/Http/Controllers/BookingsController.php
```

Controllers coordinate:

- Request
- Authorization
- Validation
- Action
- Response

Controllers do not own business logic.

## 18. Form Requests

Form Requests may live close to the product HTTP layer.

Example:

```txt
app/Products/WizzyManager/Http/Requests/StoreLeadRequest.php
```

If a request belongs to an internal API or capability API, it may live inside the capability.

Rule:

HTTP validation belongs in Form Requests.

Business validation belongs in Actions, Policies, Specifications or Value Objects.

## 19. Routes

Routes may remain in Laravel route files, but route definitions should point to product or capability controllers.

```php
Route::post('/leads', [LeadsController::class, 'store']);
```

Route files should not contain business logic.

## 20. Tests Structure

Tests live physically in `tests/`.

```txt
tests/
├── Unit/
│   ├── Core/
│   ├── Business/
│   └── Products/
└── Feature/
    ├── Core/
    ├── Business/
    └── Products/
```

Foundation example:

```txt
tests/Unit/Core/Foundation/Clock/ClockTest.php
```

Identity example:

```txt
tests/Feature/Core/Identity/RegisterUserTest.php
```

Scheduling example:

```txt
tests/Feature/Business/Scheduling/CreateBookingTest.php
```

Product example:

```txt
tests/Feature/Products/WizzyManager/LeadsPageTest.php
```

## 21. Test Naming Rules

Prefer behavior names.

Good:

```php
it('returns the current instant');
it('allows an owner to invite a member');
it('prevents users from accessing another company');
it('creates a booking only when the time slot is available');
```

Avoid:

```php
test_store_method_works
test_user_model
test_controller_success
```

## 22. Documentation Representation

Every important capability must have a documentation file.

```txt
docs/30-core/Foundation.md
docs/30-core/Identity.md
docs/30-core/Organization.md

docs/35-business/Scheduling.md
docs/35-business/Payments.md

docs/40-products/WizzyManager.md
```

Documentation describes:

- Purpose
- Responsibilities
- Non-responsibilities
- Public concepts
- Building blocks
- Public API
- Dependencies
- Invariants
- Testing strategy

## 23. Three Representations of a Capability

A capability exists in three forms:

```txt
Documentation
Tests
Code
```

Example:

```txt
docs/30-core/Foundation.md
tests/Unit/Core/Foundation/
app/Core/Foundation/
```

These must evolve together.

## 24. Synchronization Rule

When one representation changes, review the other two.

If code changes:

- Review tests.
- Review docs.

If docs change:

- Review tests.
- Review code.

If tests change:

- Review docs.
- Review code.

A capability is not complete if documentation, tests and code tell different stories.

## 25. Forbidden Shortcuts

Avoid:

```php
now()
Str::uuid()
DB::table()
User::create()
```

When they bypass approved building blocks.

Prefer:

```php
Clock::now()
Identifier::generate()
RegisterUser::handle(...)
CreateCompany::handle(...)
```

This does not mean Laravel helpers are banned everywhere.

It means business and platform behavior should be explicit.

## 26. Dependency Rules

Allowed:

```txt
Core capability → Foundation
Business capability → Core capabilities
Product → Core + Business capabilities
```

Not allowed:

```txt
Foundation → Identity
Core → Product
Business → Product
Product → Product internal model directly
```

Products should communicate through:

- Actions
- Contracts
- Events
- Public APIs
- Integration Events

## 27. When To Create A Folder

Create a folder when:

- There are at least two related classes.
- The concept has a clear architectural meaning.
- The folder name appears in Building Blocks or Capability documentation.
- It improves navigation.

Do not create a folder:

- For future needs.
- To mirror every possible pattern.
- To hide unclear ownership.

## 28. When To Split A Capability

Consider splitting a capability when:

- It has multiple unrelated responsibilities.
- Its documentation becomes unclear.
- Its tests cover unrelated behaviors.
- Its public API becomes too broad.
- Multiple products depend on only a small part of it.
- It starts requiring different deployment or scaling characteristics.

Splitting a capability requires an ADR.

## 29. Code Review Checklist

Before approving code, ask:

1. Which capability owns this change?
2. Does the namespace reflect the capability?
3. Is the building block appropriate?
4. Is the behavior tested?
5. Does the code use the Ubiquitous Language?
6. Are documentation changes needed?
7. Does this create a new dependency?
8. Does this violate Foundation dependency rules?
9. Is this simpler than the alternative?
10. Would this still make sense in five years?

## 30. Lifecycle of an Idea

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

## 31. First Approved Physical Structure

Architecture v1.0 approves the following initial physical structure:

```txt
app/
├── Core/
│   └── Foundation/
│       └── Clock/
│           └── Clock.php
├── Business/
├── Products/
└── Support/

tests/
└── Unit/
    └── Core/
        └── Foundation/
            └── Clock/
                └── ClockTest.php
```

This structure will evolve only when the architecture requires it.

## 32. Final Rule

A clean codebase is not a codebase with many folders.

A clean codebase is one where every file has a reason to exist.
