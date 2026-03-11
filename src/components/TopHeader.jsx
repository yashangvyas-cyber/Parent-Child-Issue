export default function TopHeader() {
  return (
    <header className="h-14 flex items-center px-6 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-[100] gap-8 shadow-sm shadow-slate-100/50">
      {/* Brand/Breadcrumb */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 transition-all active:scale-95">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <span className="text-[14px] font-black text-slate-800 tracking-tight select-none">Management System</span>
      </div>

      {/* Global Search */}
      <div className="hidden md:flex flex-1 max-w-xl group relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <input 
          placeholder="Search items, people, commands..." 
          className="w-full bg-slate-100/50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-400 shadow-inner-soft"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-focus-within:flex items-center gap-1.5 pointer-events-none">
          <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-black text-slate-400">⌘</kbd>
          <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-black text-slate-400">K</kbd>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-500 transition-all relative group shadow-sm active:scale-95">
          <svg className="w-5 h-5 group-hover:text-amber-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full shadow-sm" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-90 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 flex items-center justify-center font-black text-amber-700 text-[11px] shadow-sm cursor-pointer hover:shadow-md hover:border-amber-300 transition-all active:scale-95">
          YV
        </div>
      </div>
    </header>
  )
}
