export default function KpiCard({ label, value, note, icon: Icon }) {
  return <div className="card p-5">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">{Icon && <Icon size={22}/>}</div>
    <p className="text-3xl font-black text-slate-900">{value}</p>
    <p className="mt-1 text-sm font-bold text-slate-700">{label}</p>
    <p className="mt-2 text-xs text-slate-500">{note}</p>
  </div>
}
