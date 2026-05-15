import { Link } from 'react-router-dom'
import { BookOpen, CalendarCheck, Image, MessageCircle } from 'lucide-react'
import FeedCard from '../components/FeedCard'
import KpiCard from '../components/KpiCard'

export default function ParentDashboard({ context }) {
  const { data } = context
  const student = data.students[0]
  const posts = data.posts.filter(p => !p.student_id || p.student_id === student.id)
  const teacher = data.users.find(u => u.role === 'teacher')
  return <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
    <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <div className="card overflow-hidden">
        <img src={student.photo_url} className="h-64 w-full object-cover" />
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">My Child</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{student.first_name} {student.last_name}</h2>
          <p className="mt-2 text-slate-500">Nursery 2 Blue · Active student</p>
          <Link to={`/app/students/${student.id}`} className="mt-5 inline-flex font-bold text-blue-600">View full profile →</Link>
        </div>
      </div>
      <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-slate-950 p-8 text-white shadow-soft">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-100">Today at School</p>
        <h1 className="mt-3 text-4xl font-black">Maya is present, active, and learning well today.</h1>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl bg-white/15 p-4"><p className="text-2xl font-black">9:05 AM</p><p className="text-sm text-blue-100">Arrived on time</p></div>
          <div className="rounded-3xl bg-white/15 p-4"><p className="text-2xl font-black">1</p><p className="text-sm text-blue-100">New photo update</p></div>
          <div className="rounded-3xl bg-white/15 p-4"><p className="text-2xl font-black">1</p><p className="text-sm text-blue-100">Homework posted</p></div>
        </div>
      </div>
    </section>
    <section className="grid gap-4 md:grid-cols-4"><KpiCard label="Attendance" value="98%" note="This term" icon={CalendarCheck}/><KpiCard label="Reports" value="12" note="Uploaded" icon={BookOpen}/><KpiCard label="Gallery" value="48" note="Child moments" icon={Image}/><KpiCard label="Messages" value="5" note="Teacher notes" icon={MessageCircle}/></section>
    <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5"><h2 className="text-2xl font-black text-slate-950">Private Child Feed</h2>{posts.map(post => <FeedCard key={post.id} post={post} student={student} author={teacher}/>)}</div>
      <aside className="space-y-4">
        <div className="card p-5"><h3 className="font-black">Upcoming</h3><div className="mt-4 space-y-3 text-sm text-slate-600"><p>📌 Friday: Color Day</p><p>📚 Tomorrow: Counting homework due</p><p>🎒 Next week: School excursion consent form</p></div></div>
        <div className="card p-5"><h3 className="font-black">Teacher Note</h3><p className="mt-3 text-sm leading-6 text-slate-600">Maya is becoming more confident in group activities. Please keep practicing counting at home.</p></div>
      </aside>
    </section>
  </div>
}
