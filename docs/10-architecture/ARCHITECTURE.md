# We Move Platform Architecture

## 1. Overview

We Move Platform is a modular ecosystem composed of multiple products connected through a shared Core.

The initial architecture should avoid unnecessary distributed complexity. The recommended approach is:

- Modular applications.
- Shared Core package.
- Clear domain boundaries.
- Independent product databases when justified.
- Event-driven communication where useful.
- APIs for product-to-product communication.

## 2. High-Level Ecosystem

```txt
                    ┌────────────────────┐
                    │   We Move Core      │
                    │ Identity / Shared   │
                    └─────────┬──────────┘
                              │
 ┌────────────────────────────┼────────────────────────────┐
 │                            │                            │
 ▼                            ▼                            ▼
Wizzy Manager          We Move Connect             Wizzy Calendar
CRM / Backoffice       Client / Agent Portal       Scheduling

 │                            │                            │
 └──────────────┬─────────────┴─────────────┬──────────────┘
                ▼                           ▼
        We Move Experience          We Move Network
        Public website              Community / Social
```

## 3. Products

### Core

Shared foundation used by all products.

Responsibilities:

- Authentication.
- Users.
- Companies.
- Tenants.
- Roles and permissions.
- Files.
- Notifications.
- Audit logs.
- Integrations.
- Shared internal API contracts.

### Wizzy Manager

Operational backoffice and CRM.

Responsibilities:

- Leads.
- Students/customers.
- Pipelines.
- Tasks.
- Automations.
- Internal operations.
- Reporting.
- Team workflows.

### We Move Connect

Portal for customers, agents and service execution.

Responsibilities:

- Service orders.
- Documents.
- Payments.
- Customer portal.
- Agent portal.
- Status tracking.
- Appointment visibility.

### We Move Experience

Public-facing website and lead acquisition layer.

Responsibilities:

- Landing pages.
- Marketing content.
- Public forms.
- SEO.
- Lead capture.
- Campaign pages.

### Wizzy Calendar

Scheduling product.

Responsibilities:

- Availability.
- Booking links.
- Calendar integrations.
- Meeting services.
- Google Calendar.
- Microsoft Calendar.
- Reminders.

### We Move Network

Community and social product.

Responsibilities:

- Profiles.
- Posts.
- Comments.
- Reactions.
- Connections.
- Groups.
- Company pages.
- Jobs/opportunities.
- Moderation.

## 4. Initial Technical Stack

- Laravel 12
- Vue 3
- Inertia
- TypeScript
- TailwindCSS
- shadcn-vue
- PostgreSQL
- Redis
- Laravel Queues
- Laravel Reverb
- Meilisearch
- S3-compatible storage
- Docker
- GitHub Actions or equivalent CI/CD

## 5. Architecture Style

Initial recommendation:

```txt
Modular Monolith per product
+ Shared Core package
+ Event-driven integrations
+ Internal APIs
```

Avoid starting with full microservices.

## 6. Data Strategy

The Core owns shared identity and platform-level data.

Each product should own its own product-specific data.

Possible databases:

```txt
core_db
manager_db
connect_db
calendar_db
network_db
```

This can start simpler if needed, but the ownership boundaries should be clear from the beginning.

## 7. Communication

Products communicate through:

1. Internal APIs for direct queries or commands.
2. Domain events for asynchronous workflows.
3. Shared contracts for stable integration.
4. Queues for background processing.

Example events:

- LeadCreated
- LeadConverted
- BookingCreated
- PaymentConfirmed
- DocumentApproved
- ServiceOrderCreated
- UserRegistered

## 8. Core Rule

The Core must never depend on a product.

Allowed:

```txt
Wizzy Manager → Core
Connect → Core
Calendar → Core
Network → Core
```

Not allowed:

```txt
Core → Wizzy Manager
Core → Connect
Core → Calendar
Core → Network
```

## 9. Deployment Strategy

Each product should be deployable independently when the platform matures.

Initial deployment can be simpler, but the architecture should not block future separation.

## 10. Documentation Strategy

Architecture must be documented using:

- Markdown documentation.
- ADRs.
- Diagrams.
- Domain glossary.
- Module boundaries.
- API contracts.
