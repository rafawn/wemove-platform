# Security

## 1. Principles

- Security is a platform responsibility.
- Authorization must happen on the backend.
- Sensitive actions must be audited.
- Secrets must not be stored in the repository.
- Internal APIs must be protected.

## 2. Sensitive Areas

- Authentication.
- Payments.
- Documents.
- Personal data.
- Calendar tokens.
- OAuth integrations.
- Internal service credentials.

## 3. Audit Logging

Audit logs should record important actions such as:

- Login events.
- Role changes.
- Permission changes.
- Document approvals.
- Payment updates.
- Service order changes.
- Tenant/company changes.
