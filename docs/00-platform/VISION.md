# We Move Platform Vision

> Connecting people, opportunities and services without borders.

## 1. Purpose

We Move Platform exists to connect people, companies, opportunities and services across borders through a unified digital ecosystem.

The platform is not a single application. It is the foundation for multiple products that work together:

- Wizzy Manager
- We Move Connect
- We Move Experience
- Wizzy Calendar
- We Move Network
- Future We Move products

Each product solves a specific problem, but all of them share a common vision: making international mobility, collaboration and service management simpler, more connected and more human.

## 2. What We Move Platform Is

We Move Platform is a product ecosystem for:

- Capturing opportunities.
- Managing relationships.
- Coordinating services.
- Scheduling meetings.
- Connecting communities.
- Supporting international mobility processes.
- Giving teams a shared operational foundation.

It should feel like one coherent platform, even when each product has its own responsibilities and deployment lifecycle.

## 3. What We Move Platform Is Not

We Move Platform is not only:

- A CRM.
- A calendar.
- A social network.
- A customer portal.
- A website.
- A document management system.

Those are products or modules built on top of the platform.

## 4. Product Ecosystem

```txt
We Move Platform
├── Core
├── Wizzy Manager
├── We Move Connect
├── We Move Experience
├── Wizzy Calendar
└── We Move Network
```

## 5. Core Philosophy

The Core must contain only what is shared across products.

Examples:

- Identity
- Users
- Companies
- Tenants
- Roles and permissions
- Audit logs
- Notifications
- Files
- Integrations
- Internal APIs
- Shared configuration

The Core must not contain product-specific business logic.

## 6. Architectural Principles

1. Build modularly before building distributed systems.
2. Avoid microservices until there is a real operational need.
3. Products may depend on the Core; the Core must not depend on products.
4. Prefer clear boundaries over shared shortcuts.
5. Keep data ownership explicit.
6. Document every important architectural decision.
7. Prefer boring, reliable technology.
8. Optimize for developer experience.
9. Security is not a feature; it is a platform responsibility.
10. The platform should evolve without forcing every product to change at the same time.

## 7. Long-Term Vision

In the long term, We Move Platform should become the operating system for the We Move ecosystem.

A user should be able to:

1. Discover We Move through public content.
2. Register through a unified identity layer.
3. Interact with the community.
4. Become a lead or customer.
5. Schedule meetings.
6. Upload documents.
7. Pay for services.
8. Track their process.
9. Receive notifications.
10. Continue interacting with the ecosystem after the service is complete.

## 8. Decision-Making Rule

Every major decision should answer this question:

> Does this move We Move Platform closer to becoming a coherent, scalable and reliable product ecosystem?

If the answer is no, the decision should be reconsidered.
