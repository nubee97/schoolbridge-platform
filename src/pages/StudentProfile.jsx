import { Link, useParams } from 'react-router-dom'
import FeedCard from '../components/FeedCard'

export default function StudentProfile({ context }) {
  const { data } = context
  const { studentId } = useParams()
  const student = data.students.find(s => s.id === studentId) || data.students[0]
  const posts = data.posts.filter(p => p.student_id === student.id)
  const teacher = data.users.find(u => u.role === 'teacher')
  return <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
    <Link to="/app/parent" className="font-bold text-blue-600">← Back to feed</Link>
    <div className="card overflow-hidden"><div className="h-40 bg-gradient-to-r from-blue-500 to-teal-400"/><div className="p-6"><img src={student.photo_url} className="-mt-20 h-32 w-32 rounded-[2rem] border-4 border-white object-cover"/><h1 className="mt-4 text-4xl font-black">{student.first_name} {student.last_name}</h1><p className="mt-2 text-slate-500">Student profile, feed history, reports, and attendance.</p></div></div>
    <div className="grid gap-4 md:grid-cols-3"><div className="card p-5"><p className="text-3xl font-black">98%</p><p className="font-bold">Attendance</p></div><div className="card p-5"><p className="text-3xl font-black">12</p><p className="font-bold">Reports</p></div><div className="card p-5"><p className="text-3xl font-black">48</p><p className="font-bold">Gallery Items</p></div></div>
    <div className="space-y-5"><h2 className="text-2xl font-black">Timeline</h2>{posts.map(post => <FeedCard key={post.id} post={post} student={student} author={teacher}/>)}</div>
  </div>
}
