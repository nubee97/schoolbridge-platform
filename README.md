# SchoolBridge Platform

<div align="center">

## A Real-Time Parent Engagement & School Operations Platform

SchoolBridge is a multi-tenant education platform designed to become the digital bridge between schools and families.

Built with:
Korean-style parent engagement, 🇺🇸 US SaaS scalability, 🇳🇬 Nigeria-first practicality

</div>

---

# Table of Contents

- [Vision](#vision)
- [Project Status](#project-status)
- [Core Platform Model](#core-platform-model)
- [What Works Now](#what-works-now)
- [Main Features](#main-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Supabase Setup](#supabase-setup)
- [Netlify Deployment](#netlify-deployment)
- [Security Notice](#security-notice)
- [Production Features Still Needed](#production-features-still-needed)
- [Development Roadmap](#development-roadmap)
- [Product Philosophy](#product-philosophy)
- [Business Positioning](#business-positioning)
- [Git Workflow](#git-workflow)
- [License](#license)
- [Founder Note](#founder-note)

---

# Vision

SchoolBridge is not just another school management system.

The platform is built around one core belief:

> Schools do not only need administrative software.  
> They need trust infrastructure.

Parents want:
- reassurance
- visibility
- emotional connection
- real-time school updates

Schools want:
- professionalism
- parent trust
- retention
- organized communication

SchoolBridge connects both sides.

---

# Strategic Positioning

SchoolBridge combines:

### 🇰🇷 Korean-Style Parent Engagement
- Daily child updates
- Emotional parent trust
- Private activity feeds
- Albums and reports

### 🇺🇸 US SaaS Scalability
- Multi-tenant architecture
- Clean UX
- Subscription-ready infrastructure
- Modern workflows

### 🇳🇬 Nigeria-First Practicality
- Mobile-first design
- Affordable deployment
- WhatsApp/SMS-ready communication
- Low-tech usability

---

# Project Status

This repository contains the working MVP foundation for SchoolBridge.

The current version is connected to Supabase and supports real database-backed workflows.

| Area | Status |
|---|---|
| Frontend MVP | ✅ Active |
| Supabase Schema | ✅ Active |
| Seed Data | ✅ Available |
| Admin Workflows | ⚠️ Partial |
| Teacher Workflows | ⚠️ Partial |
| Parent Workflows | ⚠️ Partial |
| Authentication | ❌ Pending |
| Secure RLS Policies | ❌ Pending |
| Media Uploads | ❌ Pending |

---

# Core Platform Model

SchoolBridge follows a **B2B2C multi-tenant SaaS model**.

- Schools are the paying institutional customers
- Teachers create daily content and manage operations
- Parents engage with their child’s school life
- Students are the center of the platform experience

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
```

Each school operates as an isolated tenant inside the same infrastructure platform.

---

# What Works Now

## School / Admin Workflows

Admins can:

- Create schools
- Add admin, teacher, and parent profiles
- Create classes
- Add students
- Link parents/guardians to students
- View school-level record counts
- Manage school structure

---

## Teacher Workflows

Teachers can:

- Publish child-specific posts
- Publish class-wide posts
- Publish school-wide posts
- Create updates, reports, homework, announcements, behavior notes, and health notes
- Attach image/PDF URLs to posts
- Mark attendance
- Use AI-style draft helper prompts

---

## Parent Workflows

Parents can:

- Select a parent profile
- View linked child posts
- View class and school-wide updates
- React with heart, clap, or smile
- Comment on posts
- View attendance history

---

## Student Profile Workflows

Student profiles display:

- Student information
- Class assignment
- Linked guardians
- Recent posts
- Attendance history

---

# Main Features

## Private Parent Feed

The parent feed is the emotional center of the product.

Schools and teachers can share:

- Daily child updates
- Classroom photos
- Homework
- Announcements
- Reports
- Behavior notes
- Health notes
- Attendance updates

Goal:

> Help parents feel connected to their child’s school life in real time.

---

## Teacher Upload Studio

The teacher workflow is designed around speed.

### Long-term product goal:

> A teacher should be able to post a useful update in under 15 seconds.

Supported post types:

- Update
- Photo
- Report
- Homework
- Announcement
- Behavior note
- Health note
- Attendance note

---

## Attendance Management

Teachers can mark:

- Present
- Absent
- Late
- Excused

---

## Reactions & Comments

Parents can engage through:

- ❤️ Heart
- 👏 Clap
- 😊 Smile
- Comments

This turns SchoolBridge from a cold portal into a warm engagement platform.

---

## Multi-Tenant Architecture

The database is structured so multiple schools can use the same platform while keeping data isolated by:

```text
school_id
```

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router

---

## Backend

- Supabase
- PostgreSQL
- Supabase Row Level Security
- Supabase SQL Editor

---

## Hosting

- Netlify
- Supabase

---

## Future Infrastructure Direction

At scale, infrastructure may migrate to:

- AWS S3
- AWS CloudFront
- AWS RDS PostgreSQL
- AWS Lambda
- AWS ECS
- AWS SES/SNS

---

# Project Structure

```text
schoolbridge-platform/
│
├── docs/
│
├── public/
│
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── supabase/
│   ├── schema.sql
│   └── seed.sql
│
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Example:

```env
VITE_SUPABASE_URL=https://rqanxemgnqgjbrdshtdw.supabase.co
```

Never commit `.env` to GitHub.

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone https://github.com/nubee97/schoolbridge-platform.git
cd schoolbridge-platform
```

---

## 2. Install Packages

```bash
npm install
```

---

## 3. Add Environment Variables

Create:

```text
.env
```

Add:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 4. Run Supabase Schema

Open:

```text
supabase/schema.sql
```

Go to:

```text
Supabase Dashboard → SQL Editor
```

Paste and run the schema.

---

## 5. Run Seed Data

Open:

```text
supabase/seed.sql
```

Paste into SQL Editor and run.

---

## 6. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Supabase Setup

Current schema creates:

- schools
- profiles
- classes
- students
- student_parents
- feed_posts
- post_media
- comments
- reactions
- attendance
- notifications
- audit_logs

Most tables include:

```text
school_id
```

This supports multi-tenant architecture.

---

# Netlify Deployment

## Build Settings

```text
Build command:
npm run build

Publish directory:
dist
```

---

## Environment Variables

Inside Netlify:

```text
Site Settings → Environment Variables
```

Add:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Redeploy afterward.

---

# Security Notice

⚠️ Current security policies are MVP-level only.

Do NOT use real child data yet.

Before real deployment:

- Supabase Auth
- Secure sessions
- Strict RLS
- Parent-child restrictions
- Teacher-class restrictions
- Admin-school restrictions
- Secure media policies
- Audit logging
- Privacy consent workflows

must all be implemented.

---

# Production Features Still Needed

## Priority 1 — Authentication

Needed:

- Login
- Logout
- Password reset
- Session persistence
- Role-based routing

---

## Priority 2 — Secure Access Control

Needed:

- Parents only see linked children
- Teachers only see assigned classes
- Admins only see their school
- No cross-school access

---

## Priority 3 — Media Upload

Needed:

- Supabase Storage
- Image upload
- PDF upload
- Secure media access
- File previews

---

## Priority 4 — Real Notifications

Needed:

- Notification panel
- Mark as read
- Email alerts
- SMS/WhatsApp integration

---

## Priority 5 — Admin Onboarding

Needed:

- School setup wizard
- Add teachers
- Add classes
- Add students
- Bulk CSV import

---

## Priority 6 — Mobile Optimization

Needed:

- Parent-first mobile layout
- Camera-first teacher upload flow
- Faster low-bandwidth loading

---

# Development Roadmap

## Phase 1 — Working MVP Foundation

Status: **In Progress**

- Database schema
- Seed data
- Dashboards
- Feed posts
- Attendance
- Reactions/comments
- Student profile

---

## Phase 2 — Pilot-Ready MVP

Status: **Next**

- Authentication
- Role dashboards
- Secure RLS
- Media uploads
- Notifications
- Mobile optimization

---

## Phase 3 — School Pilot

Status: **Planned**

- 3–5 pilot schools
- Staff onboarding
- Parent feedback
- Usage analytics

---

## Phase 4 — Paid Launch

Status: **Planned**

- Pricing plans
- Subscription management
- WhatsApp/SMS packs
- AI report generation

---

## Phase 5 — Scale

Status: **Planned**

- Payments
- Transportation tracking
- AI learning insights
- Multi-branch schools
- US market adaptation
- AWS migration

---

# Product Philosophy

SchoolBridge should NOT become a bloated ERP too early.

The platform succeeds if:

- Parents open it daily
- Teachers can post quickly
- Schools look more professional
- Communication becomes organized
- Child updates feel warm and trustworthy

The emotional center of the product is:

# The Private Child Feed

Everything else supports that experience.

---

# Business Positioning

SchoolBridge is positioned as:

> A real-time parent engagement and school operations platform for modern schools.

It is not just a database.

It is a daily digital relationship layer between families and schools.

---

# Git Workflow

Use feature branches:

```bash
git checkout -b feature/auth
git checkout -b feature/teacher-upload
git checkout -b feature/notifications
git checkout -b feature/mobile-ui
```

Commit often:

```bash
git add .
git commit -m "Add teacher upload workflow"
git push origin feature/teacher-upload
```

---

# License

Private project.

All rights reserved unless a license is added later.

---

# Founder Note

SchoolBridge was created from the insight that schools need more than administrative software.

They need a trusted digital relationship layer.

Parents want:
- reassurance
- visibility
- emotional connection

Schools want:
- professionalism
- retention
- better communication

SchoolBridge exists to connect both sides.
