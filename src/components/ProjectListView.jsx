import { useState } from 'react'

const PROJECTS = [
  { id: 1, key: 'COLLAB', name: 'CollabCRM Platform', lead: 'YV', leadColor: '#667eea', issues: 142, open: 28, sprint: 'Sprint 12', type: 'Software', updated: '2h ago' },
  { id: 2, key: 'MKTG', name: 'Marketing Automation', lead: 'SR', leadColor: '#10b981', issues: 67, open: 12, sprint: 'Sprint 4', type: 'Business', updated: '1d ago' },
  { id: 3, key: 'OPS', name: 'Operations Dashboard', lead: 'AM', leadColor: '#f59e0b', issues: 89, open: 19, sprint: 'Sprint 7', type: 'Software', updated: '3h ago' },
  { id: 4, key: 'HRMS', name: 'HR Management System', lead: 'RK', leadColor: '#8b5cf6', issues: 53, open: 8, sprint: 'Sprint 2', type: 'Business', updated: '2d ago' },
  { id: 5, key: 'INTG', name: 'Integration Services', lead: 'PL', leadColor: '#06b6d4', issues: 34, open: 15, sprint: 'Sprint 9', type: 'Software', updated: '5h ago' },
]

export default function ProjectListView({ onProjectClick }) {
  const [search, setSearch] = useState('')

  const filtered = PROJECTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.key.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Projects
            <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg shadow-sm border border-indigo-100/50">
              {PROJECTS.length} Total
            </span>
          </h1>
          <p className="text-sm font-semibold text-slate-500 max-w-md leading-relaxed">
            Manage your organization's workspaces and track performance across all active cycles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by name or key..."
              className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-400 w-64 shadow-sm"
            />
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Project
          </button>
        </div>
      </div>

      {/* Projects Table / Modern List */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden group/list">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">#</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Workspace</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Issues</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Current Phase</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Progress</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p, i) => (
                <tr 
                  key={p.id} 
                  className="group hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onProjectClick(p)}
                >
                  <td className="px-6 py-5 text-xs font-black text-slate-300 group-hover:text-slate-500 transition-colors">{i + 1}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-xl shadow-slate-200/50 group-hover:scale-105 transition-transform" style={{ background: p.leadColor }}>
                        {p.key.slice(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{p.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{p.key}</code>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className={`text-[10px] font-black uppercase tracking-wider ${p.type === 'Software' ? 'text-indigo-500' : 'text-emerald-500'}`}>{p.type}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-black text-slate-700">{p.issues}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 shadow-sm shadow-rose-100/30">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-tighter">{p.open} Open</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider border border-emerald-100 shadow-sm">Active</span>
                        <span className="text-[13px] font-bold text-slate-500">{p.sprint}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500 shadow-sm" style={{ background: p.leadColor, color: '#fff' }}>{p.lead}</div>
                        <span className="text-[11px] font-bold text-slate-400">Lead by {p.lead}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-32 space-y-2">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{Math.round((1 - p.open/p.issues) * 100)}% Done</span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner-soft">
                          <div className="h-full bg-indigo-500 rounded-full shadow-lg shadow-indigo-100/50" style={{ width: `${(1 - p.open/p.issues) * 100}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{p.updated}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
