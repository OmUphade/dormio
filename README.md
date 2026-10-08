# Dormio

> **One platform for student and working-professional living:** Find a hostel, PG or mess by area, manage your stay with zero paperwork, and run operations effortlessly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stack: JavaScript Only](<https://img.shields.io/badge/Stack-JavaScript%20(ESM)-blue.svg>)](#technology-stack)
[![DB: PostgreSQL 16 + PostGIS](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20PostGIS-336791.svg)](#technology-stack)

---

## 🌟 What is Dormio?

Dormio is not a generic single-hostel management tool. It unites three experiences in a single, high-performance modular monolith:

1. **Marketplace (Discovery):** Search verified hostels, PGs, and messes by campus, college, or neighborhood. Compare rents, room sharing, safety amenities (CCTV, curfews), and read reviews from verified resident stays.
2. **Stay Manager (Residents & Subscribers):** Manage daily student life without paperwork: direct UPI rent payments, instant UTR submission, maintenance complaint tracking, digital notices, meal schedule with skip-meal credits, and rotating gate QR passes.
3. **Operator Console (Owners & Institutions):** Management platform for private owners, mess managers, and educational institutions (colleges/universities) with bed inventory allotment, staff-verified UPI receipts, gate logs, and KPI analytics.

---

## 🏗️ Technology Stack (100% Free & Open Source)

- **Frontend (`apps/web`):** Next.js (React, App Router) in JavaScript/JSX + Tailwind CSS + shadcn/ui.
- **Backend (`apps/api`):** Node.js LTS + Express 5 in JavaScript ES modules (`"type": "module"`).
- **Database & Search:** PostgreSQL 16 + PostGIS (geospatial radius & area queries) + pgvector + pg_trgm with Drizzle ORM.
- **Cache & Queues:** Valkey + BullMQ.
- **Storage:** MinIO (S3-compatible object storage).
- **Design System:** Rigorously generated via UI UX Pro Max skill (`design-system/dormio/MASTER.md`).
- **Language Policy:** Strict JavaScript (ES modules + JSX) with JSDoc and Zod runtime schema validation. TypeScript is strictly prohibited.

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites

- Docker Desktop
- Node.js LTS (v22+)
- pnpm (`corepack enable`)
- Python 3

### 2. Setup Services

```bash
# Clone the repository
git clone https://github.com/OmUphade/dormio.git
cd dormio

# Copy environment template
cp .env.example .env

# Start local infrastructure (Postgres, Valkey, MinIO, Mailpit)
docker compose up -d
```

### 3. Verify Local Services

```bash
docker compose ps
```

- PostgreSQL: `localhost:5433` (mapped from 5432)
- Valkey: `localhost:6379`
- MinIO Console: `http://localhost:9001` (user: `dormio`, password: `dormio_dev_password`)
- Mailpit Web UI: `http://localhost:8025`

---

## 📚 Documentation Index

| Document                                                           | Purpose                                                        |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| [`docs/PRD.md`](docs/PRD.md)                                       | Product Requirements Document                                  |
| [`docs/architecture.md`](docs/architecture.md)                     | System Architecture & Data Model                               |
| [`docs/Design.md`](docs/Design.md)                                 | Design rules and mandatory UI Gate                             |
| [`docs/rules.md`](docs/rules.md)                                   | Engineering conventions and agent rules                        |
| [`docs/task.md`](docs/task.md)                                     | 149-task execution plan across 16 phases                       |
| [`docs/memory.md`](docs/memory.md)                                 | Living project memory and architectural decisions              |
| [`docs/BOOTSTRAP.md`](docs/BOOTSTRAP.md)                           | Initial setup instructions                                     |
| [`docs/PROMPTS.md`](docs/PROMPTS.md)                               | Prompt sequence for Antigravity                                |
| [`design-system/dormio/MASTER.md`](design-system/dormio/MASTER.md) | Design System Master (tokens, fonts, shape language)           |
| [`presentation-diagrams/`](presentation-diagrams/)                 | High-resolution presentation diagrams (ER, Use Case, Sequence) |

---

## 🔒 Branch & Contribution Policy

See [`.github/BRANCH_PROTECTION.md`](.github/BRANCH_PROTECTION.md) for branch protection settings and merge rules.

## 📄 License

This project is open-source under the [MIT License](LICENSE).
