export default function TopHeader({ project, activeTab, onTabChange }) {
  const tabs = [
    { id: 'board', label: 'Board' },
    { id: 'issue-list', label: 'Issue List' },
    { id: 'backlog', label: 'Backlog' },
    { id: 'completed-sprints', label: 'Completed Sprints' },
    { id: 'notification-settings', label: 'Notification Settings' },
  ]

  return (
    <header className="bg-white border-b border-slate-200/70 sticky top-0 z-[100] shadow-sm shadow-slate-100/50 flex-shrink-0">
      {/* Top row */}
      <div className="h-12 flex items-center px-6 gap-6 border-b border-slate-100">
        {/* Breadcrumb area */}
        <div className="flex items-center gap-2 text-sm flex-1">
          <span className="text-slate-500 font-medium">Tasks</span>
          {project && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-semibold">{project.name}</span>
            </>
          )}
        </div>

        {/* STAGING Badge */}
        <button className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-[11px] font-black tracking-widest uppercase shadow-sm hover:bg-red-600 transition-all">
          STAGING
        </button>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2 gap-2 w-60">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="text-[11px] text-slate-400 font-medium">Search people by name, email, code...</span>
          </div>

          {/* Now button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-black text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            Now
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          {/* Chat icon */}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all relative">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>

          {/* Bell */}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all relative">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 border border-white rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-white text-[10px] shadow-sm cursor-pointer">
            YV
          </div>
        </div>
      </div>

      {/* Tabs row — only show if a project is selected */}
      {project && (
        <div className="flex items-center gap-0 px-6 h-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`px-4 h-full text-[12px] font-semibold border-b-2 transition-all whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
