import { supabase, isConfigured } from './supabaseClient'

function requireSupabase() {
  if (!isConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart npm run dev.')
  }
  return supabase
}

export async function fetchAllData() {
  const db = requireSupabase()
  const [schools, profiles, classes, students, links, posts, media, comments, reactions, attendance, notifications] = await Promise.all([
    db.from('schools').select('*').order('created_at', { ascending: false }),
    db.from('profiles').select('*').order('created_at', { ascending: true }),
    db.from('classes').select('*').order('created_at', { ascending: true }),
    db.from('students').select('*').order('created_at', { ascending: true }),
    db.from('student_parents').select('*').order('created_at', { ascending: true }),
    db.from('feed_posts').select('*').order('created_at', { ascending: false }),
    db.from('post_media').select('*').order('created_at', { ascending: true }),
    db.from('comments').select('*').order('created_at', { ascending: true }),
    db.from('reactions').select('*').order('created_at', { ascending: true }),
    db.from('attendance').select('*').order('date', { ascending: false }),
    db.from('notifications').select('*').order('created_at', { ascending: false })
  ])
  const results = { schools, profiles, classes, students, links, posts, media, comments, reactions, attendance, notifications }
  Object.entries(results).forEach(([name, res]) => {
    if (res.error) throw new Error(`${name}: ${res.error.message}`)
  })
  return {
    schools: schools.data || [],
    profiles: profiles.data || [],
    classes: classes.data || [],
    students: students.data || [],
    links: links.data || [],
    posts: posts.data || [],
    media: media.data || [],
    comments: comments.data || [],
    reactions: reactions.data || [],
    attendance: attendance.data || [],
    notifications: notifications.data || []
  }
}

async function insert(table, payload) {
  const { data, error } = await requireSupabase().from(table).insert(payload).select().single()
  if (error) throw error
  return data
}

export const createSchool = payload => insert('schools', payload)
export const createProfile = payload => insert('profiles', payload)
export const createClass = payload => insert('classes', payload)
export const createStudent = payload => insert('students', payload)
export const linkParent = payload => insert('student_parents', payload)
export const createMedia = payload => insert('post_media', payload)
export const createComment = payload => insert('comments', payload)
export const createReaction = payload => insert('reactions', payload)
export const createNotification = payload => insert('notifications', payload)

export async function createPost(payload, mediaUrl) {
  const post = await insert('feed_posts', payload)
  if (mediaUrl) {
    await createMedia({ post_id: post.id, file_url: mediaUrl, file_type: mediaUrl.toLowerCase().includes('.pdf') ? 'pdf' : 'image', caption: payload.title })
  }
  return post
}

export async function markAttendance(payload) {
  const { data, error } = await requireSupabase()
    .from('attendance')
    .upsert(payload, { onConflict: 'student_id,date' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteRow(table, id) {
  const { error } = await requireSupabase().from(table).delete().eq('id', id)
  if (error) throw error
}
