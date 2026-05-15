# SchoolBridge Working MVP

This is a functional Supabase-powered MVP for SchoolBridge.

It is not a static demo. The main actions write to and read from Supabase.

## What works

### School/Admin
- Create schools
- Add admins, teachers, and parents
- Create classes
- Add students
- Link parents to students
- View school record counts and operational data

### Teacher
- Publish child-specific, class, or school-wide feed posts
- Create updates, photo posts, reports, homework, announcements, behavior notes, and health notes
- Attach image/PDF URLs to posts
- Mark daily attendance
- Use an AI-style draft helper for report/comment wording

### Parent
- Select a parent profile
- See only linked child/class/school posts
- React with heart, clap, or smile
- Comment on posts
- View attendance records for linked children

### Student Profile
- View student cards
- See class, linked guardians, recent posts, and attendance history

## Setup

### 1. Install packages

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://rqanxemgnqgjbrdshtdw.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_anon_key
```

Restart the dev server any time you edit `.env`.

### 3. Create Supabase tables

Open Supabase → SQL Editor → New Query.

Copy and run:

```bash
supabase/schema.sql
```

### 4. Add starter data

Then copy and run:

```bash
supabase/seed.sql
```

### 5. Start local development

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

## Netlify deployment

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```

Add these environment variables in Netlify:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Important security note

This MVP includes open RLS policies so the app works quickly with the Supabase anon key during pilot development.

Before using real child data, replace the MVP policies with proper authenticated role-based policies.

