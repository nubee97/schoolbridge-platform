# SchoolBridge Platform

**SchoolBridge** is a multi-tenant parent engagement and school operations platform designed to help schools communicate with parents in real time through private child feeds, attendance records, reports, homework updates, announcements, and teacher-parent engagement tools.

The product vision is to combine:

- **Korean-style parent engagement** — daily child updates, emotional trust, private activity feeds
- **US SaaS scalability** — clean workflows, subscription readiness, multi-tenant structure
- **Nigeria-first practicality** — mobile-first experience, affordable deployment, WhatsApp/SMS-ready communication

SchoolBridge is designed to become a digital bridge between schools, teachers, parents, and students.

---

## Project Status

This repository contains the working MVP foundation for SchoolBridge.

It is not a static design mockup. The current version is connected to Supabase and supports real database-backed actions for core school workflows.

Current maturity level:

- Frontend MVP: active
- Supabase schema: active
- Seed data: available
- Admin/Teacher/Parent workflows: partially functional
- Authentication: pending production implementation
- Secure RLS policies: pending production hardening
- Media upload: pending full Supabase Storage integration

---

## Core Product Concept

SchoolBridge follows a **B2B2C multi-tenant SaaS model**.

The platform serves:

1. **Schools** as paying institutional customers
2. **Teachers** as daily content and operations users
3. **Parents** as engagement users
4. **Students** as the central data and experience layer

Each school operates as an isolated tenant inside the platform.

```text
SchoolBridge Core Platform
        │
        ├── School A
        │     ├── Admins
        │     ├── Teachers
        │     ├── Classes
        │     ├── Students
        │     └── Parents
        │
        ├── School B
        │     ├── Admins
        │     ├── Teachers
        │     ├── Classes
        │     ├── Students
        │     └── Parents
        │
        └── School C
              ├── Admins
              ├── Teachers
              ├── Classes
              ├── Students
              └── Parents