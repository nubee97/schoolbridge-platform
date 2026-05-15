import { BarChart3, BellRing, GraduationCap, School, UsersRound } from 'lucide-react'
import KpiCard from '../components/KpiCard'

export default function AdminDashboard({ context }) {
  const { data } = context
  const parents = data.users.filter(u => u.role === 'parent').length
  const teachers = data.users.filter(u => u.role === 'teacher').length
  return <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
    <div className="rounded-[2rem] bg-slate-950 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-blue-200">School Operations</p><h1 className="mt-3 text-4xl font-black">Manage your school, engagement, and parent trust from one place.</h1></div>
    <section className="grid gap-4 md:grid-cols-4"><KpiCard label="Students" value={data.students.length} note="Active records" icon={GraduationCap}/><KpiCard label="Teachers" value={teachers} note="Staff accounts" icon={UsersRound}/><KpiCard label="Parents" value={parents} note="Linked guardians" icon={UsersRound}/><KpiCard label="Posts" value={data.posts.length} note="This week" icon={BellRing}/></section>
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card p-6"><h2 className="text-2xl font-black">Classes</h2><div className="mt-5 space-y-3">{data.classes.map(c => <div key={c.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-bold">{c.name} {c.section}</p><p className="text-sm text-slate-500">{data.students.filter(s => s.class_id === c.id).length} students</p></div><School className="text-blue-600"/></div>)}</div></div>
      <div className="card p-6"><h2 className="text-2xl font-black">Engagement Insights</h2><div className="mt-6 space-y-4"><div><div className="flex justify-between text-sm font-bold"><span>Parent activation</span><span>72%</span></div><div className="mt-2 h-3 rounded-full bg-slate-100"><div className="h-3 w-[72%] rounded-full bg-blue-600"/></div></div><div><div className="flex justify-between text-sm font-bold"><span>Teacher posting consistency</span><span>85%</span></div><div className="mt-2 h-3 rounded-full bg-slate-100"><div className="h-3 w-[85%] rounded-full bg-teal-500"/></div></div></div></div>
    </div>
    <div className="card p-6"><h2 className="text-2xl font-black">Admin Tasks</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{['Add Student','Invite Teacher','Send Announcement'].map(x => <button key={x} className="rounded-2xl border border-slate-200 p-4 text-left font-bold hover:bg-blue-50">{x}</button>)}</div></div>
  </div>
}
