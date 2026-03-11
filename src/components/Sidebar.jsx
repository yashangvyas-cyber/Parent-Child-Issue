import { useState } from 'react'

export default function Sidebar({ active, onNavChange }) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { id: 'projects', label: 'Projects', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>, hasPlus: true },
    { id: 'tasks', label: 'Tasks', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>, count: 3, hasBell: true },
    { id: 'client-messages', label: 'Client Messages', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { id: 'daily-allocation', label: 'Daily Allocation', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> },
    { id: 'occupancy-report', label: 'Occupancy Report', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg> },
    { id: 'timesheet-reports', label: 'Timesheet Reports', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { id: 'hirebase-report', label: 'Hirebase Report', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg> },
    { id: 'hourly-report', label: 'Hourly Report', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { id: 'fixed-cost-report', label: 'Fixed Cost Report', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { id: 'config', label: 'Config', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9l1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ]

  return (
    <div className={`flex flex-col h-full bg-[#3f51b5] text-slate-100 transition-all duration-300 ${collapsed ? 'w-16' : 'w-[200px]'} relative z-[100]`}>
      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${active === item.id ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 hover:text-white dark:text-slate-200'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`${active === item.id ? 'text-white' : 'text-slate-300 group-hover:text-white'} transition-colors`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="text-[13px] font-bold tracking-tight">{item.label}</span>}
              </div>
              
              {!collapsed && (
                <div className="flex items-center gap-1.5">
                   {item.hasBell && <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
                   {item.hasPlus && <span className="w-4 h-4 rounded-md border border-white/30 flex items-center justify-center text-[10px] font-black group-hover:bg-white group-hover:text-[#3f51b5] transition-all">+</span>}
                   {item.count && <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-black min-w-[18px] text-center border border-white/10">{item.count}</span>}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 border-t border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 text-slate-300 hover:text-white"
      >
        <svg className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">Collapse</span>}
      </button>
    </div>
  )
}
