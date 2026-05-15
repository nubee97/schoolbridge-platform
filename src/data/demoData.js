export const demoSchool = {
  id: 'school-demo-1',
  name: 'Bridgefield International School',
  country: 'Nigeria',
  city: 'Lagos',
  logo_url: '',
  subscription_status: 'pilot',
}

export const demoUsers = [
  { id: 'admin-1', full_name: 'Ada Okafor', role: 'admin', email: 'admin@bridgefield.edu', school_id: demoSchool.id },
  { id: 'teacher-1', full_name: 'Mrs. Grace Johnson', role: 'teacher', email: 'teacher@bridgefield.edu', school_id: demoSchool.id },
  { id: 'parent-1', full_name: 'Pascal Nnubia', role: 'parent', email: 'parent@example.com', school_id: demoSchool.id },
]

export const demoClasses = [
  { id: 'class-1', school_id: demoSchool.id, name: 'Nursery 2', section: 'Blue', teacher_id: 'teacher-1' },
  { id: 'class-2', school_id: demoSchool.id, name: 'Primary 3', section: 'Gold', teacher_id: 'teacher-1' },
]

export const demoStudents = [
  {
    id: 'student-1', school_id: demoSchool.id, class_id: 'class-1', first_name: 'Maya', last_name: 'Nnubia',
    photo_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=80', status: 'active'
  },
  {
    id: 'student-2', school_id: demoSchool.id, class_id: 'class-2', first_name: 'Daniel', last_name: 'Okoro',
    photo_url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=500&q=80', status: 'active'
  },
]

export const demoFeedPosts = [
  {
    id: 'post-1', school_id: demoSchool.id, student_id: 'student-1', class_id: 'class-1', author_id: 'teacher-1',
    post_type: 'photo', title: 'Creative Art Session',
    content: 'Maya participated actively during painting time today. She showed patience, creativity, and shared materials kindly with her classmates.',
    visibility: 'student_only', created_at: new Date().toISOString(),
    media: [{ file_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', file_type: 'image', caption: 'Art class moment' }],
    reactions: { heart: 8, clap: 4, smile: 3 }, comments: [{ author: 'Pascal', content: 'This made my day. Thank you, teacher!' }]
  },
  {
    id: 'post-2', school_id: demoSchool.id, student_id: 'student-1', class_id: 'class-1', author_id: 'teacher-1',
    post_type: 'attendance', title: 'Attendance Marked', content: 'Maya arrived on time and settled well into morning circle.',
    visibility: 'student_only', created_at: new Date(Date.now() - 1000*60*60*2).toISOString(), media: [], reactions: { heart: 3, clap: 1, smile: 2 }, comments: []
  },
  {
    id: 'post-3', school_id: demoSchool.id, student_id: 'student-1', class_id: 'class-1', author_id: 'teacher-1',
    post_type: 'homework', title: 'Homework for Tomorrow', content: 'Please help Maya practice counting numbers 1 to 30 and identify five colors at home.',
    visibility: 'student_only', created_at: new Date(Date.now() - 1000*60*60*5).toISOString(), media: [], reactions: { heart: 5, clap: 2, smile: 1 }, comments: []
  },
]

export const demoAttendance = [
  { id: 'att-1', student_id: 'student-1', class_id: 'class-1', date: new Date().toISOString().slice(0,10), status: 'present', marked_by: 'teacher-1' },
  { id: 'att-2', student_id: 'student-2', class_id: 'class-2', date: new Date().toISOString().slice(0,10), status: 'late', marked_by: 'teacher-1' },
]

export const demoNotifications = [
  { id: 'note-1', title: 'New photo update', message: 'Maya has a new art class photo.', is_read: false },
  { id: 'note-2', title: 'Homework posted', message: 'Nursery 2 homework is available.', is_read: false },
]
