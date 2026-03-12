import { useState, useRef, useEffect } from 'react'

export default function FilterBar({ onCreateIssue, onBulkActionSelect, activeBulkAction }) {
  const [showOptions, setShowOptions] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          
          {/* Options Menu (Bulk Actions) */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-all ${showOptions || activeBulkAction ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
            
            {showOptions && (
              <div className="absolute top-10 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 py-1.5 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-slate-100/80 mb-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Bulk Actions</span>
                </div>
                {[
                  { id: 'parent', label: 'Assign Parent', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
                  { id: 'assignee', label: 'Assignee', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg> },
                  { id: 'label', label: 'Label', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
                  { id: 'delete', label: 'Delete', danger: true, icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg> },
                ].map((action) => (
                  <button
                    key={action.id}
                    className={`w-full text-left px-3 py-1.5 flex items-center gap-2 text-[11px] font-bold transition-colors ${action.danger ? 'text-rose-500 hover:bg-rose-50' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
                    onClick={() => {
                      onBulkActionSelect(action.id)
                      setShowOptions(false)
                    }}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
