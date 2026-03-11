export default function FilterBar({ onCreateIssue }) {
  return (
    <div className="bg-white border-b border-slate-200 h-11 flex items-center px-6 gap-4">
      {/* Left: Filter & Avatars */}
      <div className="flex items-center gap-3">
        {/* Filter Button */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        </button>

        {/* Avatars */}
        <div className="flex -space-x-1.5 cursor-pointer">
          {[{ i: 'YV', c: '#667eea' }, { i: 'SR', c: '#10b981' }, { i: 'AM', c: '#f59e0b' }].map((a, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white shadow-sm" style={{ background: a.c }}>{a.i}</div>
          ))}
          <div className="w-6 h-6 rounded-full border border-white bg-slate-50 flex items-center justify-center text-[7px] font-black text-slate-500 shadow-sm">+</div>
        </div>
      </div>

      <div className="h-6 w-[1px] bg-slate-100 mx-1" />

      {/* Center: Sprint Selector */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">Sprint:</span>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-all">
          <span className="text-[11px] font-bold text-slate-700">None</span>
          <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right: Group by & Create */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">Group by:</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-all">
            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span className="text-[11px] font-bold text-slate-700">None</span>
            <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        {/* Create Button Split */}
        <div className="flex items-center h-8">
          <button 
            onClick={onCreateIssue}
            className="h-full px-4 bg-indigo-600 text-white text-[11px] font-black tracking-wide rounded-l-lg hover:bg-indigo-700 transition-all"
          >
            Create
          </button>
          <button className="h-full px-1.5 bg-indigo-600 text-white/50 border-l border-white/20 rounded-r-lg hover:bg-indigo-700 transition-all">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>

        {/* View mode icons */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button>
          <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9l1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
        </div>
      </div>
    </div>
  )
}
