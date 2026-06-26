# Deployment

## 1. Goal

Support reliable deployments for each product.

## 2. Initial Requirements

- Docker-based environments.
- PostgreSQL.
- Redis.
- Queue workers.
- Scheduler.
- Reverb where realtime is needed.
- Object storage for files.

## 3. Deployment Principles

- Products should become independently deployable.
- Environment variables must be documented.
- Secrets must never be committed.
- Migrations should be safe for production.
- Queues should be restarted after deployment.
