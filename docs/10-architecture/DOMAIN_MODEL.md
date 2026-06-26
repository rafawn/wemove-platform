# We Move Platform Domain Model

> Connecting people, opportunities and services without borders.

## 1. Purpose

This document defines the initial domain model for We Move Platform.

Its goal is to answer:

- What entities exist?
- Which entities belong to the Core?
- Which entities belong to each product?
- How do products relate to each other?
- What should never be placed in the Core?
- Which behaviors should be protected by tests?

This document must be updated before creating important models, migrations or modules.

## 2. Core Rule

The Core contains only what is shared across multiple products.

A concept belongs to the Core only if at least two or more products need it as a platform-level concept.

```txt
Core = shared platform foundation
Product = specific business behavior
```

Allowed:

```txt
Wizzy Manager → Core
We Move Connect → Core
Wizzy Calendar → Core
We Move Experience → Core
We Move Network → Core
```

Not allowed:

```txt
Core → Wizzy Manager
Core → We Move Connect
Core → Wizzy Calendar
Core → We Move Experience
Core → We Move Network
```

## 3. Bounded Contexts

```txt
We Move Platform
├── Core
│   ├── Identity
│   ├── Companies
│   ├── Tenancy
│   ├── Authorization
│   ├── Audit
│   ├── Notifications
│   ├── Files
│   └── Integrations
│
├── Wizzy Manager
│   ├── CRM
│   ├── Pipelines
│   ├── Tasks
│   ├── Students / Customers
│   ├── Automations
│   └── Reports
│
├── We Move Connect
│   ├── Service Orders
│   ├── Documents
│   ├── Payments
│   ├── Customer Portal
│   └── Agent Portal
│
├── We Move Experience
│   ├── Public Website
│   ├── Landing Pages
│   ├── Forms
│   └── Campaigns
│
├── Wizzy Calendar
│   ├── Availability
│   ├── Bookings
│   ├── Meeting Services
│   └── Calendar Connections
│
└── We Move Network
    ├── Profiles
    ├── Posts
    ├── Connections
    ├── Groups
    ├── Company Pages
    └── Moderation
```

## 4. Core Entities

### User

A person who can access one or more products of the platform.

Initial attributes:

- id
- name
- email
- password
- email_verified_at
- status
- last_login_at

Relationships:

- belongs to many companies through memberships
- has many roles through company membership
- has many audit logs
- has many notifications

Does not own:

- leads
- bookings
- posts
- payments
- service orders

Those belong to products.

### Company

An organization using the platform.

Initial attributes:

- id
- name
- legal_name
- slug
- status
- timezone
- country_id
- currency_id

Relationships:

- has many memberships
- has many users through memberships
- has many product subscriptions or product accesses

### Membership

Relationship between a user and a company.

Initial attributes:

- id
- user_id
- company_id
- role_id
- status
- joined_at
- invited_at
- invited_by_id

Rules:

- a user can belong to multiple companies
- permissions may depend on the active company
- inactive memberships cannot access company resources

### Role

A named group of permissions.

Examples:

- Owner
- Admin
- Manager
- Agent
- Staff
- Customer

### Permission

A specific ability.

Examples:

- manage users
- manage company settings
- view audit logs
- manage integrations
- manage billing

### Tenant

A logical isolation boundary.

In the early version, tenant and company may be closely related.

Rules:

- every product-specific record should be scoped by tenant/company when applicable
- users must never access another company’s data without explicit permission

### AuditLog

A record of important activity.

Examples:

- user invited
- role changed
- document approved
- payment updated
- service order status changed
- integration connected

### Notification

A message delivered to a user or company.

Channels may include:

- database
- email
- WhatsApp
- push
- in-app
- future channels

### File

A stored file.

Examples:

- profile image
- company logo
- document upload
- signed contract
- payment receipt

The Core owns the file abstraction, but the product owns the meaning of the file.

### IntegrationAccount

External account connected to the platform.

Examples:

- Google Calendar
- Microsoft Calendar
- payment gateway
- WhatsApp provider
- email provider

## 5. Product Entities

## 5.1 Wizzy Manager

Wizzy Manager is the operational backoffice and CRM.

### Lead

A potential customer or opportunity.

Belongs to:

- company
- pipeline
- stage
- assigned user

Does not belong to Core.

### Pipeline

A configurable workflow for opportunities.

### PipelineStage

A step inside a pipeline.

### Task

An operational task assigned to a user.

### Activity

Timeline event related to a lead, student, opportunity or service.

### Student / Customer

A person receiving or requesting services.

Important note:

`User` and `Customer` are not always the same.

A customer may exist as a CRM record before having platform access.

## 5.2 We Move Connect

We Move Connect is the customer and agent portal for service execution.

### ServiceOrder

A structured unit of work for a customer.

### Service

A productized service offered by the company.

### DocumentRequest

A request for a customer to upload a document.

### UploadedDocument

A file uploaded in response to a document request.

### Payment

A payment or payment attempt related to a service order.

### AgentAssignment

Relationship between an agent and a service order.

## 5.3 We Move Experience

We Move Experience is the public marketing and lead acquisition layer.

### LandingPage

A public page designed to capture interest.

### PublicForm

A form shown to visitors.

### FormSubmission

A submitted public form.

### Campaign

A marketing campaign.

Rule:

A valid form submission may create a Lead in Wizzy Manager.

## 5.4 Wizzy Calendar

Wizzy Calendar is the scheduling product.

### Availability

Rules defining when a user or company can receive bookings.

### MeetingService

A type of meeting that can be booked.

Examples:

- consultation
- migration assessment
- sales call
- follow-up

### Booking

A scheduled appointment.

### CalendarConnection

External calendar account.

Examples:

- Google Calendar
- Microsoft Calendar

### CalendarEvent

Representation of a synchronized external event.

## 5.5 We Move Network

We Move Network is the social/community product.

### Profile

Public or semi-public user profile.

### Post

Content published by a user or company.

### Comment

Response to a post.

### Reaction

Like, celebrate or other reaction.

### Connection

Relationship between two profiles.

### Group

Community space.

### CompanyPage

Public presence of a company inside the network.

### ModerationReport

Report of content or behavior.

## 6. Initial Entity Ownership Map

| Entity | Owner |
|---|---|
| User | Core |
| Company | Core |
| Membership | Core |
| Role | Core |
| Permission | Core |
| Tenant | Core |
| AuditLog | Core |
| Notification | Core |
| File | Core |
| IntegrationAccount | Core |
| Lead | Wizzy Manager |
| Pipeline | Wizzy Manager |
| PipelineStage | Wizzy Manager |
| Task | Wizzy Manager |
| ServiceOrder | We Move Connect |
| DocumentRequest | We Move Connect |
| UploadedDocument | We Move Connect |
| Payment | We Move Connect |
| LandingPage | We Move Experience |
| PublicForm | We Move Experience |
| FormSubmission | We Move Experience |
| Availability | Wizzy Calendar |
| MeetingService | Wizzy Calendar |
| Booking | Wizzy Calendar |
| Profile | We Move Network |
| Post | We Move Network |
| Comment | We Move Network |
| Connection | We Move Network |
| Group | We Move Network |

## 7. Important Relationships

```txt
User
 └── Membership
      └── Company

Company
 ├── Leads
 ├── ServiceOrders
 ├── Bookings
 ├── Forms
 └── NetworkProfiles / CompanyPages
```

```txt
FormSubmission
 └── may create Lead

Lead
 └── may become Customer / Student

Customer
 └── may receive ServiceOrder

ServiceOrder
 ├── may require Documents
 ├── may have Payments
 └── may have Bookings
```

## 8. What Must Not Go Into Core

The following must not be placed in Core:

- Lead lifecycle rules.
- Pipeline stages.
- Payment gateway business logic.
- Document approval workflows.
- Booking conflict rules.
- Social feed ranking.
- Post visibility logic.
- Marketing campaign rules.
- Service order state machine.

Core may provide generic infrastructure, but product modules own business meaning.

Example:

```txt
Core File = stored file
Connect UploadedDocument = document uploaded for a service order
```

## 9. TDD Strategy

Every important behavior should start with a test.

Suggested initial test structure:

```txt
tests/
├── Feature/
│   ├── Core/
│   │   ├── Identity/
│   │   │   ├── UserRegistrationTest.php
│   │   │   ├── LoginTest.php
│   │   │   └── EmailVerificationTest.php
│   │   ├── Companies/
│   │   │   ├── CompanyCreationTest.php
│   │   │   ├── CompanyMembershipTest.php
│   │   │   └── CompanyInvitationTest.php
│   │   ├── Authorization/
│   │   │   ├── RoleAssignmentTest.php
│   │   │   └── PermissionEnforcementTest.php
│   │   └── Tenancy/
│   │       └── TenantIsolationTest.php
│   │
│   ├── WizzyManager/
│   ├── WeMoveConnect/
│   ├── WeMoveExperience/
│   ├── WizzyCalendar/
│   └── WeMoveNetwork/
│
└── Unit/
    └── Domain/
```

## 10. First Behaviors to Test

Core MVP should begin with these behaviors:

1. A user can register.
2. A user can log in.
3. A user can create a company.
4. A company owner can invite another user.
5. An invited user can accept an invitation.
6. A user can switch active company.
7. A user cannot access another company’s data.
8. A role can be assigned to a membership.
9. A permission can allow or deny an action.
10. Important company actions are audited.

## 11. Open Questions

These decisions are intentionally not final yet:

1. Should companies and tenants be the same concept in v1?
2. Should the platform use UUIDs or ULIDs?
3. Should the Core be a Laravel app, a package, or both?
4. Should product apps start in a monorepo or separate repositories?
5. Should We Move Calendar be part of Connect first or independent from day one?
6. Which product owns billing/subscription logic?
7. Should customers become users automatically or only after invitation?
8. Should agents be users, CRM contacts, or both?

These questions should become ADRs when decided.
