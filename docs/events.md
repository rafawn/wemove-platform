# Events

## 1. Goal

Use events to decouple products and workflows.

## 2. Event Examples

- UserRegistered
- CompanyCreated
- LeadCreated
- LeadConverted
- BookingCreated
- PaymentConfirmed
- DocumentUploaded
- DocumentApproved
- ServiceOrderCreated

## 3. Rules

- Events should describe something that already happened.
- Use past tense names.
- Keep payloads stable.
- Avoid sending entire models when a compact payload is enough.
- Use queues for asynchronous listeners.

## 4. When to Use Events

Use events when:

- Another module or product may react to something.
- The operation can happen asynchronously.
- You want to reduce direct coupling.

Do not use events when a direct response is required immediately.
