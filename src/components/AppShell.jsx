import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, Home, LayoutDashboard, LogOut, School, Settings, Sparkles, UserRoundCheck, UsersRound } from 'lucide-react'

const links = [
  { to: '/app/parent', label: 'Parent Feed', icon: Home, roles: ['parent', 'admin', 'teacher'] },
  { to: '/app/teacher', label: 'Teacher Studio', icon: UserRoundCheck, roles: ['teacher', 'admin', 'parent'] },
  { to: '/app/admin', label: 'Admin', icon: LayoutDashboard, roles: ['admin', 'teacher', 'parent'] },
]

export default function AppShell({ context }) {
  const { data, activeRole, setActiveRole } = context
  const navigate = useNavigate()
  const unread = data.notifications?.filter((n) => !n.is_read).length || 0

  function switchRole(role) {
    localStorage.setItem('schoolbridge_role', role)
    setActiveRole(role)
    navigate(`/app/${role}`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white"><School size={24} /></div>
          <div>
            <p className="font-bold text-slate-900">SchoolBridge</p>
            <p className="text-xs text-slate-500">{data.school.name}</p>
          </div>
        </Link>
        <div className="mt-8 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-50 to-teal-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900"><Sparkles size={17}/> Demo Role</div>
          <div className="grid grid-cols-3 gap-2">
            {['parent','teacher','admin'].map((role) => <button key={role} onClick={() => switchRole(role)} className={`rounded-xl px-2 py-2 text-xs font-bold capitalize ${activeRole === role ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>{role}</button>)}
          </div>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <Link to="/setup" className="mb-3 flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"><Settings size={17}/> Setup Guide</Link>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500"><LogOut size={16}/> Exit app</Link>
        </div>
      </aside>
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:ml-72 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">{data.demo ? 'Demo Mode' : 'Live Supabase Mode'}</p>
          <h1 className="text-lg font-bold text-slate-900">{data.school.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative rounded-2xl bg-slate-100 p-3"><Bell size={19}/>{unread > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">{unread}</span>}</div>
          <div className="hidden items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm md:flex"><UsersRound size={17}/><span className="text-sm font-semibold capitalize">{activeRole}</span></div>
        </div>
      </header>
      <main className="lg:ml-72"><Outlet /></main>
    </div>
  )
}
