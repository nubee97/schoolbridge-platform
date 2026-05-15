import { supabase, isDemoMode } from './supabase'
import { demoAttendance, demoClasses, demoFeedPosts, demoNotifications, demoSchool, demoStudents, demoUsers } from '../data/demoData'

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getBootstrapData() {
  if (isDemoMode) {
    await delay()
    return {
      school: demoSchool,
      users: demoUsers,
      classes: demoClasses,
      students: demoStudents,
      posts: demoFeedPosts,
      attendance: demoAttendance,
      notifications: demoNotifications,
      demo: true,
    }
  }

  const [schoolRes, usersRes, classesRes, studentsRes, postsRes, attendanceRes] = await Promise.all([
    supabase.from('schools').select('*').limit(1).single(),
    supabase.from('profiles').select('*'),
    supabase.from('classes').select('*'),
    supabase.from('students').select('*'),
    supabase.from('feed_posts').select('*, post_media(*), reactions(*), comments(*)').order('created_at', { ascending: false }),
    supabase.from('attendance').select('*').order('date', { ascending: false }),
  ])

  const error = [schoolRes, usersRes, classesRes, studentsRes, postsRes, attendanceRes].find((r) => r.error)?.error
  if (error) throw error

  return {
    school: schoolRes.data,
    users: usersRes.data || [],
    classes: classesRes.data || [],
    students: studentsRes.data || [],
    posts: postsRes.data || [],
    attendance: attendanceRes.data || [],
    notifications: [],
    demo: false,
  }
}

export async function createFeedPost(post) {
  if (isDemoMode) {
    await delay()
    return { ...post, id: crypto.randomUUID(), created_at: new Date().toISOString(), reactions: { heart: 0, clap: 0, smile: 0 }, comments: [] }
  }
  const { data, error } = await supabase.from('feed_posts').insert(post).select('*').single()
  if (error) throw error
  return data
}

export async function markAttendance(record) {
  if (isDemoMode) {
    await delay()
    return { ...record, id: crypto.randomUUID(), created_at: new Date().toISOString() }
  }
  const { data, error } = await supabase.from('attendance').upsert(record, { onConflict: 'student_id,date' }).select('*').single()
  if (error) throw error
  return data
}
