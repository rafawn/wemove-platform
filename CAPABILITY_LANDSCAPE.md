# Capability Landscape

**Version:** 1.0
**Status:** Draft
**Architecture Version:** 1.0 - Foundation
**Owner:** Platform Architecture

> We Move Platform is not only an ecosystem of products.
> It is an ecosystem of capabilities.

## 1. Purpose

This document defines the initial Capability Landscape of We Move Platform.

A Capability is a unit of platform evolution.

It represents something the platform is able to do, with clear responsibilities, boundaries and ownership.

Products are not the center of the architecture.

Capabilities are.

Products compose capabilities to deliver user-facing experiences.

## 2. Core Idea

```txt
Capabilities → Products
```

Not:

```txt
Products → Random Features
```

This means We Move Platform should grow by strengthening reusable capabilities instead of duplicating behavior across products.

## 3. Capability Layers

We Move Platform is organized into four capability layers:

```txt
We Move Platform

├── Platform Core Capabilities
├── Business Capabilities
├── Product Experience Capabilities
└── Operational Capabilities
```

## 4. Platform Core Capabilities

These capabilities support the entire platform.

They should be stable, highly reusable and product-agnostic.

```txt
Platform Core

├── Foundation
├── Identity
├── Organization
├── Authorization
├── Audit
├── Notifications
├── Storage
├── Integrations
└── Platform Runtime
```

### Foundation

Provides low-level platform primitives.

Owns:

- Clock
- Identifiers
- Money
- Timezones
- Currency codes
- Locale codes
- Countries
- Base exceptions
- Shared value objects

Must not own:

- Authentication
- CRM workflows
- Payment workflows
- Booking rules
- Product-specific behavior

Depends on:

- Nothing

Dependents:

- Every capability

### Identity

Defines who can access the platform.

Owns:

- Users
- Authentication
- Sessions
- Credentials
- Email verification
- Password reset
- Future MFA
- Future SSO

Must not own:

- Company membership rules
- CRM contacts
- Social profiles
- Customers without access

Depends on:

- Foundation

### Organization

Defines companies and the relationship between users and companies.

Owns:

- Companies
- Memberships
- Invitations
- Teams
- Departments
- Offices

Must not own:

- Leads
- Bookings
- Payments
- Service orders
- Posts

Depends on:

- Foundation
- Identity

### Authorization

Defines what users can do.

Owns:

- Roles
- Permissions
- Role assignments
- Permission checks
- Policies

Must not own:

- Authentication
- Business workflows
- UI-only visibility rules

Depends on:

- Foundation
- Identity
- Organization

### Audit

Records important business and security actions.

Owns:

- Audit logs
- Actor metadata
- Target metadata
- Context metadata

Must not own:

- Product timelines
- Analytics
- Notifications

Depends on:

- Foundation
- Identity
- Organization

### Notifications

Delivers platform and product messages.

Owns:

- Notification records
- Read/unread state
- Delivery preferences
- Delivery channels

Must not own:

- Marketing campaigns
- Business decisions
- Product-specific workflows

Depends on:

- Foundation
- Identity
- Organization

### Storage

Provides shared file storage.

Owns:

- Stored files
- File metadata
- File visibility
- Temporary URLs
- Storage disks/providers

Must not own:

- Document approval workflows
- Payment receipts as business concepts
- Moderation rules

Depends on:

- Foundation
- Identity
- Organization

### Integrations

Manages external provider connections.

Owns:

- Integration accounts
- OAuth tokens
- Provider metadata
- Connection status

Must not own:

- Product-specific sync rules
- Payment business rules
- Booking conflict rules

Depends on:

- Foundation
- Identity
- Organization

### Platform Runtime

Provides technical cross-platform capabilities.

Owns:

- Domain event dispatching
- Integration event contracts
- Internal API authentication
- Webhooks
- Health checks
- Queues and jobs conventions
- Observability primitives

Must not own:

- Business decisions
- Product workflows

Depends on:

- Foundation

## 5. Business Capabilities

These capabilities represent business behavior that may be used by one or more products.

```txt
Business Capabilities

├── CRM
├── Scheduling
├── Service Execution
├── Documents
├── Payments
├── Automation
├── Marketing
├── Community
├── Messaging
├── Reporting
└── Analytics
```

### CRM

Manages commercial and operational opportunities.

Owns:

- Leads
- Pipelines
- Pipeline stages
- Tasks
- Activities
- Lead assignment
- Lead conversion
- Customer records as CRM concepts

Primary product:

- Wizzy Manager

May be used by:

- We Move Experience
- We Move Connect
- We Move Network

### Scheduling

Coordinates availability and bookings.

Owns:

- Availability
- Meeting services
- Bookings
- Time slots
- Calendar synchronization
- Booking reminders

Primary product:

- Wizzy Calendar

May be used by:

- Wizzy Manager
- We Move Connect
- We Move Experience

### Service Execution

Executes services for customers.

Owns:

- Service orders
- Service order status
- Agent assignments
- Customer progress
- Service lifecycle

Primary product:

- We Move Connect

May be used by:

- Wizzy Manager

### Documents

Manages document requests and uploaded documents.

Owns:

- Document requests
- Uploaded documents
- Document review
- Document approval
- Document rejection
- Document status

Primary product:

- We Move Connect

Depends on:

- Storage

### Payments

Manages payments and payment states.

Owns:

- Payments
- Payment attempts
- Payment confirmations
- Payment provider callbacks
- Receipts
- Refund references

Primary product:

- We Move Connect

May be used by:

- Wizzy Manager
- Future billing/subscription products

### Automation

Automates business workflows.

Owns:

- Automation rules
- Triggers
- Actions
- Scheduled automation
- Event-based automation

Primary product:

- Wizzy Manager

May be used by:

- We Move Connect
- Wizzy Calendar

### Marketing

Captures public demand.

Owns:

- Landing pages
- Public forms
- Form submissions
- Campaigns
- Public content

Primary product:

- We Move Experience

May feed:

- CRM

### Community

Supports social and professional interactions.

Owns:

- Profiles
- Posts
- Comments
- Reactions
- Connections
- Groups
- Company pages
- Moderation reports

Primary product:

- We Move Network

May feed:

- CRM
- Marketing

### Messaging

Supports direct or contextual communication.

Owns:

- Conversations
- Messages
- Participants
- Message read state

Potential products:

- We Move Network
- We Move Connect
- Wizzy Manager

Status:

- Future capability

### Reporting

Provides operational reports.

Owns:

- Report definitions
- Report exports
- Product-level reporting views

Primary product:

- Wizzy Manager

### Analytics

Provides platform-level insights.

Owns:

- Metrics
- Dashboards
- Aggregations
- Product usage insights

Status:

- Future capability

## 6. Product Experience Capabilities

These capabilities deliver user-facing experiences by composing core and business capabilities.

```txt
Product Experiences

├── Wizzy Manager
├── We Move Connect
├── We Move Experience
├── Wizzy Calendar
└── We Move Network
```

### Wizzy Manager

Composes:

- Identity
- Organization
- Authorization
- CRM
- Automation
- Reporting
- Notifications
- Audit

Purpose:

Operational backoffice and CRM.

### We Move Connect

Composes:

- Identity
- Organization
- Authorization
- Service Execution
- Documents
- Payments
- Scheduling
- Notifications
- Storage
- Audit

Purpose:

Customer and agent portal for service execution.

### We Move Experience

Composes:

- Marketing
- CRM
- Scheduling
- Storage
- Analytics

Purpose:

Public website and lead acquisition experience.

### Wizzy Calendar

Composes:

- Identity
- Organization
- Authorization
- Scheduling
- Integrations
- Notifications

Purpose:

Scheduling product and calendar infrastructure.

### We Move Network

Composes:

- Identity
- Organization
- Authorization
- Community
- Messaging
- Notifications
- Storage
- Moderation

Purpose:

Community and social product.

## 7. Operational Capabilities

These capabilities support running the platform.

```txt
Operations

├── Deployment
├── Monitoring
├── Security Operations
├── Backups
├── Incident Response
├── Data Governance
└── Support Operations
```

## 8. Initial Dependency Direction

```txt
Foundation
   ↓
Identity
   ↓
Organization
   ↓
Authorization
   ↓
Business Capabilities
   ↓
Product Experiences
```

Additional cross-cutting capabilities:

```txt
Audit
Notifications
Storage
Integrations
Platform Runtime
```

These support business and product capabilities, but should not own their business rules.

## 9. Capability Classification

| Capability | Layer | Status |
|---|---|---|
| Foundation | Platform Core | Active |
| Identity | Platform Core | Planned |
| Organization | Platform Core | Planned |
| Authorization | Platform Core | Planned |
| Audit | Platform Core | Planned |
| Notifications | Platform Core | Planned |
| Storage | Platform Core | Planned |
| Integrations | Platform Core | Planned |
| Platform Runtime | Platform Core | Planned |
| CRM | Business | Planned |
| Scheduling | Business | Planned |
| Service Execution | Business | Planned |
| Documents | Business | Planned |
| Payments | Business | Planned |
| Automation | Business | Planned |
| Marketing | Business | Planned |
| Community | Business | Planned |
| Messaging | Business | Future |
| Reporting | Business | Future |
| Analytics | Business | Future |
| Deployment | Operations | Future |
| Monitoring | Operations | Future |
| Security Operations | Operations | Future |
| Backups | Operations | Future |
| Incident Response | Operations | Future |
| Data Governance | Operations | Future |

## 10. Rules

1. A product should not duplicate a capability.
2. A capability should have one clear reason to exist.
3. Foundation depends on nothing.
4. Core capabilities should not contain product-specific behavior.
5. Business capabilities may be composed by multiple products.
6. Product experiences compose capabilities; they should not become architecture centers.
7. New capabilities require documentation before implementation.
8. A capability becomes Active only after Architecture Review.
9. Every capability must follow `CAPABILITY_TEMPLATE.md`.
10. Every capability must respect the Ubiquitous Language.

## 11. Open Questions

1. Should Payments be its own capability or remain inside Service Execution at first?
2. Should Documents be separate from Service Execution from day one?
3. Should Messaging be part of Community first or remain future capability?
4. Should Reporting and Analytics be separated from the beginning?
5. Should Platform Runtime own event contracts or should each capability own its contracts?
6. Should Billing/Subscriptions become a separate business capability?
7. Should Support Operations become a product later?

## 12. First Architecture Decision From This Landscape

Foundation is the root capability.

It has no dependencies.

Every other capability may depend on Foundation.

Therefore, Foundation is the first capability allowed to evolve in Architecture v1.0.
