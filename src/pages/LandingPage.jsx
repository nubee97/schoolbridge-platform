import { Link } from 'react-router-dom'
import { ArrowRight, BellRing, CheckCircle2, GraduationCap, HeartHandshake, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3"><div className="rounded-2xl bg-blue-600 p-3 text-white"><GraduationCap/></div><span className="text-xl font-black text-slate-900">SchoolBridge</span></div>
        <div className="hidden gap-8 text-sm font-semibold text-slate-600 md:flex"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#architecture">Architecture</a></div>
        <Link to="/login" className="btn-primary">Open Demo <ArrowRight size={17}/></Link>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700"><Sparkles size={16}/> Korea-inspired parent engagement for global schools</span>
          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-950 md:text-6xl">The daily digital bridge between schools and families.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">SchoolBridge helps schools share private child updates, photos, reports, attendance, homework, and announcements in real time—while giving parents a warm Facebook-style school experience.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/login" className="btn-primary">Launch Working MVP</Link><Link to="/setup" className="btn-secondary">View Setup Guide</Link></div>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            {[['B2B2C','school + parent network'],['Realtime','private child feed'],['Multi-tenant','one platform, many schools']].map(([a,b]) => <div key={a} className="rounded-2xl bg-white p-4 shadow-sm"><p className="font-black text-slate-900">{a}</p><p className="text-xs text-slate-500">{b}</p></div>)}
          </div>
        </div>
        <div className="card overflow-hidden p-4">
          <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
            <div className="mb-4 flex items-center justify-between"><span className="font-bold">Today at School</span><span className="rounded-full bg-green-400 px-3 py-1 text-xs font-bold text-green-950">Live</span></div>
            <img className="h-64 w-full rounded-3xl object-cover" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" />
            <div className="mt-4 rounded-3xl bg-white p-5 text-slate-900">
              <p className="text-xs font-bold uppercase text-blue-600">Nursery 2 Blue</p>
              <h3 className="mt-1 text-xl font-black">Creative Art Session</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Maya showed confidence during painting time and shared materials kindly with classmates.</p>
              <div className="mt-4 flex gap-2 text-sm font-bold"><span>❤️ 8</span><span>👏 4</span><span>😊 3</span></div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {[['Parent Engagement', HeartHandshake, 'Private child timelines, photos, comments, and school moments parents actually want to open.'],['School Operations', UsersRound, 'Classes, students, teachers, attendance, homework, reports, and announcements.'],['Trust & Privacy', ShieldCheck, 'Role-based access so parents only see their own child and schools keep media private.']].map(([title, Icon, text]) => <div key={title} className="card p-7"><Icon className="text-blue-600"/><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></div>)}
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
          <h2 className="text-3xl font-black">Nigeria-first launch pricing model</h2>
          <p className="mt-3 max-w-2xl text-slate-300">Start with onboarding + monthly school subscriptions, then expand into AI, SMS/WhatsApp packs, payments, and safety modules.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[['Starter','₦25k–₦50k/mo','Small nursery/primary schools'],['Growth','₦75k–₦150k/mo','Mid-size private schools'],['Premium','₦200k+/mo','Large schools and groups']].map(([plan,price,desc]) => <div key={plan} className="rounded-3xl bg-white/10 p-6"><p className="text-lg font-bold">{plan}</p><p className="mt-3 text-3xl font-black">{price}</p><p className="mt-2 text-sm text-slate-300">{desc}</p></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}
