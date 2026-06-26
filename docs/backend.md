# Backend Guidelines

## 1. Laravel Structure

Prefer Laravel conventions.

For complex domains, use:

- Actions
- Services
- Events
- Jobs
- Policies
- Form Requests
- Data Transfer Objects when useful

## 2. Business Logic

Avoid placing complex business logic directly in controllers.

Controllers should coordinate requests and responses.

## 3. Testing

Important behavior should be covered by tests.

Prioritize:

- Auth flows.
- Tenant isolation.
- Permissions.
- Payments.
- Bookings.
- Lead workflows.
