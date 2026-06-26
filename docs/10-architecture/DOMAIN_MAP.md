# We Move Platform Domain Map

> Connecting people, opportunities and services without borders.

## 1. Purpose

This document defines the strategic domain map of We Move Platform.

It describes the main business capabilities, their boundaries, their responsibilities, and how they relate to each other.

This document sits between `ARCHITECTURE.md` and `DOMAIN_MODEL.md`.

```txt
VISION
↓
ARCHITECTURE
↓
DOMAIN_MAP
↓
DOMAIN_MODEL
↓
ENGINEERING_GUIDE
↓
CODE
```

## 2. Strategic View

We Move Platform is organized around business capabilities, not framework folders.

```txt
We Move Platform
├── Core
│   ├── Foundation
│   ├── Identity
│   ├── Organization
│   ├── Authorization
│   ├── Audit
│   ├── Notifications
│   ├── Storage
│   ├── Integrations
│   └── Platform
│
└── Products
    ├── CRM
    ├── Service Execution
    ├── Marketing
    ├── Scheduling
    └── Community
```

## 3. Core Domains

## 3.1 Foundation

### Purpose

Provides low-level platform configuration and shared operational primitives.

### Owns

- Settings
- Localization
- Timezones
- Currencies
- Countries
- Cities
- Platform configuration

### Does Not Own

- Product-specific settings
- CRM workflows
- Booking rules
- Payment rules

### Example Actions

- UpdatePlatformSetting
- ResolveTimezone
- ResolveCurrency

---

## 3.2 Identity

### Purpose

Defines who can access the platform.

### Owns

- Users
- Authentication
- Sessions
- Credentials
- Password reset
- Email verification
- Future MFA
- Future SSO

### Does Not Own

- Company permissions
- CRM contacts
- Customers without access
- Social profiles

### Example Actions

- RegisterUser
- AuthenticateUser
- VerifyEmail
- ResetPassword
- DisableUser

### Publishes Events

- UserRegistered
- UserLoggedIn
- UserDisabled
- EmailVerified

---

## 3.3 Organization

### Purpose

Defines companies and the relationship between users and companies.

### Owns

- Companies
- Memberships
- Invitations
- Teams
- Departments
- Offices

### Does Not Own

- Leads
- Customers
- Service orders
- Bookings
- Posts

### Example Actions

- CreateCompany
- InviteMember
- AcceptInvitation
- RemoveMember
- SwitchActiveCompany
- CreateTeam

### Publishes Events

- CompanyCreated
- MemberInvited
- InvitationAccepted
- MemberRemoved
- ActiveCompanyChanged

---

## 3.4 Authorization

### Purpose

Defines what users can do inside a company or product.

### Owns

- Roles
- Permissions
- Role assignments
- Permission checks
- Policies

### Does Not Own

- Authentication
- Product workflows
- UI visibility rules as security

### Example Actions

- AssignRole
- RevokeRole
- GrantPermission
- RevokePermission

### Publishes Events

- RoleAssigned
- RoleRevoked
- PermissionGranted
- PermissionRevoked

---

## 3.5 Audit

### Purpose

Records important business and security events.

### Owns

- Audit logs
- Actor
- Auditable target
- Metadata
- IP/user agent when useful

### Does Not Own

- Product timelines
- Analytics
- Notifications

### Example Actions

- RecordAuditLog
- SearchAuditLogs

---

## 3.6 Notifications

### Purpose

Sends messages to users through platform channels.

### Owns

- Notification records
- Notification preferences
- Delivery channels
- Read/unread state

### Does Not Own

- Marketing campaigns
- Product-specific notification meaning
- External provider-specific business logic

### Example Actions

- SendNotification
- MarkNotificationAsRead
- UpdateNotificationPreferences

---

## 3.7 Storage

### Purpose

Provides shared file storage abstraction.

### Owns

- Stored files
- File metadata
- File visibility
- File disk/provider
- Temporary URLs

### Does Not Own

- Document approval workflows
- Payment receipts as business objects
- Social media moderation rules

### Example Actions

- StoreFile
- DeleteFile
- GenerateTemporaryFileUrl

---

## 3.8 Integrations

### Purpose

Manages external accounts and provider connections.

### Owns

- Integration accounts
- OAuth tokens
- Provider metadata
- Connection status

### Does Not Own

- Product-specific sync rules
- Calendar booking logic
- Payment confirmation logic

### Example Actions

- ConnectIntegrationAccount
- RefreshIntegrationToken
- DisconnectIntegrationAccount

### Publishes Events

- IntegrationConnected
- IntegrationDisconnected
- IntegrationTokenRefreshed

---

## 3.9 Platform

### Purpose

Provides cross-product technical capabilities.

### Owns

- Internal APIs
- Webhooks
- Domain events
- Jobs
- Service-to-service authentication
- Platform health

### Does Not Own

- Product business behavior

### Example Actions

- VerifyInternalRequest
- DispatchDomainEvent
- RegisterWebhookEndpoint

---

# 4. Product Domains

## 4.1 CRM

Primary product owner: Wizzy Manager.

### Purpose

Manages commercial and operational opportunities.

### Owns

- Leads
- Pipelines
- Pipeline stages
- Tasks
- Activities
- Students/customers as CRM records
- Lead assignment
- Lead conversion

### Does Not Own

- Authenticated users
- Company membership
- Service order execution
- Public landing pages

### Example Actions

- CreateLead
- AssignLead
- MoveLeadToStage
- ConvertLead
- CreateTask
- CompleteTask

### Publishes Events

- LeadCreated
- LeadAssigned
- LeadMovedToStage
- LeadConverted
- TaskCreated
- TaskCompleted

### Consumes Events

- FormSubmitted
- BookingCreated
- PaymentConfirmed

---

## 4.2 Service Execution

Primary product owner: We Move Connect.

### Purpose

Executes services for customers and agents.

### Owns

- Service orders
- Services
- Document requests
- Uploaded documents
- Agent assignments
- Service status
- Customer portal workflows

### Does Not Own

- Lead capture
- Public marketing forms
- Calendar availability
- Social profiles

### Example Actions

- CreateServiceOrder
- AssignAgent
- RequestDocument
- UploadRequestedDocument
- ApproveDocument
- RejectDocument
- ChangeServiceOrderStatus

### Publishes Events

- ServiceOrderCreated
- AgentAssigned
- DocumentRequested
- DocumentUploaded
- DocumentApproved
- DocumentRejected
- ServiceOrderStatusChanged

### Consumes Events

- LeadConverted
- PaymentConfirmed
- BookingCreated

---

## 4.3 Marketing

Primary product owner: We Move Experience.

### Purpose

Captures demand and turns public interest into leads.

### Owns

- Landing pages
- Public forms
- Campaigns
- Form submissions
- Public content

### Does Not Own

- CRM pipeline lifecycle
- Authenticated customer portal
- Service execution

### Example Actions

- CreateLandingPage
- PublishLandingPage
- CreatePublicForm
- SubmitPublicForm
- CreateCampaign

### Publishes Events

- FormSubmitted
- LandingPagePublished
- CampaignCreated

---

## 4.4 Scheduling

Primary product owner: Wizzy Calendar.

### Purpose

Coordinates availability and bookings.

### Owns

- Availability
- Meeting services
- Bookings
- Calendar connections
- External calendar sync
- Booking reminders

### Does Not Own

- CRM lead lifecycle
- Service order execution
- Payment confirmation

### Example Actions

- CreateAvailability
- CreateMeetingService
- CreateBooking
- CancelBooking
- SyncExternalCalendar
- SendBookingReminder

### Publishes Events

- BookingCreated
- BookingCancelled
- CalendarConnected
- CalendarSyncFailed

### Consumes Events

- LeadCreated
- ServiceOrderCreated
- IntegrationConnected

---

## 4.5 Community

Primary product owner: We Move Network.

### Purpose

Creates social and professional connections inside the ecosystem.

### Owns

- Profiles
- Posts
- Comments
- Reactions
- Connections
- Groups
- Company pages
- Moderation reports

### Does Not Own

- CRM lead ownership
- Company membership
- Core identity
- Service execution

### Example Actions

- CreateProfile
- PublishPost
- CommentOnPost
- ReactToPost
- ConnectWithProfile
- CreateGroup
- ReportContent

### Publishes Events

- ProfileCreated
- PostPublished
- ConnectionCreated
- GroupCreated
- ContentReported

### Consumes Events

- UserRegistered
- CompanyCreated

---

# 5. Context Relationships

```txt
Marketing
   └── FormSubmitted
          ↓
CRM
   └── LeadCreated
          ↓
Scheduling
   └── BookingCreated
          ↓
Service Execution
   └── ServiceOrderCreated
          ↓
Payments / Documents / Customer Portal
```

```txt
Identity
   ↓
Organization
   ↓
Authorization
   ↓
All Products
```

```txt
Community
   ├── may create opportunities
   ├── may generate leads
   └── may strengthen long-term engagement
```

## 6. Dependency Rules

Allowed dependencies:

```txt
Products → Core
Product → Product API contract
Product → Domain event contract
```

Avoid:

```txt
Core → Product
Product → Product database directly
Product → Product internal models directly
```

## 7. Design Rule

When adding a new feature, ask:

1. Which domain owns this behavior?
2. Is this Core or product-specific?
3. Is this a command/action, event, query or policy?
4. Does another domain need to react?
5. Should this produce an ADR?
6. What test proves the expected behavior?
