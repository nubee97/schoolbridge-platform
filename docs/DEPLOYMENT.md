# SchoolBridge Deployment Guide

## Netlify

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Environment variables:

```text
VITE_SUPABASE_URL=https://rqanxemgnqgjbrdshtdw.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_DEMO_MODE=false
```

## Supabase

Run `supabase/schema.sql` in SQL Editor.

The schema includes:

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
- storage bucket
- RLS policies

## Production checklist

- [ ] Create school tenant
- [ ] Create admin user in Auth
- [ ] Insert admin profile linked to auth user
- [ ] Add classes
- [ ] Add teacher profiles
- [ ] Add students
- [ ] Link parents to students
- [ ] Test parent-only access
- [ ] Test teacher class access
- [ ] Test admin school access
