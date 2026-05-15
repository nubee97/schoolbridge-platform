import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  Building2, Users, GraduationCap, Heart, MessageCircle, Bell, Upload, CalendarCheck, BookOpen, BarChart3, Plus, RefreshCw, Trash2, Shield, School, Home, UserRound, Image as ImageIcon, Send, CheckCircle2, AlertTriangle
} from 'lucide-react'
import './styles.css'
import { isConfigured, supabase } from './supabaseClient'
import * as api from './api'

const emptyData = { schools: [], profiles: [], classes: [], students: [], links: [], posts: [], media: [], comments: [], reactions: [], attendance: [], notifications: [] }

function App() {
  const [view, setView] = useState('home')
  const [role, setRole] = useState('admin')
  const [data, setData] = useState(emptyData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const school = data.schools[0]

  async function load() {
    setLoading(true); setError('')
    try { setData(await api.fetchAllData()) } 
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (isConfigured) load() }, [])

  useEffect(() => {
    if (!isConfigured || !school?.id) return
    const channel = supabase
      .channel('schoolbridge-live')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [school?.id])

  function notify(msg) { setSuccess(msg); setTimeout(()=>setSuccess(''), 2800) }

  const stats = useMemo(() => ({
    schools: data.schools.length,
    teachers: data.profiles.filter(p=>p.role==='teacher').length,
    parents: data.profiles.filter(p=>p.role==='parent').length,
    students: data.students.length,
    posts: data.posts.length,
    attendanceToday: data.attendance.filter(a=>a.date === new Date().toISOString().slice(0,10)).length
  }), [data])

  if (!isConfigured) return <SetupScreen />

  return <div className="app-shell">
    <Sidebar view={view} setView={setView} role={role} setRole={setRole} />
    <main className="main">
      <Topbar school={school} loading={loading} onRefresh={load} />
      {error && <Banner type="error" text={error} />}
      {success && <Banner type="success" text={success} />}
      {!school && <EmptyDatabase onRefresh={load} />}
      {school && view==='home' && <HomePage stats={stats} data={data} setView={setView} />}
      {school && view==='admin' && <AdminPanel data={data} reload={load} notify={notify} />}
      {school && view==='teacher' && <TeacherPanel data={data} reload={load} notify={notify} />}
      {school && view==='parent' && <ParentPanel data={data} reload={load} notify={notify} />}
      {school && view==='students' && <StudentsPanel data={data} reload={load} notify={notify} />}
      {school && view==='feed' && <FeedBoard data={data} reload={load} notify={notify} />}
    </main>
  </div>
}

function SetupScreen() {
  return <div className="setup">
    <div className="setup-card">
      <div className="logo-xl">SB</div>
      <h1>SchoolBridge needs your Supabase keys</h1>
      <p>This build is a working Supabase MVP. It does not use demo mode. Add your project URL and anon key, then restart Vite.</p>
      <pre>{`VITE_SUPABASE_URL=https://rqanxemgnqgjbrdshtdw.supabase.co\nVITE_SUPABASE_ANON_KEY=your_publishable_key`}</pre>
      <p>Then run <strong>supabase/schema.sql</strong> and <strong>supabase/seed.sql</strong> in Supabase SQL Editor.</p>
    </div>
  </div>
}

function EmptyDatabase({ onRefresh }) {
  return <div className="empty-state">
    <AlertTriangle size={42}/>
    <h2>No school data found yet</h2>
    <p>Your connection works, but the database is empty. Run <strong>supabase/seed.sql</strong> or create your first school in the Admin panel after seeding.</p>
    <button onClick={onRefresh}><RefreshCw size={16}/> Refresh</button>
  </div>
}

function Sidebar({ view, setView, role, setRole }) {
  const items = [
    ['home', Home, 'Home'], ['admin', Shield, 'School Admin'], ['teacher', Upload, 'Teacher'], ['parent', Heart, 'Parent'], ['students', GraduationCap, 'Students'], ['feed', MessageCircle, 'Live Feed']
  ]
  return <aside className="sidebar">
    <div className="brand"><div className="logo">SB</div><div><b>SchoolBridge</b><span>Working MVP</span></div></div>
    <nav>{items.map(([id, Icon, label]) => <button key={id} onClick={()=>setView(id)} className={view===id?'active':''}><Icon size={17}/>{label}</button>)}</nav>
    <div className="role-box"><small>Quick role lens</small><select value={role} onChange={e=>setRole(e.target.value)}><option>admin</option><option>teacher</option><option>parent</option></select></div>
    <div className="hint">Actions on this app write to Supabase tables directly.</div>
  </aside>
}

function Topbar({ school, loading, onRefresh }) {
  return <header className="topbar"><div><h2>{school?.name || 'SchoolBridge'}</h2><p>{school ? `${school.city || ''}, ${school.country || ''} · ${school.subscription_status}` : 'Connect your first school'}</p></div><button onClick={onRefresh} className="refresh"><RefreshCw size={16} className={loading?'spin':''}/>Refresh</button></header>
}

function Banner({ type, text }) { return <div className={`banner ${type}`}>{type==='success'?<CheckCircle2/>:<AlertTriangle/>}{text}</div> }
function Card({ children, className='' }) { return <section className={`card ${className}`}>{children}</section> }
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label> }

function HomePage({ stats, data, setView }) {
  const latest = data.posts.slice(0,3)
  return <div className="page">
    <div className="hero">
      <div><span className="pill">Multi-tenant school platform</span><h1>Real-time parent engagement that actually works.</h1><p>Schools manage operations, teachers post updates, and parents see private child timelines with reactions, comments, reports, attendance, and homework.</p><button onClick={()=>setView('teacher')}>Post a teacher update</button></div>
      <div className="phone-preview"><h3>Today at School</h3>{latest.map(p=><div className="mini-post" key={p.id}><b>{p.title}</b><span>{p.content.slice(0,65)}...</span></div>)}</div>
    </div>
    <div className="stats-grid">
      <Stat icon={Building2} label="Schools" value={stats.schools}/><Stat icon={Users} label="Parents" value={stats.parents}/><Stat icon={GraduationCap} label="Students" value={stats.students}/><Stat icon={MessageCircle} label="Feed posts" value={stats.posts}/><Stat icon={CalendarCheck} label="Attendance today" value={stats.attendanceToday}/><Stat icon={Upload} label="Teachers" value={stats.teachers}/>
    </div>
    <div className="three-grid">
      <Card><h3>What schools can do</h3><ul><li>Create classes, teachers, students and parents</li><li>Connect parents to their own children</li><li>View engagement and attendance records</li></ul></Card>
      <Card><h3>What teachers can do</h3><ul><li>Create updates, reports, homework and announcements</li><li>Attach media links</li><li>Mark attendance for students</li></ul></Card>
      <Card><h3>What parents can do</h3><ul><li>View only their child’s private feed</li><li>React and comment</li><li>Check reports, homework and attendance</li></ul></Card>
    </div>
  </div>
}
function Stat({ icon:Icon, label, value }) { return <Card className="stat"><Icon size={22}/><span>{label}</span><b>{value}</b></Card> }

function AdminPanel({ data, reload, notify }) {
  const school = data.schools[0]
  const [schoolForm, setSchoolForm] = useState({ name:'', country:'Nigeria', city:'', address:'' })
  const [userForm, setUserForm] = useState({ full_name:'', email:'', phone:'', role:'teacher' })
  const [classForm, setClassForm] = useState({ name:'', section:'A', teacher_id:'' })
  const [studentForm, setStudentForm] = useState({ first_name:'', last_name:'', gender:'Female', class_id:'', photo_url:'' })
  const [linkForm, setLinkForm] = useState({ student_id:'', parent_user_id:'', relationship:'Mother' })
  const teachers = data.profiles.filter(p=>p.role==='teacher')
  const parents = data.profiles.filter(p=>p.role==='parent')
  async function submit(fn, payload, msg) { await fn(payload); await reload(); notify(msg) }
  return <div className="page"><div className="page-head"><h1>School Admin Console</h1><p>Create and manage the entire school structure.</p></div>
    <div className="two-grid">
      <Card><h3><School/> Create school</h3><Form onSubmit={()=>submit(api.createSchool, schoolForm, 'School created')}><Field label="School name"><input value={schoolForm.name} onChange={e=>setSchoolForm({...schoolForm,name:e.target.value})} required/></Field><Field label="Country"><input value={schoolForm.country} onChange={e=>setSchoolForm({...schoolForm,country:e.target.value})}/></Field><Field label="City"><input value={schoolForm.city} onChange={e=>setSchoolForm({...schoolForm,city:e.target.value})}/></Field><Field label="Address"><input value={schoolForm.address} onChange={e=>setSchoolForm({...schoolForm,address:e.target.value})}/></Field><button><Plus/>Create School</button></Form></Card>
      <Card><h3><Users/> Add admin / teacher / parent</h3><Form onSubmit={()=>submit(api.createProfile, {...userForm, school_id: school.id}, 'User added')}><Field label="Full name"><input value={userForm.full_name} onChange={e=>setUserForm({...userForm,full_name:e.target.value})} required/></Field><Field label="Role"><select value={userForm.role} onChange={e=>setUserForm({...userForm,role:e.target.value})}><option>admin</option><option>teacher</option><option>parent</option></select></Field><Field label="Email"><input value={userForm.email} onChange={e=>setUserForm({...userForm,email:e.target.value})}/></Field><Field label="Phone"><input value={userForm.phone} onChange={e=>setUserForm({...userForm,phone:e.target.value})}/></Field><button><Plus/>Add User</button></Form></Card>
      <Card><h3><BookOpen/> Create class</h3><Form onSubmit={()=>submit(api.createClass, {...classForm, school_id: school.id}, 'Class created')}><Field label="Class name"><input value={classForm.name} onChange={e=>setClassForm({...classForm,name:e.target.value})} placeholder="Primary 2" required/></Field><Field label="Section"><input value={classForm.section} onChange={e=>setClassForm({...classForm,section:e.target.value})}/></Field><Field label="Teacher"><select value={classForm.teacher_id} onChange={e=>setClassForm({...classForm,teacher_id:e.target.value})}><option value="">No teacher</option>{teachers.map(t=><option key={t.id} value={t.id}>{t.full_name}</option>)}</select></Field><button><Plus/>Create Class</button></Form></Card>
      <Card><h3><GraduationCap/> Add student</h3><Form onSubmit={()=>submit(api.createStudent, {...studentForm, school_id: school.id}, 'Student added')}><Field label="First name"><input value={studentForm.first_name} onChange={e=>setStudentForm({...studentForm,first_name:e.target.value})} required/></Field><Field label="Last name"><input value={studentForm.last_name} onChange={e=>setStudentForm({...studentForm,last_name:e.target.value})} required/></Field><Field label="Class"><select value={studentForm.class_id} onChange={e=>setStudentForm({...studentForm,class_id:e.target.value})}><option value="">Choose class</option>{data.classes.map(c=><option key={c.id} value={c.id}>{c.name} {c.section}</option>)}</select></Field><Field label="Photo URL"><input value={studentForm.photo_url} onChange={e=>setStudentForm({...studentForm,photo_url:e.target.value})}/></Field><button><Plus/>Add Student</button></Form></Card>
      <Card><h3><UserRound/> Link parent to student</h3><Form onSubmit={()=>submit(api.linkParent, {...linkForm, is_primary_guardian:true}, 'Parent linked to student')}><Field label="Student"><select value={linkForm.student_id} onChange={e=>setLinkForm({...linkForm,student_id:e.target.value})} required><option value="">Choose student</option>{data.students.map(s=><option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}</select></Field><Field label="Parent"><select value={linkForm.parent_user_id} onChange={e=>setLinkForm({...linkForm,parent_user_id:e.target.value})} required><option value="">Choose parent</option>{parents.map(p=><option key={p.id} value={p.id}>{p.full_name}</option>)}</select></Field><Field label="Relationship"><input value={linkForm.relationship} onChange={e=>setLinkForm({...linkForm,relationship:e.target.value})}/></Field><button><Plus/>Link Parent</button></Form></Card>
      <Card><h3><BarChart3/> School records</h3><RecordList data={data} reload={reload}/></Card>
    </div>
  </div>
}

function TeacherPanel({ data, reload, notify }) {
  const school = data.schools[0]
  const teachers = data.profiles.filter(p=>p.role==='teacher')
  const [authorId, setAuthorId] = useState(teachers[0]?.id || '')
  useEffect(()=>{ if(!authorId && teachers[0]) setAuthorId(teachers[0].id) }, [teachers.length])
  const [post, setPost] = useState({ post_type:'update', title:'', content:'', visibility:'student_only', student_id:'', class_id:'' })
  const [mediaUrl, setMediaUrl] = useState('')
  const [att, setAtt] = useState({ student_id:'', status:'present', note:'' })
  async function submitPost(){ await api.createPost({...post, school_id: school.id, author_id: authorId, student_id: post.student_id || null, class_id: post.class_id || null}, mediaUrl); await reload(); notify('Post published to parent feed') }
  async function submitAttendance(){ const student = data.students.find(s=>s.id===att.student_id); await api.markAttendance({ school_id: school.id, student_id: att.student_id, class_id: student?.class_id, status: att.status, note: att.note, marked_by: authorId, date: new Date().toISOString().slice(0,10)}); await reload(); notify('Attendance saved') }
  function aiDraft() { const st = data.students.find(s=>s.id===post.student_id); setPost({...post, title: post.title || 'Today’s progress update', content: `${st ? st.first_name : 'The student'} participated well today and showed positive effort during classroom activities. Please continue encouraging this progress at home.`}) }
  return <div className="page"><div className="page-head"><h1>Teacher Workspace</h1><p>Teachers can post updates, homework, reports and mark attendance.</p></div>
    <div className="two-grid">
      <Card className="wide"><h3><Upload/> Create feed post</h3><Form onSubmit={submitPost}><div className="inline"><Field label="Teacher"><select value={authorId} onChange={e=>setAuthorId(e.target.value)} required>{teachers.map(t=><option key={t.id} value={t.id}>{t.full_name}</option>)}</select></Field><Field label="Post type"><select value={post.post_type} onChange={e=>setPost({...post,post_type:e.target.value})}><option>update</option><option>photo</option><option>report</option><option>homework</option><option>announcement</option><option>behavior</option><option>health</option></select></Field><Field label="Visibility"><select value={post.visibility} onChange={e=>setPost({...post,visibility:e.target.value})}><option value="student_only">Specific child</option><option value="class">Class</option><option value="school">Whole school</option></select></Field></div><div className="inline"><Field label="Student"><select value={post.student_id} onChange={e=>setPost({...post,student_id:e.target.value})}><option value="">None</option>{data.students.map(s=><option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}</select></Field><Field label="Class"><select value={post.class_id} onChange={e=>setPost({...post,class_id:e.target.value})}><option value="">None</option>{data.classes.map(c=><option key={c.id} value={c.id}>{c.name} {c.section}</option>)}</select></Field></div><Field label="Title"><input value={post.title} onChange={e=>setPost({...post,title:e.target.value})} required/></Field><Field label="Content"><textarea value={post.content} onChange={e=>setPost({...post,content:e.target.value})} required rows={5}/></Field><Field label="Media URL optional"><input value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="https://... image or PDF"/></Field><div className="button-row"><button type="button" className="secondary" onClick={aiDraft}>AI-style draft</button><button><Send/>Publish</button></div></Form></Card>
      <Card><h3><CalendarCheck/> Mark attendance</h3><Form onSubmit={submitAttendance}><Field label="Student"><select value={att.student_id} onChange={e=>setAtt({...att,student_id:e.target.value})} required><option value="">Choose student</option>{data.students.map(s=><option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}</select></Field><Field label="Status"><select value={att.status} onChange={e=>setAtt({...att,status:e.target.value})}><option>present</option><option>absent</option><option>late</option><option>excused</option></select></Field><Field label="Note"><textarea value={att.note} onChange={e=>setAtt({...att,note:e.target.value})}/></Field><button><CalendarCheck/>Save Attendance</button></Form></Card>
    </div><FeedBoard data={data} reload={reload} notify={notify} compact />
  </div>
}

function ParentPanel({ data, reload, notify }) {
  const parents = data.profiles.filter(p=>p.role==='parent')
  const [parentId, setParentId] = useState(parents[0]?.id || '')
  useEffect(()=>{ if(!parentId && parents[0]) setParentId(parents[0].id) }, [parents.length])
  const childIds = data.links.filter(l=>l.parent_user_id===parentId).map(l=>l.student_id)
  const children = data.students.filter(s=>childIds.includes(s.id))
  const posts = visiblePostsForParent(data, parentId)
  return <div className="page"><div className="page-head"><h1>Parent Portal</h1><p>Parents only see updates connected to their own children, classes, or school.</p></div>
    <Card><div className="inline"><Field label="View as parent"><select value={parentId} onChange={e=>setParentId(e.target.value)}>{parents.map(p=><option key={p.id} value={p.id}>{p.full_name}</option>)}</select></Field><div className="child-chips">{children.map(c=><span key={c.id}>{c.first_name} {c.last_name}</span>)}</div></div></Card>
    <div className="two-col-feed"><div>{posts.map(p=><PostCard key={p.id} post={p} data={data} userId={parentId} reload={reload} notify={notify}/>)}</div><Card><h3>Attendance</h3>{children.map(c=><div key={c.id} className="attendance-box"><b>{c.first_name} {c.last_name}</b>{data.attendance.filter(a=>a.student_id===c.id).slice(0,5).map(a=><p key={a.id}>{a.date}: <strong>{a.status}</strong> {a.note}</p>)}</div>)}</Card></div>
  </div>
}

function StudentsPanel({ data }) {
  return <div className="page"><div className="page-head"><h1>Student Profiles</h1><p>Organized child histories with feed, guardian access and attendance.</p></div><div className="student-grid">{data.students.map(s=><StudentCard key={s.id} student={s} data={data}/>)}</div></div>
}
function StudentCard({ student, data }) {
  const cls = data.classes.find(c=>c.id===student.class_id)
  const links = data.links.filter(l=>l.student_id===student.id)
  const posts = data.posts.filter(p=>p.student_id===student.id || p.class_id===student.class_id).slice(0,3)
  const att = data.attendance.filter(a=>a.student_id===student.id)
  return <Card className="student-card"><div className="student-top"><img src={student.photo_url || 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=500&q=80'} /><div><h2>{student.first_name} {student.last_name}</h2><p>{cls?.name} {cls?.section}</p><span>{att.length} attendance records · {posts.length} recent updates</span></div></div><h4>Parent access</h4>{links.map(l=>{const p=data.profiles.find(x=>x.id===l.parent_user_id); return <p key={l.id}>✓ {p?.full_name} — {l.relationship}</p>})}<h4>Latest activity</h4>{posts.map(p=><div className="mini-post" key={p.id}><b>{p.title}</b><span>{p.post_type}</span></div>)}</Card>
}

function FeedBoard({ data, reload, notify, compact=false }) {
  return <div className={compact?'feed-section':'page'}>{!compact && <div className="page-head"><h1>Live Parent Feed</h1><p>All posts from Supabase. Parents see a filtered version of this based on child links.</p></div>}<div className="feed-list">{data.posts.map(p=><PostCard key={p.id} post={p} data={data} reload={reload} notify={notify} userId={data.profiles.find(x=>x.role==='parent')?.id}/>)}</div></div>
}

function PostCard({ post, data, userId, reload, notify }) {
  const student = data.students.find(s=>s.id===post.student_id)
  const cls = data.classes.find(c=>c.id===post.class_id)
  const author = data.profiles.find(p=>p.id===post.author_id)
  const media = data.media.filter(m=>m.post_id===post.id)
  const comments = data.comments.filter(c=>c.post_id===post.id)
  const reactions = data.reactions.filter(r=>r.post_id===post.id)
  const [comment, setComment] = useState('')
  async function react(type){ try { await api.createReaction({post_id:post.id,user_id:userId,reaction_type:type}); await reload(); notify('Reaction added') } catch(e){ notify('Reaction already exists or saved') } }
  async function addComment(){ if(!comment.trim()) return; await api.createComment({post_id:post.id,user_id:userId,content:comment}); setComment(''); await reload(); notify('Comment added') }
  return <Card className="post-card"><div className="post-head"><span className={`tag ${post.post_type}`}>{post.post_type}</span><small>{new Date(post.created_at).toLocaleString()}</small></div><h2>{post.title}</h2><p>{post.content}</p><div className="meta">{author?.full_name} · {student ? `${student.first_name} ${student.last_name}` : cls ? `${cls.name} ${cls.section}` : 'Whole school'} · {post.visibility}</div>{media.map(m=><div key={m.id} className="media-box">{m.file_type==='image'?<img src={m.file_url}/>:<a href={m.file_url} target="_blank">Open attachment</a>}</div>)}<div className="reactions"><button onClick={()=>react('heart')}>❤️ {reactions.filter(r=>r.reaction_type==='heart').length}</button><button onClick={()=>react('clap')}>👏 {reactions.filter(r=>r.reaction_type==='clap').length}</button><button onClick={()=>react('smile')}>😊 {reactions.filter(r=>r.reaction_type==='smile').length}</button></div><div className="comments">{comments.map(c=>{const u=data.profiles.find(p=>p.id===c.user_id); return <p key={c.id}><b>{u?.full_name || 'User'}:</b> {c.content}</p>})}<div className="comment-form"><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a parent comment..."/><button onClick={addComment}><MessageCircle size={15}/>Comment</button></div></div></Card>
}

function visiblePostsForParent(data, parentId) {
  const childIds = data.links.filter(l=>l.parent_user_id===parentId).map(l=>l.student_id)
  const classIds = data.students.filter(s=>childIds.includes(s.id)).map(s=>s.class_id)
  return data.posts.filter(p => p.visibility==='school' || childIds.includes(p.student_id) || classIds.includes(p.class_id)).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
}

function RecordList({ data, reload }) {
  const rows = [ ['Schools', data.schools.length], ['Users', data.profiles.length], ['Classes', data.classes.length], ['Students', data.students.length], ['Parent links', data.links.length], ['Posts', data.posts.length], ['Comments', data.comments.length], ['Attendance', data.attendance.length] ]
  return <div className="record-list">{rows.map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
}

function Form({ onSubmit, children }) { return <form onSubmit={async e=>{ e.preventDefault(); try { await onSubmit() } catch(err){ alert(err.message) } }}>{children}</form> }

createRoot(document.getElementById('root')).render(<App />)
