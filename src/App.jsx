import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getBootstrapData } from './lib/api'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AppShell from './components/AppShell'
import ParentDashboard from './pages/ParentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import StudentProfile from './pages/StudentProfile'
import SetupGuide from './pages/SetupGuide'

export default function App() {
  const [data, setData] = useState(null)
  const [activeRole, setActiveRole] = useState(localStorage.getItem('schoolbridge_role') || 'parent')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getBootstrapData().then(setData).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => ({ data, setData, activeRole, setActiveRole }), [data, activeRole])

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">Loading SchoolBridge...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage activeRole={activeRole} setActiveRole={setActiveRole} />} />
      <Route path="/setup" element={<SetupGuide />} />
      <Route path="/app" element={<AppShell context={value} />}>
        <Route index element={<Navigate to={activeRole === 'teacher' ? 'teacher' : activeRole === 'admin' ? 'admin' : 'parent'} replace />} />
        <Route path="parent" element={<ParentDashboard context={value} />} />
        <Route path="teacher" element={<TeacherDashboard context={value} />} />
        <Route path="admin" element={<AdminDashboard context={value} />} />
        <Route path="students/:studentId" element={<StudentProfile context={value} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
