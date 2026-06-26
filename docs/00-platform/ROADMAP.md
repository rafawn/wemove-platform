# We Move Platform Roadmap

## Phase 0: Foundation

Goal: create the architectural and documentation foundation.

Deliverables:

- VISION.md
- ARCHITECTURE.md
- ROADMAP.md
- AGENTS.md
- Initial ADRs
- Domain glossary
- Module map

## Phase 1: Core MVP

Goal: build the minimum shared foundation.

Deliverables:

- Laravel project setup.
- Authentication.
- Users.
- Companies.
- Tenants.
- Roles and permissions.
- Basic audit log.
- Basic notifications.
- File storage abstraction.
- Internal API authentication.

Success criteria:

- A user can log in.
- A company can be created.
- A user can belong to a company.
- Roles and permissions work.
- Activity can be audited.

## Phase 2: Wizzy Manager MVP

Goal: build the operational center.

Deliverables:

- Leads.
- Pipelines.
- Stages.
- Tasks.
- Notes.
- Activity timeline.
- Basic automations.
- Basic reports.

Success criteria:

- A lead can be created from an internal form.
- A lead can move through a pipeline.
- A task can be assigned.
- The system records activity.

## Phase 3: We Move Experience MVP

Goal: capture leads from public channels.

Deliverables:

- Public pages.
- Lead forms.
- Campaign forms.
- SEO basics.
- Integration with Wizzy Manager.

Success criteria:

- A public form creates a lead in Wizzy Manager.

## Phase 4: We Move Connect MVP

Goal: give customers and agents a portal.

Deliverables:

- Customer portal.
- Agent portal.
- Service orders.
- Document uploads.
- Payment status.
- Appointment tracking.

Success criteria:

- A customer can view their process.
- A customer can upload documents.
- A payment can be registered or synchronized.
- An agent can track assigned work.

## Phase 5: Wizzy Calendar MVP

Goal: provide scheduling as a product.

Deliverables:

- Availability.
- Meeting services.
- Booking pages.
- Google Calendar integration.
- Microsoft Calendar integration.
- Reminders.

Success criteria:

- A public booking link creates a valid appointment.
- Calendar conflicts are respected.
- The event syncs with external calendars.

## Phase 6: We Move Network MVP

Goal: create the first version of the community.

Deliverables:

- Profiles.
- Posts.
- Comments.
- Reactions.
- Connections.
- Company pages.
- Groups.
- Moderation basics.

Success criteria:

- Users can create profiles.
- Users can publish posts.
- Users can connect with others.
- Activity can generate leads or opportunities.

## Phase 7: Platform Maturity

Goal: improve scale, observability and governance.

Deliverables:

- Advanced analytics.
- Advanced automations.
- Event bus improvements.
- Product-specific scaling.
- Security hardening.
- More ADRs.
- Operational dashboards.
