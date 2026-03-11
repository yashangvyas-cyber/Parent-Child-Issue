const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { id: 'projects', label: 'Projects', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )},
  { id: 'tasks', label: 'Tasks', badge: 3, icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )},
  { id: 'daily', label: 'Daily Allocation', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )},
  { id: 'timesheet', label: 'Timesheet Reports', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )},
]

export default function Sidebar({ activeNav, onNavChange, collapsed, onCollapse }) {
  return (
    <aside className={`flex flex-col bg-[#0f172a] text-slate-400 transition-all duration-300 ease-in-out border-r border-slate-800 relative z-[150] shadow-2xl ${collapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Sidebar Logo */}
      <div className="h-14 flex items-center px-6 gap-3 bg-slate-900/40 mb-8 mt-2 group cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-600/30 group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
          C
        </div>
        {!collapsed && <span className="font-black text-[17px] tracking-tight text-white group-hover:text-indigo-100 transition-colors">CollabCRM</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 px-4">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all group overflow-hidden ${activeNav === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40' : 'hover:bg-slate-800/60 hover:text-slate-200'}`}
            onClick={() => onNavChange(item.id)}
          >
            <span className={`transition-transform duration-300 group-hover:rotate-6 flex-shrink-0 ${activeNav === item.id ? 'scale-110 text-white' : 'text-slate-500 group-hover:text-white'}`}>{item.icon}</span>
            {!collapsed && <span className="text-[14px] font-bold truncate flex-1 tracking-tight">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold shadow-sm ${activeNav === item.id ? 'bg-indigo-400/30 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div 
        className="mx-4 mb-6 p-1 bg-slate-800/30 border border-slate-800/50 rounded-2xl flex items-center cursor-pointer hover:bg-slate-800/60 transition-all group shadow-sm"
        onClick={onCollapse}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/80 group-hover:bg-indigo-600 transition-all text-slate-400 group-hover:text-white shadow-inner">
          <svg className={`w-5 h-5 transition-transform duration-500 ${collapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>
        {!collapsed && <span className="text-[11px] font-black text-slate-500 group-hover:text-white tracking-[0.15em] uppercase px-4 flex-1 text-center">Collapse Menu</span>}
      </div>
    </aside>
  )
}
