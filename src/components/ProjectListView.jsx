import { useState } from 'react'

export default function ProjectListView({ projects, onSelect }) {
  return (
    <div className="flex flex-col h-full bg-white p-6 animate-in fade-in duration-500">
      {/* Page Title Area */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Task Management</h1>
          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-black text-slate-500">1 - 10 of 120 Projects</span>
          <label className="flex items-center gap-2 ml-4 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
            <span className="text-[11px] font-bold text-slate-600">Show my projects only</span>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button className="px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-black rounded-md shadow-sm">All</button>
            <button className="px-4 py-1.5 text-slate-600 text-[11px] font-black">Favorite</button>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-2.5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-black text-slate-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
            <span className="text-[10px] font-black text-slate-800 uppercase">Is not</span>
            <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">Signed Off</span>
            <button className="text-slate-300 hover:text-rose-500">×</button>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Archived</span>
            <span className="text-[10px] font-black text-slate-800 uppercase">Is</span>
            <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">False</span>
            <button className="text-slate-300 hover:text-rose-500">×</button>
          </div>
          <button className="w-6 h-6 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400">+</button>
        </div>
        <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[11px] font-black rounded-lg hover:bg-indigo-100 transition-all">Filter</button>
      </div>

      {/* Projects Table */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">No.</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Project Name</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Type</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Role</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Status</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Created By</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {projects.map((p, idx) => (
              <tr 
                key={p.id} 
                className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                onClick={() => onSelect(p)}
              >
                <td className="px-4 py-4 text-[11px] font-bold text-slate-400">{idx + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <div>
                      <div className="text-[13px] font-black text-slate-800 group-hover:text-indigo-600">{p.name}</div>
                      <div className="text-[10px] font-bold text-slate-400">#PROJECT_CODE_{p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">{p.type}</span></td>
                <td className="px-4 py-4 text-[11px] font-medium text-slate-500">{p.role}</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-[11px] font-black text-slate-700">Super User</div>
                    <div className="text-[9px] font-bold text-slate-400">03/Mar/2026, 03:47 PM</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-indigo-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
