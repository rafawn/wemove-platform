# We Move Platform Ubiquitous Language

> Connecting people, opportunities and services without borders.

## 1. Purpose

This document defines the official language of We Move Platform.

The same concept must always use the same name in:

- Code
- Tests
- Documentation
- API contracts
- Events
- Database tables
- Product conversations

If a concept is not listed here, it should be discussed before becoming part of the codebase.

## 2. Language Rules

### 2.1 Code Language

Code must be written in English.

Examples:

```php
RegisterUser
CreateCompany
InviteMember
ServiceOrder
Booking
LeadCreated
```

### 2.2 Avoid Free Translations

Once a term is chosen, do not use alternatives casually.

Example:

Use:

```txt
ServiceOrder
```

Avoid:

```txt
Order
Case
Process
Application
MigrationOrder
```

### 2.3 Events

Events must be written in past tense.

Use:

```txt
LeadCreated
BookingCreated
PaymentConfirmed
```

Avoid:

```txt
CreateLead
NewBooking
ConfirmPayment
```

### 2.4 Actions

Actions must express business intent.

Use:

```txt
RegisterUser
InviteMember
CreateBooking
ApproveDocument
```

Avoid vague names:

```txt
UserService
CompanyManager
ProcessHandler
```

## 3. Core Terms

| Term | Definition | Owner |
|---|---|---|
| Platform | The complete We Move ecosystem composed of Core and products. | Core |
| Core | Shared foundation used by all products. | Core |
| Product | A specific application built on top of the platform. | Core |
| User | A person with authenticated access to the platform. | Identity |
| Credential | Authentication secret or method used by a user. | Identity |
| Session | Authenticated user session. | Identity |
| Company | Organization using We Move Platform. | Organization |
| Membership | Relationship between a User and a Company. | Organization |
| Invitation | Request for a person to join a Company. | Organization |
| Team | Group of users inside a Company. | Organization |
| Department | Organizational unit inside a Company. | Organization |
| Role | Named set of permissions. | Authorization |
| Permission | Specific ability to perform an action. | Authorization |
| Tenant | Logical boundary for isolating company data. | Organization / Platform |
| AuditLog | Record of an important business or security action. | Audit |
| Notification | Message delivered to a user through one or more channels. | Notifications |
| StoredFile | Generic file stored by the platform. | Storage |
| IntegrationAccount | External account connected to the platform. | Integrations |
| Webhook | HTTP callback sent or received by the platform. | Platform |
| DomainEvent | Event representing something meaningful that happened. | Platform |

## 4. Product Terms

## 4.1 CRM / Wizzy Manager

| Term | Definition | Use Instead Of |
|---|---|---|
| Lead | Person or organization representing a commercial opportunity. | Prospect, interested person |
| Pipeline | Configurable workflow for managing leads or opportunities. | Funnel |
| PipelineStage | Step inside a Pipeline. | Status, phase |
| Task | Action assigned to a user. | Todo |
| Activity | Timeline record of something that happened in a CRM context. | Log entry |
| Customer | Person or organization that has contracted or is receiving a service. | Client |
| Student | Customer receiving education/migration-related services when the business context requires that term. | Applicant |
| Assignment | Relationship between a record and the user responsible for it. | Ownership |

## 4.2 Service Execution / We Move Connect

| Term | Definition | Use Instead Of |
|---|---|---|
| Service | Productized service offered by a company. | Product, package |
| ServiceOrder | Unit of work created to execute a service for a customer. | Case, process, order |
| Agent | User responsible for executing or supporting a service. | Advisor, operator |
| DocumentRequest | Request asking a customer to upload a specific document. | Requirement |
| UploadedDocument | File uploaded in response to a DocumentRequest. | Attachment |
| Payment | Payment or payment attempt related to a service or service order. | Charge |
| PaymentAttempt | Specific attempt to collect a payment. | Transaction attempt |
| PaymentConfirmation | Confirmation that a payment succeeded. | Receipt |

## 4.3 Marketing / We Move Experience

| Term | Definition | Use Instead Of |
|---|---|---|
| LandingPage | Public page designed for acquisition or conversion. | Page |
| PublicForm | Form visible to unauthenticated visitors. | Website form |
| FormSubmission | Data submitted through a PublicForm. | Response |
| Campaign | Marketing initiative tied to content, traffic or conversion. | Promotion |
| ContentPage | Public informational page. | Article/page when ambiguous |

## 4.4 Scheduling / Wizzy Calendar

| Term | Definition | Use Instead Of |
|---|---|---|
| Availability | Rules defining when bookings can happen. | Schedule |
| MeetingService | Type of meeting that can be booked. | Event type |
| Booking | Reserved appointment with a start and end time. | Appointment |
| CalendarConnection | External calendar account connection. | Calendar integration |
| CalendarEvent | Event synchronized from or to an external calendar. | External event |
| TimeSlot | Candidate time range available for booking. | Slot |
| Reminder | Notification scheduled before an event. | Alert |

## 4.5 Community / We Move Network

| Term | Definition | Use Instead Of |
|---|---|---|
| Profile | Public or semi-public identity inside the network. | Account page |
| Post | Content published by a profile or company page. | Publication |
| Comment | Response to a Post. | Reply |
| Reaction | Lightweight response to a Post or Comment. | Like, emoji |
| Connection | Relationship between two profiles. | Friend |
| Group | Community space around a topic or purpose. | Community |
| CompanyPage | Public presence of a company in the network. | Business profile |
| ModerationReport | Report of content or behavior that may violate rules. | Complaint |

## 5. Terms To Avoid

Avoid these unless explicitly approved:

| Avoid | Prefer |
|---|---|
| Client | Customer |
| Case | ServiceOrder |
| Process | ServiceOrder or Workflow, depending on context |
| Order | ServiceOrder |
| Funnel | Pipeline |
| Status | PipelineStage or state, depending on context |
| Appointment | Booking |
| Attachment | StoredFile or UploadedDocument |
| Advisor | Agent |
| Prospect | Lead |

## 6. Naming Standards

### Classes

```txt
RegisterUser
CreateCompany
InviteMember
CreateLead
MoveLeadToStage
CreateServiceOrder
RequestDocument
CreateBooking
PublishPost
```

### Events

```txt
UserRegistered
CompanyCreated
MemberInvited
LeadCreated
ServiceOrderCreated
DocumentUploaded
PaymentConfirmed
BookingCreated
PostPublished
```

### Tables

Use plural snake_case:

```txt
users
companies
memberships
roles
permissions
leads
pipelines
pipeline_stages
service_orders
document_requests
uploaded_documents
payments
bookings
posts
comments
```

### Routes

Use kebab-case for URL segments:

```txt
/service-orders
/document-requests
/calendar-connections
/company-pages
```

## 7. Open Language Questions

These terms require future confirmation:

1. Should `Customer` and `Student` be separate concepts or should Student be a customer subtype?
2. Should `Tenant` be visible in product language or remain technical/internal?
3. Should `Agent` be used across all products or only in We Move Connect?
4. Should `ServiceOrder` represent all services or only paid services?
5. Should `CompanyPage` belong fully to Network or be shared with Organization?
