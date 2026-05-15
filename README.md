# SchoolBridge Platform

**SchoolBridge** is a multi-tenant parent engagement and school operations platform built to help schools communicate with parents in real time through private child feeds, attendance records, reports, homework updates, announcements, and teacher-parent interaction tools.

It is designed to become the daily digital bridge between **schools, teachers, parents, and students**.

---

## Vision

SchoolBridge is not just another school management system.

The platform is built around a simple belief:

> Schools do not only need administrative software. They need trust infrastructure.

Parents want reassurance, visibility, and emotional connection to their child’s school life. Schools want stronger communication, better retention, and a more professional digital experience.

SchoolBridge connects both sides.

---

## Strategic Positioning

SchoolBridge combines:

- **Korean-style parent engagement**  
  Daily child updates, private feeds, albums, emotional parent trust.

- **US SaaS scalability**  
  Clean user experience, subscription readiness, multi-tenant architecture.

- **Nigeria-first practicality**  
  Mobile-first design, affordability, WhatsApp/SMS-ready communication.

The platform starts with parent engagement and expands into broader school operations.

---

## Current Project Status

This repository contains the working MVP foundation for SchoolBridge.

The current version is connected to Supabase and supports real database-backed workflows.

| Area | Status |
|---|---|
| Frontend MVP | Active |
| Supabase schema | Active |
| Seed data | Available |
| Admin workflows | Partially functional |
| Teacher workflows | Partially functional |
| Parent workflows | Partially functional |
| Authentication | Pending production implementation |
| Secure RLS policies | Pending production hardening |
| Media uploads | Pending full Supabase Storage integration |

---

## Core Platform Model

SchoolBridge follows a **B2B2C multi-tenant SaaS model**.

- **Schools** are the paying institutional customers.
- **Teachers** create daily content and manage classroom activity.
- **Parents** engage with their child’s school life.
- **Students** are the center of the data and experience layer.

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

Each school operates as a separate tenant inside the same platform.

What Works Now
School / Admin

Admins can:

Create schools
Add admin, teacher, and parent profiles
Create classes
Add students
Link parents or guardians to students
View school-level record counts
Manage the basic school data structure
Teacher

Teachers can:

Publish child-specific posts
Publish class-wide posts
Publish school-wide posts
Create updates, photo posts, reports, homework, announcements, behavior notes, and health notes
Attach image or PDF URLs to posts
Mark daily attendance
Use an AI-style draft helper for parent-friendly wording
Parent

Parents can:

Select a parent profile
View posts related to linked children
View class and school-wide updates
React to posts with heart, clap, or smile reactions
Comment on posts
View attendance records for linked children
Student Profile

Student profiles display:

Student information
Class assignment
Linked guardians
Recent posts
Attendance history
Main Features
Private Parent Feed

The parent feed is the emotional center of the product.

Schools and teachers can share:

Daily child updates
Classroom photos
Homework
Announcements
Reports
Behavior notes
Health notes
Attendance-related updates

The goal is to help parents feel connected to their child’s school life in real time.

Teacher Upload Studio

The teacher workflow is designed around speed and simplicity.

Long-term product goal:

A teacher should be able to post a useful update in under 15 seconds.

Supported post types:

Update
Photo
Report
Homework
Announcement
Behavior note
Health note
Attendance note
Attendance Management

Teachers can mark daily attendance for students.

Supported statuses:

Present
Absent
Late
Excused
Reactions and Comments

Parents can engage with posts through:

Heart
Clap
Smile
Comments

This turns SchoolBridge from a cold school portal into a warm parent engagement experience.

Multi-Tenant School Structure

The database is structured so multiple schools can use the same platform while keeping data separated by school_id.

Technology Stack
Frontend
React
Vite
JavaScript
Tailwind CSS
React Router
Backend
Supabase
PostgreSQL
Supabase Row Level Security
Supabase SQL Editor
Hosting
Netlify for frontend deployment
Supabase for backend and database services
Future Infrastructure Direction

The MVP uses Supabase and Netlify for speed.

At scale, selected infrastructure may move to:

AWS S3
AWS CloudFront
AWS RDS PostgreSQL
AWS Lambda or ECS
AWS SES/SNS
Dedicated analytics and notification services
Project Structure
schoolbridge-platform/
│
├── docs/
│   └── Project documentation and planning files
│
├── public/
│   └── Static public assets
│
├── src/
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── data/
│   │   └── Data helpers and constants
│   │
│   ├── lib/
│   │   └── Supabase client and backend helper functions
│   │
│   ├── pages/
│   │   └── Main application pages
│   │
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
Environment Variables

Create a .env file in the project root.

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key

Example URL format:

VITE_SUPABASE_URL=https://rqanxemgnqgjbrdshtdw.supabase.co

Do not commit .env to GitHub.

Local Development Setup
1. Clone the repository
git clone https://github.com/nubee97/schoolbridge-platform.git
cd schoolbridge-platform
2. Install dependencies
npm install
3. Add environment variables

Create .env in the project root.

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
4. Create Supabase tables

Open:

supabase/schema.sql

Copy the full SQL file.

Go to:

Supabase Dashboard → SQL Editor → New Query

Paste and run the schema.

5. Add starter data

Open:

supabase/seed.sql

Copy the full SQL file.

Paste and run it in Supabase SQL Editor.

6. Start the development server
npm run dev

Open:

http://localhost:5173
Supabase Setup

The current schema creates:

schools
profiles
classes
students
student_parents
feed_posts
post_media
comments
reactions
attendance
notifications
audit_logs

Most core tables include school_id, which allows the platform to support multiple schools inside one system.

Netlify Deployment
Build Settings
Build command: npm run build
Publish directory: dist
Netlify Environment Variables

Add these in:

Netlify → Site Settings → Environment Variables
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

After adding environment variables, redeploy the site.

Security Notice

This project currently contains MVP-level security policies.

Do not use real child data, parent data, school records, or private media until production security is implemented.

Before real school pilots, the platform must include:

Supabase Auth
Authenticated sessions
Role-based access control
Strict RLS policies
Parent-child access restrictions
Teacher-class access restrictions
Admin-school access restrictions
Secure media storage policies
Audit logging
Privacy policy and consent workflow
Production Features Still Needed
Priority 1 — Authentication
Login
Logout
Password reset
Session persistence
Role-based routing
Admin-created teacher and parent accounts
Priority 2 — Secure Access Control
Parents only see linked children
Teachers only see assigned classes
Admins only see their own school
No cross-school data access
Priority 3 — Media Upload
Supabase Storage bucket
Image upload
PDF upload
Secure file access
File preview cards
Image optimization
Priority 4 — Real Notifications
In-app notification panel
Mark as read
New post notification creation
Email alerts
SMS/WhatsApp-ready notification layer
Priority 5 — Admin Onboarding
School setup wizard
Add teachers
Add classes
Add students
Link guardians
Bulk import from CSV/Excel
Priority 6 — Mobile Optimization
Parent-first mobile layout
Teacher camera-first posting flow
Faster low-bandwidth loading
Better responsive navigation
Development Roadmap
Phase 1 — Working MVP Foundation

Status: In progress

Database schema
Seed data
Basic dashboards
Feed posts
Attendance
Parent reactions/comments
Student profile
Phase 2 — Pilot-Ready MVP

Status: Next

Authentication
Role-based dashboards
Secure RLS
Media upload
Notification panel
Admin onboarding flow
Mobile-first UI improvements
Phase 3 — School Pilot

Status: Planned

3–5 pilot schools
Staff onboarding
Parent feedback
Teacher workflow testing
Usage analytics
Case studies
Phase 4 — Paid Launch

Status: Planned

Pricing plans
Subscription management
School billing
WhatsApp/SMS packs
AI report generation
Support dashboard
Phase 5 — Scale

Status: Planned

Payments
Pickup authorization
Transportation tracking
AI learning insights
Multi-branch schools
US market adaptation
AWS infrastructure migration where necessary
Product Philosophy

SchoolBridge should not become a bloated school ERP too early.

The product succeeds if:

Parents open it regularly
Teachers can post quickly
Schools look more professional
Communication chaos is reduced
Child updates feel warm, private, and trustworthy

The emotional center of the product is the private child feed.

Everything else should support that experience.

Business Positioning

SchoolBridge is positioned as:

A real-time parent engagement and school operations platform for modern schools.

It is not just a school database.

It is designed to become the daily digital relationship layer between families and schools.

Git Workflow

Use feature branches for major development work.

git checkout -b feature/auth
git checkout -b feature/teacher-upload
git checkout -b feature/notifications
git checkout -b feature/mobile-ui

Commit often:

git add .
git commit -m "Add teacher upload workflow"
git push origin feature/teacher-upload
License

Private project.

All rights reserved unless a license is added later.

Founder Note

SchoolBridge was created from the insight that schools need more than administrative software.

They need a trusted digital relationship layer.

Parents want reassurance, visibility, and emotional connection to their child’s school life.

Schools want professionalism, retention, and better communication.

SchoolBridge exists to connect both sides.