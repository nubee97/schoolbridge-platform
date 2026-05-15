import { useNavigate } from 'react-router-dom'
import { School } from 'lucide-react'

export default function LoginPage({ activeRole, setActiveRole }) {
  const navigate = useNavigate()
  function enter(role) {
    localStorage.setItem('schoolbridge_role', role)
    setActiveRole(role)
    navigate(`/app/${role}`)
  }
  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
    <div className="card w-full max-w-md p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white"><School size={32}/></div>
      <h1 className="mt-6 text-center text-3xl font-black text-slate-950">Enter SchoolBridge</h1>
      <p className="mt-2 text-center text-sm text-slate-500">Choose a demo role. Supabase Auth is ready for production when configured.</p>
      <div className="mt-8 grid gap-3">
        {['parent','teacher','admin'].map(role => <button key={role} onClick={() => enter(role)} className={`rounded-2xl px-5 py-4 text-left font-bold capitalize transition ${activeRole === role ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}>{role} Dashboard</button>)}
      </div>
    </div>
  </div>
}
