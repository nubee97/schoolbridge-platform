# Schema Notes

SchoolBridge uses a multi-tenant architecture.

## Tenant boundary

`schools.id` is the tenant key.

Most tables include `school_id` directly or indirectly.

## Access rules

- Admins access all school data within their own school.
- Teachers access assigned classes and school posts.
- Parents access only linked children through `student_parents`.

## Feed design

`feed_posts` supports three visibility types:

- `student_only`: visible to linked guardians and staff
- `class`: visible to guardians of students in that class and staff
- `school`: visible to all school users

## Media

`post_media` stores images, PDFs, videos, and documents. For production, use Supabase signed URLs or an edge function to avoid exposing private child media publicly.

## Notifications

`notifications` starts as in-app. Later it can support SMS, WhatsApp, email, and push channels.
