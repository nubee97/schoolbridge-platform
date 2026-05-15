import { useState } from 'react'
import { Camera, CheckCircle2, ClipboardList, Sparkles, Upload } from 'lucide-react'
import { createFeedPost, markAttendance } from '../lib/api'

export default function TeacherDashboard({ context }) {
  const { data, setData } = context
  const [form, setForm] = useState({ student_id: data.students[0]?.id, post_type: 'photo', title: '', content: '' })
  const [message, setMessage] = useState('')

  async function postUpdate(e) {
    e.preventDefault()
    const student = data.students.find(s => s.id === form.student_id)
    const newPost = await createFeedPost({
      school_id: data.school.id, student_id: form.student_id, class_id: student.class_id, author_id: 'teacher-1', visibility: 'student_only', ...form
    })
    setData({ ...data, posts: [newPost, ...data.posts] })
    setForm({ ...form, title: '', content: '' })
    setMessage('Update posted. Parent can see it now.')
  }

  async function markAllPresent() {
    await Promise.all(data.students.map(s => markAttendance({ student_id: s.id, class_id: s.class_id, date: new Date().toISOString().slice(0,10), status: 'present', marked_by: 'teacher-1' })))
    setMessage('Attendance marked for today.')
  }

  function aiDraft() {
    setForm({ ...form, title: 'Positive Class Participation', content: 'Today, the student participated actively in class activities, showed confidence during group work, and demonstrated positive social behavior with classmates.' })
  }

  return <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
    <div className="rounded-[2rem] bg-gradient-to-br from-teal-500 to-blue-700 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-teal-100">Teacher Upload Studio</p><h1 className="mt-3 text-4xl font-black">Post a meaningful parent update in under 15 seconds.</h1></div>
    {message && <div className="rounded-2xl bg-green-50 p-4 font-semibold text-green-700">{message}</div>}
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={postUpdate} className="card space-y-4 p-6">
        <h2 className="text-2xl font-black">Create Update</h2>
        <select className="input" value={form.student_id} onChange={e => setForm({ ...form, student_id: e.target.value })}>{data.students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}</select>
        <select className="input" value={form.post_type} onChange={e => setForm({ ...form, post_type: e.target.value })}><option value="photo">Photo Update</option><option value="homework">Homework</option><option value="report">Report</option><option value="announcement">Announcement</option></select>
        <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/>
        <textarea className="input min-h-40" placeholder="Write parent-friendly update..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}/>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={aiDraft} className="btn-secondary"><Sparkles size={17}/> AI Draft</button><button type="button" className="btn-secondary"><Camera size={17}/> Add Photo</button><button className="btn-primary"><Upload size={17}/> Post Update</button></div>
      </form>
      <div className="space-y-4">
        <div className="card p-6"><ClipboardList className="text-blue-600"/><h3 className="mt-4 text-xl font-black">Attendance</h3><p className="mt-2 text-sm text-slate-600">Mark today’s attendance for your class quickly.</p><button onClick={markAllPresent} className="mt-5 btn-primary"><CheckCircle2 size={17}/> Mark All Present</button></div>
        <div className="card p-6"><h3 className="font-black">My Class</h3><div className="mt-4 space-y-3">{data.students.map(s => <div key={s.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><img src={s.photo_url} className="h-11 w-11 rounded-xl object-cover"/><span className="font-semibold">{s.first_name} {s.last_name}</span></div>)}</div></div>
      </div>
    </div>
  </div>
}
