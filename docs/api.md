# API Strategy

## 1. API Types

We Move Platform may expose:

- Public APIs.
- Internal APIs.
- Product-to-product APIs.
- Webhook endpoints.

## 2. Internal APIs

Internal APIs should be protected using one or more of:

- Service tokens.
- Signed requests.
- IP restrictions.
- Rate limiting.
- Audit logs.

## 3. API Design Rules

- Use clear resource names.
- Version APIs when external consumers depend on them.
- Validate every request.
- Return consistent error structures.
- Avoid exposing internal implementation details.
