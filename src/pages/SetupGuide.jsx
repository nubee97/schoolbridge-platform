import { Link } from 'react-router-dom'

export default function SetupGuide() {
  return <div className="min-h-screen bg-slate-50 p-6">
    <div className="mx-auto max-w-4xl space-y-6">
      <Link to="/" className="font-bold text-blue-600">← Back home</Link>
      <div className="card p-8"><h1 className="text-4xl font-black">SchoolBridge Setup Guide</h1><p className="mt-3 leading-7 text-slate-600">This project runs immediately in demo mode. To connect your Supabase project, follow these steps.</p></div>
      <div className="card p-8"><h2 className="text-2xl font-black">1. Install dependencies</h2><pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-white">npm install
npm run dev</pre></div>
      <div className="card p-8"><h2 className="text-2xl font-black">2. Configure Supabase</h2><p className="mt-3 text-slate-600">Copy <b>.env.example</b> to <b>.env</b>, paste your Supabase anon key, then set:</p><pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-white">VITE_DEMO_MODE=false</pre></div>
      <div className="card p-8"><h2 className="text-2xl font-black">3. Run schema</h2><p className="mt-3 text-slate-600">Open your Supabase dashboard, go to SQL Editor, and run <b>supabase/schema.sql</b>. Then run <b>supabase/seed.sql</b> for sample data.</p></div>
      <div className="card p-8"><h2 className="text-2xl font-black">4. Deploy to Netlify</h2><p className="mt-3 text-slate-600">Push to GitHub, import the repository into Netlify, and add the same environment variables in Netlify Project Settings.</p></div>
    </div>
  </div>
}
